require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const fs = require('fs');
const selfwallet = fs.readFileSync(".secret").toString().trim();
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  paths: {
    artifacts: './src/artifacts',
  },

  abiExporter: {
    path: './deployments/abi',
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: true,
  },
  
  networks: {
    gana: {
      url: "http://127.0.0.1:7545",
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [selfwallet],
    },
    rinkeby: {
    url: "https://rinkeby.infura.io/v3/df4b25c92deb48a496e189ae54931ac5",
    accounts: [selfwallet],
    },
  },
  
};
