import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory, constants, BigNumber, Bytes } from "ethers";

async function main() {
  //define
  let creator: SignerWithAddress;
  let PolicyUnlocker: ContractFactory;
  let unlocker: Contract;

  const Registry = "0x9D6dDcaD9ADe0C8A12d4ed7d8D33F21e1a8F651F";
  const Parameters = "0xB27C57278421E461830065E49F27aeC78eFb0FCA";

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
