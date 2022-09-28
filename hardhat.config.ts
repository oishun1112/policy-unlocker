import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200000,
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      forking: {
        url: process.env.OPTIMISM_URL!,
        enabled: true,
      },
    },
    optimism: {
      url: process.env.OPTIMISM_URL,
      accounts: process.env.DEPLOYER_KEY !== undefined ? [process.env.DEPLOYER_KEY] : [],
      gasPrice: 1e7, //0.01Gwei
    },
  },
  etherscan: {
    apiKey: process.env.OPT_ETHERSCAN_API,
  },
};

export default config;
