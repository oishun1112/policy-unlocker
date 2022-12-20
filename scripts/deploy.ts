import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory, constants, BigNumber, Bytes } from "ethers";

async function main() {
  //define
  let creator: SignerWithAddress;
  let PolicyUnlocker: ContractFactory;
  let unlocker: Contract;

  const Registry = "0x0fa85C39c96A9172CcCa7F84CE68E08A2BB971C1";
  const Parameters = "0x3956fEaEF1821bE55B66eBB707B4aBcefD84c0A2";

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
