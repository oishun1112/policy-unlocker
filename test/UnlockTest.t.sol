// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "forge-std/Test.sol";
import "./Setup.sol";

contract UnlockTest is Setup {
    function testSetMaxGasPrice() public {
        assertEq(unlocker.maxGasPrice(), 30 gwei);

        unlocker.setMaxGasPrice(50);

        assertEq(unlocker.maxGasPrice(), 50 gwei);
    }

    function testGetAllMarkets() public {
        (address _market, uint256[] memory _ids) = unlocker
            .getFirstUnlockablePoolAndIds();

        emit log_uint(_ids.length);

        (bool canExec, bytes memory execPayload) = unlocker.checker();

        if (canExec) {
            (bool success, ) = address(unlocker).call{gas: 50 gwei}(
                execPayload
            );

            if (success) {
                emit log("success!");
            }
        }

        uint256[] memory _ids_2 = unlocker.getAllUnlockableIds(
            IMarket(_market)
        );

        emit log_uint(_ids_2.length);
    }
}
