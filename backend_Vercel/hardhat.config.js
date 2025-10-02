require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},   // Default in-memory node
    local: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.ADMIN_PRIVATE_KEY]
    },
  },
};
