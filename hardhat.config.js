require("dotenv").config();

require("@nomiclabs/hardhat-waffle");

const { ETHER_SCAN, ALCHEMY_API_KEY_RINKEBY, PRIVATE_KEY } = process.env;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      chainId: 31337,
    },
    rinkeby: {
      chainId: 4,
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY_RINKEBY}`,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHER_SCAN,
  },
};
