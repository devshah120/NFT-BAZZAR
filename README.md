
# 🖼️ NFT BAZZAR 

NFT Bazzar is a decentralized NFT marketplace built on the Polygon network, enabling users to mint, buy, sell, resell, and auction NFTs. With low transaction fees and fast execution on the Polygon (Mumbai) testnet, it offers a cost-efficient and secure way to trade digital assets.

Users can mint NFTs, list them for sale, or put them up for auction, with flexible bidding features. The platform utilizes decentralized storage through IPFS via Pinata, ensuring that all digital assets are securely stored. Powered by React+Vite for the frontend and styled using Tailwind CSS, NFT Bazzar offers a sleek and user-friendly interface.

## 🧑🏻‍💻 Tech Stack

**Client:** React+Vite, Tailwind CSS

**Blockchain:** Solidity, Hardhat

**Storage:** IPFS (via Pinata)

**Network:** Polygon Amoy



## 💻 Features

- **Mint, Sell, and Auction NFTs:** Easily create unique NFTs, list them for sale at a fixed price, or auction them to the highest bidder.

- **Low-Cost Transactions:** Enjoy fast and affordable transactions powered by the Polygon (Amoy) testnet, offering lower fees compared to Ethereum.

- **Decentralized Storage:** NFT data is stored on IPFS via Pinata, with smart contracts built using Solidity and OpenZeppelin ERC721 standards, ensuring secure NFT creation and trading.




## ⚙️ Run Locally

Clone the project

```bash
  git clone https://github.com/devshah120/NFT-BAZZAR
```

Go to the project directory

```bash
  cd nft-bazzar
```

Install dependencies

```bash
  npm install
```
Set up environment variables: Create a `.env` file in the root directory and add the following details:

```bash
Privatekey = "YOUR METAMASK PRIVATE KEY"
RPC_URL = "YOUR RPC URL KEY"
Oklink_Api_Key = "YOUR API KEY"
```



## 🛠️ Contract Deployment

Start the hardhat Node

```bash
  npx hardhat node
```

Compile the smart contracts

```bash
  npx hardhat compile
```
Deploy to the Polygon Amoy testnet:

```bash
  npx hardhat run .\scripts\deploy.js --network polygonAmoy
```

Start the client

```bash
  npm run dev
```

## 📝 License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.

