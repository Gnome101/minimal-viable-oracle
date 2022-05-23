<!--
  Title: Minimal Viable Oracle (MVO) - An effective way to Build your own oracle with Solidity
  Description: Connect your Ethereum smart contract to any real world API using the oracle pattern!
  Author: @noahliechti
  -->

# Minimal Viable Oracle (MVO) - An effective way to Build your own oracle with Solidity

[![Licence](https://img.shields.io/github/license/noahliechti/minimal-viable-oracle?style=social)](https://github.com/noahliechti/minimal-viable-oracle/blob/main/LICENSE)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/jonsn0w/hyde.svg?style=social)](http://twitter.com/intent/tweet?text=Check%20out%20%40noahliechti%27s%20Minimal%20Viable%20Oracle%20%28MVO%29.%20A%20way%20to%20connect%20your%20Ethereum%20smart%20contract%20to%20any%20real%20world%20API%20using%20the%20oracle%20pattern%21&url=https://github.com/noahliechti/minimal-viable-oracle)
[![Fork](https://img.shields.io/github/forks/noahliechti/minimal-viable-oracle?style=social)](https://github.com/noahliechti/minimal-viable-oracle/fork)

Smart contracts cannot access off-chain data directly. This repository demonstrates how to connect Ethereum to any real world API using the oracle pattern.

Check out the associate blog post [here](https://noahliechti.hashnode.dev/an-effective-way-to-build-your-own-oracle-with-solidity).

> This project is only tested on macOS

## 1. Deploy contracts

`npx hardhat run scripts/1_deploy-contracts.js --network rinkeby`

This script will deploy and verify the contracts.

## 2. Listen to ethereum events (open two separate tabs)

`npx hardhat run scripts/2_listen-to-oracle-requests.js --network rinkeby`
`npx hardhat run scripts/2_listen-to-client-fulfillments.js --network rinkeby`

The `2_listen-to-oracle-requests.js` must run in order to respond to the request from the client!

## 3. Draw some cards (finally!)

`npx hardhat run scripts/3_draw-cards.js --network rinkeby`

The script will draw 52 cards in one go (and without reshuffling after every request). You can change this behavior if you want. Make sure you have some testnet Ether in you wallet, since every every request sends 0.001 ETH to the oracle.

---

Disclaimer: This code has not been professionally audited. Use at your own risk. Also keep in mind that centralized oracles are a point of failure. Always use decentralized oracles if possible.
