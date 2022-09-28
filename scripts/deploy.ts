import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory, constants, BigNumber, Bytes } from "ethers";

async function main() {
  //define
  let creator: SignerWithAddress;
  let PolicyUnlocker: ContractFactory;
  let unlocker: Contract;

  const Registry = "0xd0Df5A352D74A746754C592a6277c9060A7c9c87";
  const Parameters = "0xf29571145B421f660775fa3dEb16D9FF6085D0e6";

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
