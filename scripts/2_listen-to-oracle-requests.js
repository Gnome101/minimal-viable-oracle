const hre = require("hardhat");
const addresses = require("./map.json");
const fetch = require("node-fetch");

const { ethers, network } = hre;
const MINIMUM_DRAW_AMOUNT = 1;
const API_BASE = "https://deckofcardsapi.com/api";

class CardsError extends Error {}

async function main() {
  const contractName = "CardsOracle";
  const { chainId } = network.config;
  const deployedContractAddress = addresses[chainId][contractName];
  const cardsOracle = await ethers.getContractAt(
    contractName,
    deployedContractAddress
  );

  cardsOracle.on(
    "OracleRequest",
    async (requestId, shuffle, nrOfCards, sender, timestamp) => {
      const allCardCodesHex = await getCards(nrOfCards, shuffle);
      let tx = await cardsOracle.fulfillRequest(requestId, allCardCodesHex);
      await tx.wait();
    }
  );
}

async function getCards(nrOfCards, shuffle) {
  // Read https://deckofcardsapi.com/ to learn more about the cards API

  try {
    if (shuffle) {
      // 1. get deck id and draw one card of the shuffled deck
      let { cardCodesHex: allCardCodesHex, deckId } = await drawNCards(
        "new",
        MINIMUM_DRAW_AMOUNT
      );

      // 2. draw nrOfCards-1 cards and reshuffle before every draw
      for (let i = MINIMUM_DRAW_AMOUNT; nrOfCards > i; i++) {
        await shuffleDeck(deckId);
        const { cardCodesHex } = await drawNCards(deckId, 1);
        allCardCodesHex = allCardCodesHex.concat(cardCodesHex);
      }

      return allCardCodesHex;
    } else {
      let { cardCodesHex: allCardCodesHex } = await drawNCards(
        "new",
        nrOfCards
      );
      return allCardCodesHex;
    }
  } catch (e) {
    console.error(e.message);

    if (e instanceof CardsError) {
      return [];
    }
  }
}

async function shuffleDeck(deckId) {
  return fetch(`${API_BASE}/deck/${deckId}/shuffle/`)
    .then((response) => response.json())
    .then((data) => {
      const { success, shuffled, remaining } = data;
      if (!success || !shuffled || remaining != 52) {
        throw new CardsError(
          `Couldn't shuffle the deck ${success} ${shuffled} ${remaining}`
        );
      }
    });
}

async function drawNCards(action, nrOfCards) {
  return fetch(`${API_BASE}/deck/${action}/draw/?count=${nrOfCards}`)
    .then((response) => response.json())
    .then((data) => {
      const { success, cards, deck_id: deckId } = data;
      if (!success || cards.length != nrOfCards) {
        throw new CardsError("Couldn't draw a card");
      }
      return { deckId: deckId, cardCodesHex: formatCardCodesToHex(cards) };
    });
}

function formatCardCodesToHex(cards) {
  const cardCodesHex = cards.map((card) =>
    ethers.utils.hexlify(ethers.utils.toUtf8Bytes(card.code))
  );
  return cardCodesHex;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
