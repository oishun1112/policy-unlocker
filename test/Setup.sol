pragma solidity 0.8.17;

import "forge-std/Test.sol";
import "../contracts/PolicyUnlocker.sol";
import "../contracts/interfaces/IRegistry.sol";
import "../contracts/interfaces/IMarket.sol";
import "../contracts/interfaces/IParameters.sol";

abstract contract Setup is Test {
    uint256 optimismFork;
    string OPTIMISM_RPC_URL = vm.envString("OPTIMISM_URL");

    PolicyUnlocker public unlocker;

    address deployer = vm.addr(1);
    address alice = vm.addr(2);

    IRegistry registry = IRegistry(0xd0Df5A352D74A746754C592a6277c9060A7c9c87);
    IParameters parameters =
        IParameters(0xf29571145B421f660775fa3dEb16D9FF6085D0e6);

    address[] markets;

    constructor() {
        optimismFork = vm.createFork(OPTIMISM_RPC_URL);
        vm.selectFork(optimismFork);

        unlocker = new PolicyUnlocker(address(registry), address(parameters));

        markets = registry.getAllMarkets();
    }
}
