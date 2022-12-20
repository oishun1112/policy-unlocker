import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory, constants, BigNumber, Bytes } from "ethers";

async function main() {
  //define
  let creator: SignerWithAddress;
  let PolicyUnlocker: ContractFactory;
  let unlocker: Contract;

  const Registry = "0x636938b5fF717F525C696F8961B9A1AEC38749A1";
  const Parameters = "0x5e204BF6eF5CD2594DfEb131608a8770d6A1a907";

  //import
  [creator] = await ethers.getSigners();
  console.log("Deploying with ", creator.address);

  PolicyUnlocker = await ethers.getContractFactory("PolicyUnlocker");
  unlocker = await PolicyUnlocker.deploy(Registry, Parameters);

  console.log("PolicyUnlocker deployed to:", unlocker.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
