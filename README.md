# Minimal Viable Oracle (MVO)

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

<!-- ### Draw 52 cards from the same deck without shuffling in between (each card appears once)

```javascript
[
  "0x3748",
  "0x4b43",
  "0x3448",
  "0x5143",
  "0x4b48",
  "0x3348",
  "0x4b44",
  "0x4148",
  "0x4144",
  "0x3048",
  "0x3244",
  "0x3753",
  "0x5144",
  "0x4143",
  "0x3844",
  "0x4a53",
  "0x3648",
  "0x5148",
  "0x3948",
  "0x4153",
  "0x3543",
  "0x3043",
  "0x3453",
  "0x3544",
  "0x3943",
  "0x3443",
  "0x3344",
  "0x3553",
  "0x4a48",
  "0x3653",
  "0x5153",
  "0x3848",
  "0x3243",
  "0x3548",
  "0x3744",
  "0x3053",
  "0x3253",
  "0x3853",
  "0x3843",
  "0x3953",
  "0x4a43",
  "0x3644",
  "0x3444",
  "0x4b53",
  "0x4a44",
  "0x3248",
  "0x3044",
  "0x3643",
  "0x3353",
  "0x3343",
  "0x3944",
  "0x3743",
];
```

### Draw 52 cards and reshuffle after every draw (there can be duplicates)

```javascript
[
  "0x3653",
  "0x3843",
  "0x3348",
  "0x5148",
  "0x4a44",
  "0x3444",
  "0x3443",
  "0x5153",
  "0x4a53",
  "0x5153",
  "0x3844",
  "0x5153",
  "0x3243",
  "0x4a53",
  "0x5143",
  "0x3543",
  "0x3553",
  "0x5144",
  "0x5144",
  "0x3053",
  "0x3253",
  "0x4b48",
  "0x3443",
  "0x3844",
  "0x3843",
  "0x3653",
  "0x3843",
  "0x3353",
  "0x3553",
  "0x5148",
  "0x3853",
  "0x3244",
  "0x3244",
  "0x4a43",
  "0x5143",
  "0x4143",
  "0x4b48",
  "0x4a48",
  "0x3348",
  "0x3044",
  "0x3748",
  "0x5144",
  "0x3253",
  "0x3944",
  "0x3653",
  "0x5153",
  "0x4b48",
  "0x4148",
  "0x3453",
  "0x5148",
  "0x3648",
  "0x3253",
];
``` -->
