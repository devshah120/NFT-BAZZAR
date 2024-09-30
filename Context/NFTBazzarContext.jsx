import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers, JsonRpcProvider } from "ethers";
// import { ethers } from 'ethers';
import { Router } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { create as ipfsHttpClient } from "ipfs-http-client";
import { NFTBazzarAddress, NFTBazzarABI } from "./constants";

const POLYGON_AMOY_RPC_URL = "https://rpc-amoy.polygon.technology/";

export const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner(); // Ensure signer is obtained
    const contract = new ethers.Contract(NFTBazzarAddress, NFTBazzarABI, signer); // Pass signer
    return contract;
  } catch (error) {
    console.log("Error connecting to smart contract:", error);
    return null;
  }
};

export const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(NFTBazzarAddress, NFTBazzarABI, signerOrProvider);
};

// const [accountBalance, setAccountBalance] = useState("");

// useEffect(() => {
//   checkWalletConnected();
// }, []);

export const NFTBazzarContext = React.createContext();

const title = "Hello me is here";

export const NFTBazzarProvider = ({ children }) => {
  const title = "Hello me is here";
  const [currentAccount, SetCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const checkWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        SetCurrentAccount(accounts[0]);
      } else {
        console.log("No Accounts Found");
      }
      console.log(currentAccount);
    } catch (error) {
      console.log("Wallet connection Error");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      SetCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      console.log("Error while connecting to wallet");
    }
  };

  const uploadToPinata = async (file) => {
    if (!file) {
      setError("File is missing. Please provide your file.");
      setOpenError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZTVjYWJmNi1mN2EwLTQ5ZjUtYjFjMi0wOGZjY2RkMjcyYTYiLCJlbWFpbCI6ImtpZmVkMjI2NzVAbm9sYW56aXAuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijk2MmJlNWNhNmE4YzZiYTg5YjQ4Iiwic2NvcGVkS2V5U2VjcmV0IjoiZWIwMzE0M2VkZTllYmVlMTAzODE4OTViY2NlOWFmMTRiYTRhZGE5MGI2ZmM0NzkwYjQ3NDYyMWY3YWE2OGE5ZiIsImV4cCI6MTc1MjQ3NDk3MH0.jf0rtGR74RBF4kW7_terrruDKG6ZfVxLDkvB4QLDO3A`,
          },
        }
      );

      const imgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      return imgHash;
    } catch (error) {
      console.error("Error in IPFS", error);
      setError("Error uploading to IPFS. Please try again later.");
      setOpenError(true);
      throw error;
    }
  };

  const uploadJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios
      .post(url, JSONBody, {
        headers: {
          pinata_api_key: "a2482c96ee25ab63c6dc",
          pinata_secret_api_key:
            "af9269e66a07f9b638f57ede4622865125904a894787681ae653d3faa863ee7e",
        },
      })
      .then(function (response) {
        return {
          success: true,
          pinataURL:
            "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
        };
      })
      .catch(function (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
  };

  const uploadFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️

    let data = new FormData();
    data.append("file", file);

    const metadata = JSON.stringify({
      name: "testname",
      keyvalues: {
        exampleKey: "exampleValue",
      },
    });
    data.append("pinataMetadata", metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
      customPinPolicy: {
        regions: [
          {
            id: "FRA1",
            desiredReplicationCount: 1,
          },
          {
            id: "NYC1",
            desiredReplicationCount: 2,
          },
        ],
      },
    });
    data.append("pinataOptions", pinataOptions);

    return axios
      .post(url, data, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: "a2482c96ee25ab63c6dc",
          pinata_secret_api_key:
            "af9269e66a07f9b638f57ede4622865125904a894787681ae653d3faa863ee7e",
        },
      })
      .then(function (response) {
        console.log("image uploaded", response.data.IpfsHash);
        return {
          success: true,
          pinataURL:
            "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
        };
      })
      .catch(function (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
  };

  const createNFT = async (name, description, price, image) => {
    if (!name || !description || !price || !image) {
      console.log("Data is missing");
      return;
    }
  
    const data = JSON.stringify({ name, description, price, image });
  
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: "a2482c96ee25ab63c6dc",
          pinata_secret_api_key:
            "af9269e66a07f9b638f57ede4622865125904a894787681ae653d3faa863ee7e",
          "Content-Type": "application/json",
        },
      });
  
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log("Uploaded to IPFS link:", ipfsUrl);
  
      const tokenId = await createSale(ipfsUrl, price);
      if (tokenId) {
        console.log("NFT created successfully with tokenId:", tokenId.toString());
      } else {
        console.log("NFT creation failed or tokenId could not be determined");
      }
    } catch (error) {
      console.error("Error in creating NFT:", error);
    }
  };

  const createSale = async (url, formInputPrice) => {
    console.log("Creating sale for:", url, formInputPrice);
    
    try {
      const price = ethers.parseUnits(formInputPrice.toString(), 18);
      const contract = await connectingWithSmartContract();
      if (!contract) {
        throw new Error("Failed to connect to smart contract");
      }
  
      const listingPrice = ethers.parseUnits("0.0025", "ether");
  
      console.log("Calling createToken with:", url, price.toString(), listingPrice.toString());
      const transaction = await contract.createToken(url, price, { value: listingPrice });
  
      console.log("Transaction sent:", transaction.hash);
      
      // Wait for the transaction to be mined
      const receipt = await transaction.wait();
      console.log("Transaction mined. Block number:", receipt.blockNumber);
  
      // Log the entire receipt for debugging
      console.log("Full receipt:", JSON.stringify(receipt, null, 2));
  
      // Check for events
      const tokenCreatedEvent = receipt.logs.find(
        log => log.fragment && log.fragment.name === 'TokenCreated'
      );
  
      if (tokenCreatedEvent) {
        const tokenId = tokenCreatedEvent.args.tokenId;
        console.log("New token created with ID:", tokenId.toString());
        return tokenId;
      } else {
        console.log("TokenCreated event not found in transaction logs");
      }
  
      console.log("Could not determine tokenId from transaction receipt");
      return null;
  
    } catch (error) {
      console.error("Error occurred while creating sale:", error);
      throw error;
    }
  };
  
  

  const fetchNFTs = async () => {
    try {
      console.log("Fetching NFTs...");
      const provider = new ethers.JsonRpcProvider(POLYGON_AMOY_RPC_URL);
      console.log("Provider created");
      const contract = fetchContract(provider);
      console.log("Contract fetched");
  
      const data = await contract.fetchMarketItem();
      console.log("Raw data from contract:", data);
  
      if (!data || data.length === 0) {
        console.log("No items returned from contract");
        return [];
      }
  
      const items = await Promise.all(
        data.map(async (item, index) => {
          console.log(`Processing item ${index}:`, item);
          const tokenId = item._tokenId || item.tokenId;
          if (!tokenId) {
            console.log(`Item ${index} has no tokenId:`, item);
            return null;
          }
          try {
            const tokenURI = await contract.tokenURI(tokenId);
            console.log(`TokenURI for ${tokenId}:`, tokenURI);
            const { data: metadata } = await axios.get(tokenURI);
            console.log(`Metadata for ${tokenId}:`, metadata);
            const price = ethers.formatUnits(item.price.toString(), "ether");
            return {
              price,
              tokenId: tokenId.toString(),
              seller: item.seller,
              owner: item.owner,
              image: metadata.image,
              name: metadata.name,
              description: metadata.description,
              tokenURI,
            };
          } catch (error) {
            console.error(`Error processing item ${index}:`, error);
            return null;
          }
        })
      );
  
      const validItems = items.filter(item => item !== null);
      console.log("Processed items:", validItems);
  
      return validItems;
    } catch (error) {
      console.error("Error while Fetching NFTs:", error);
      return [];
    }
  };



  useEffect(()=>{fetchNFTs();},[])

  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();
      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFT();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Error while fetching Listed NFT");
    }
  };

  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      await transaction.wait();
    } catch (error) {
      console.log("Error while buying NFTs",error);
    }
  };

  return (
    <NFTBazzarContext.Provider
      value={{
        checkWalletConnected,
        connectWallet,
        uploadToPinata,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        uploadFileToIPFS,
        uploadJSONToIPFS,
        currentAccount,
        title,
      }}
    >
      {children}
    </NFTBazzarContext.Provider>
  );
};
