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

  cardsClient.on(
    "ClientFulfillment",
    async (requestId, cards, sender, timestamp) => {
      console.log(
        "Request was fulfilled!",
        requestId,
        cards,
        sender,
        timestamp
      );
      console.log(
        `pendingRequestId is: ${await cardsClient.pendingRequestId()} (should be 0)`
      );
    }
  );
}

main();
