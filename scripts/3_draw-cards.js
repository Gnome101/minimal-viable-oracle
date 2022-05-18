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

  // without shuffle (you can change 52 to any number between 1 and 52):
  let tx = await cardsClient.drawNCardsWithoutShuffle(52, {
    value: ethers.utils.parseEther("0.001"),
  });
  await tx.wait();

  // with shuffle (you can change 52 to any number between 1 and 52):
  // tx = cardsClient.drawNCardsWithShuffle(52, {
  //   value: ethers.utils.parseEther("0.001"),
  // });
  // await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
