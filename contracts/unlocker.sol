pragma solidity 0.8.17;

import "./interfaces/IRegistry.sol";
import "./interfaces/IMarket.sol";
import "./interfaces/IParameters.sol";
import "hardhat/console.sol";

contract Unlocker {
    uint256 public maxGasPrice = 30 gwei;
    IRegistry immutable registry;
    IParameters immutable param;

    constructor(address _registry, address _parameter) {
        registry = IRegistry(_registry);
        param = IParameters(_parameter);
    }

    function unlockBatch(address _targetMarket, uint256[] memory _ids)
        external
    {
        IMarket _market = IMarket(_targetMarket);

        _market.unlockBatch(_ids);
    }

    function checker()
        external
        view
        returns (bool canExec, bytes memory execPayload)
    {
        if (tx.gasprice <= maxGasPrice) {
            address[] memory _markets = _getAllMarkets();
            for (uint256 i; i < _markets.length; ) {
                IMarket _market = IMarket(_markets[i]);
                uint256[] memory _ids = _getAllUnlockableIds(_market);

                if (_ids.length != 0) {
                    canExec = true;

                    execPayload = abi.encodeWithSelector(
                        this.unlockBatch.selector,
                        address(_market),
                        _ids
                    );

                    break;
                }

                unchecked {
                    ++i;
                }
            }
        }
    }

    function _getAllMarkets() internal view returns (address[] memory) {
        return registry.getAllMarkets();
    }

    function _getAllUnlockableIds(IMarket _market)
        internal
        view
        returns (uint256[] memory _unlockableIds)
    {
        if (_market.marketStatus() == IMarket.MarketStatus.Trading) {
            uint256 _idCounts = _market.allInsuranceCount();
            uint256 _gracePeriod = param.getGrace(address(_market));
            uint256 _nextSlot;

            for (uint256 i; i < _idCounts; ) {
                IMarket.Insurance memory _insurance = _market.insurances(i);
                uint256 _unlockableTime = _insurance.endTime + _gracePeriod;

                if (_unlockableTime <= block.timestamp) {
                    _unlockableIds[_nextSlot] = i;
                    ++_nextSlot;
                }

                unchecked {
                    ++i;
                }
            }
        }

        return _unlockableIds;
    }

    function setMaxGasPrice(uint256 _gwei) external {
        maxGasPrice = _gwei * 1 gwei;
    }
}
