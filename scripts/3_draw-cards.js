const hre = require("hardhat");
const addresses = require("./map.json");

const { ethers, network } = hre;

async function main() {
  const contractName = "CardsClient";
  const { chainId } = network.config;
  const deployedContractAddress = addresses[chainId][contractName];
  const cardsClient = await ethers.getContractAt(
    contractName,
    deployedContractAddress
  );

  let tx = await cardsClient.drawNCardsWithoutShuffle(52, {
    value: ethers.utils.parseEther("0.001"),
  });
  await tx.wait();

  // tx = cardsClient.drawNCardsWithShuffle(52);
  // await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
