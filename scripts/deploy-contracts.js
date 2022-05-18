const hre = require("hardhat");
const {
  storeContractAddress,
  verifyContract,
  printEtherscanLink,
} = require("./helper-functions.js");

const { ethers, network } = hre;
const { chainId } = network.config;

async function main() {
  await hre.run("compile");

  // Deploy CardsOracle contract
  let contractName = "CardsOracle";
  const CardsOracle = await ethers.getContractFactory(contractName);
  const cardsOracle = await CardsOracle.deploy();
  await cardsOracle.deployed();

  console.log(`${contractName} deployed to:`, cardsOracle.address);

  await storeContractAddress(cardsOracle, contractName);
  await verifyContract(cardsOracle, []);
  printEtherscanLink(cardsOracle.address, chainId);

  // Deploy CardsClient contract
  contractName = "CardsClient";
  const args = [cardsOracle.address];
  const CardsClient = await ethers.getContractFactory(contractName);
  const cardsClient = await CardsClient.deploy(...args);
  await cardsClient.deployed();

  console.log(`${contractName} deployed to:`, cardsClient.address);

  await storeContractAddress(cardsClient, contractName);
  await verifyContract(cardsClient, args);
  printEtherscanLink(cardsClient.address, chainId);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
