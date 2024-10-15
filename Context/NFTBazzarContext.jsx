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

  const createNFT = async (name, description, price, image, catagory) => {
    if (!name || !description || !price || !image) {
      throw new Error("Missing required fields");
    }
  
    try {
      // Ensure price is a string and properly formatted
      const formattedPrice = price.toString();
      
      const data = JSON.stringify({ 
        name, 
        description, 
        price: formattedPrice,  // Store the original price in metadata
        image,
        catagory
      });
  
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
      console.log("IPFS URL:", ipfsUrl);
      console.log("Calling createSale with price:", formattedPrice);
      
      const tokenId = await createSale(ipfsUrl, formattedPrice);
      return tokenId;
    } catch (error) {
      console.error("Error in creating NFT:", error);
      if (error.response) {
        throw new Error(`IPFS Error: ${error.response.data.message}`);
      }
      throw error;
    }
  };

  const createSale = async (url, formInputPrice) => {
    console.log("Creating sale for:", url, formInputPrice);
    
    try {
      // Connect to contract
      const contract = await connectingWithSmartContract();
      if (!contract) {
        throw new Error("Failed to connect to smart contract");
      }
  
      // Get listing price from contract
      const listingPrice = await contract.getListingPrice();
      console.log("Listing price from contract:", ethers.formatEther(listingPrice), "MATIC");
  
      // Convert price to Wei
      const price = ethers.parseUnits(formInputPrice.toString(), 18);
  
      // Estimate gas before sending transaction
      const gasEstimate = await contract.createToken.estimateGas(url, price, { 
        value: listingPrice 
      });
  
      // Add 20% buffer to gas estimate - properly handle BigInt
      const gasLimit = BigInt(Math.floor(Number(gasEstimate) * 1.2));
  
      console.log("Transaction parameters:", {
        url,
        price: ethers.formatEther(price) + " MATIC",
        listingPrice: ethers.formatEther(listingPrice) + " MATIC",
        gasLimit: gasLimit.toString()
      });
  
      // Send transaction with estimated gas limit
      const transaction = await contract.createToken(url, price, {
        value: listingPrice,
        gasLimit,
        // Polygon Amoy specific configurations
        maxFeePerGas: ethers.parseUnits("100", "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits("30", "gwei"),
      });
  
      console.log("Transaction sent:", transaction.hash);
      
      // Wait for confirmation with timeout
      const receipt = await Promise.race([
        transaction.wait(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Transaction timeout")), 60000)
        )
      ]);
  
      console.log("Transaction confirmed in block:", receipt.blockNumber);
  
      // Find TokenCreated event
      const tokenCreatedEvent = receipt.logs.find(
        log => log.fragment && log.fragment.name === 'TokenCreated'
      );
  
      if (tokenCreatedEvent) {
        const tokenId = tokenCreatedEvent.args.tokenId;
        console.log("New token created with ID:", tokenId.toString());
        return tokenId;
      }
  
      throw new Error("TokenCreated event not found in transaction logs");
  
    } catch (error) {
      // Handle BigInt errors specifically
      if (error instanceof TypeError && error.message.includes('BigInt')) {
        console.error("BigInt calculation error. Please check all numeric values are properly converted.");
      } else if (error.code === -32603) {
        console.error("MetaMask RPC Error. Please check if you have enough MATIC and the correct network is selected");
      } else if (error.message.includes("user rejected")) {
        console.error("Transaction was rejected by the user");
      } else if (error.message.includes("insufficient funds")) {
        console.error("Insufficient MATIC to complete the transaction");
      } else {
        console.error("Error occurred while creating sale:", error);
      }
      throw error;
    }
  };

  // Start auction functionality
  const startAuction = async (tokenId, minPrice, auctionDuration) => {
    try {
      const contract = await connectingWithSmartContract();
      if (!contract) return;

      const price = ethers.parseUnits(minPrice.toString(), "ether");
      // const durationInSeconds = auctionDuration * 60 * 60; // Convert hours to seconds
      const durationInSeconds = auctionDuration * 60; // Convert minutes to seconds

      const gasEstimate = await contract.startAuction.estimateGas(tokenId, price, durationInSeconds);
      const gasLimit = BigInt(Math.floor(Number(gasEstimate) * 1.2)); // Add 20% buffer

      const transaction = await contract.startAuction(tokenId, price, durationInSeconds, {
        gasLimit,
        maxFeePerGas: ethers.parseUnits("100", "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits("30", "gwei"),
      });

      await transaction.wait();
      console.log("Auction started for tokenId:", tokenId);
    } catch (error) {
      console.log("Error starting auction:", error);
    }
  };

  // Place bid functionality
  const placeBid = async (tokenId, bidAmount) => {
    try {
      const contract = await connectingWithSmartContract();
      if (!contract) return;
      console.log("contract",contract)
      console.log("amou",bidAmount);
      console.log("str",bidAmount.toString());
      
      const bidValue = ethers.parseUnits(bidAmount.toString(), "ether");
      console.log("val",bidValue)
      const transaction = await contract.bid(tokenId, { 
        value: bidValue 
      });
      console.log("tran",transaction);
      

      await transaction.wait();
      console.log("Bid placed on tokenId:", tokenId);
    } catch (error) {
      if (error.code === 'NON_REENTRANT') {
        console.log("Non-reentrant function error");
      } else {
        console.log("Error placing bid:", error);
      }
    }
  };

  // End auction functionality
  const endAuction = async (tokenId) => {
    try {
      const contract = await connectingWithSmartContract();
      if (!contract) return;

      const transaction = await contract.endAuction(tokenId);

      await transaction.wait();
      console.log("Auction ended for tokenId:", tokenId);
    } catch (error) {
      console.log("Error ending auction:", error);
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
              creator: item.creator,
              image: metadata.image,
              name: metadata.name,
              description: metadata.description,
              catagory: metadata.catagory,
              sold: item.sold,
              tokenURI,
              onAuction: item.onAuction,
              onSale:item.onSale
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

  const fetchNftsByCat = async (cat) => {
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
            if(cat === metadata.catagory){
              return {
                price,
                tokenId: tokenId.toString(),
                seller: item.seller,
                owner: item.owner,
                creator: item.creator,
                image: metadata.image,
                name: metadata.name,
                description: metadata.description,
                catagory: metadata.catagory,
                sold: item.sold,
                tokenURI,
                onAuction: item.onAuction,
                onSale:item.onSale
              };
            } else {
              return null;
            }
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
  }

  const fetchNftsByid = async (id) => {
    try {
      console.log("Fetching NFTs...");
      const provider = new ethers.JsonRpcProvider(POLYGON_AMOY_RPC_URL);
      console.log("Provider created");
      const contract = fetchContract(provider);
      console.log("Contract fetched");
  
      const data = await contract.fetchSingleItem(id);
      console.log("Raw data from contract:", data);
  
      if (!data || data.length === 0) {
        console.log("No items returned from contract");
        return [];
      }
  
      const items = await Promise.all(
        data.map(async (item, index) => {
          // console.log(`Processing item ${index}:`, item);
          const tokenId = item._tokenId || item.tokenId;
          if (!tokenId) {
            console.log(`Item ${index} has no tokenId:`, item);
            return null;
          }
          console.log("rockstar id ",tokenId.toString())
          console.log("star id",id);
          
          if(tokenId.toString() === id){
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
                  creator: item.creator,
                  image: metadata.image,
                  name: metadata.name,
                  description: metadata.description,
                  catagory: metadata.catagory,
                  sold: item.sold,
                  tokenURI,
                  onAuction: item.onAuction,
                  onSale:item.onSale
                };
                
            } catch (error) {
              console.error(`Error processing item ${index}:`, error);
              return null;
            }

          } else {
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
  }
//   const endAuction = async (tokenId) => {
//     try {
//         const contract = await connectingWithSmartContract();
        
//         const transaction = await contract.endAuction(tokenId);
//         await transaction.wait();
//         console.log("Auction ended for tokenId:", tokenId);
//     } catch (error) {
//         console.error("Error ending auction:", error);
//     }
// };

// Optionally: Use an interval or similar approach to check if auctions need to be ended automatically
const fetchSingleAuctionItem = async(tokenId) => {
  console.log("AFetching NFTs...");
      const provider = new ethers.JsonRpcProvider(POLYGON_AMOY_RPC_URL);
      console.log("AProvider created");
      const contract = fetchContract(provider);
      console.log("AContract fetched");
  
      const data = await contract.fetchSingleAuctionItem(tokenId);
      console.log("ARaw auction data from contract:", data);

      const items = await Promise.all(
        data.map(async (item, index) => {
          console.log(`AProcessing item ${index}:`, item);
          const tokenId = item._tokenId || item.tokenId;
          if (!tokenId) {
            console.log(`AItem ${index} has no tokenId:`, item);
            return null;
          }
          try {
            const minBid = ethers.formatUnits(item.minBid.toString(), "ether");
            const highestBid = ethers.formatUnits(item.highestBid.toString(), "ether");
            const tokenURI = await contract.tokenURI(tokenId);
            console.log(`TokenURI for ${tokenId}:`, tokenURI);
            const marketnft = await contract.fetchSingleItem(tokenId)
            const { data: metadata } = await axios.get(tokenURI);
            console.log(`Metadata for ${tokenId}:`, metadata);
            
            return {
              tokenId: tokenId.toString(),
              owner: marketnft[0].owner,
              creator: marketnft[0].creator,
              image: metadata.image,
              name: metadata.name,
              description: metadata.description,
              tokenURI,
              onAuction:marketnft[0].onAuction,
              onSale:item.onSale,
              tokenId: tokenId.toString(),
              seller: item.seller,
              minBid,
              highestBid,
              highestBidder: item.highestBidder,
              auctionEndTime: item.auctionEndTime,
              active: item.active,
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

}
const fetchAuctionItems = async () => {
      console.log("AFetching NFTs...");
      const provider = new ethers.JsonRpcProvider(POLYGON_AMOY_RPC_URL);
      console.log("AProvider created");
      const contract = fetchContract(provider);
      console.log("AContract fetched");
  
      const data = await contract.fetchAuctionItem();
      console.log("ARaw auction data from contract:", data);

      const items = await Promise.all(
        data.map(async (item, index) => {
          console.log(`AProcessing item ${index}:`, item);
          const tokenId = item._tokenId || item.tokenId;
          if (!tokenId) {
            console.log(`AItem ${index} has no tokenId:`, item);
            return null;
          }
          try {
            const minBid = ethers.formatUnits(item.minBid.toString(), "ether");
            const highestBid = ethers.formatUnits(item.highestBid.toString(), "ether");
            const tokenURI = await contract.tokenURI(tokenId);
            console.log(`TokenURI for ${tokenId}:`, tokenURI);
            const marketnft = await contract.fetchSingleItem(tokenId)
            const { data: metadata } = await axios.get(tokenURI);
            console.log(`Metadata for ${tokenId}:`, metadata);
            
            return {
              tokenId: tokenId.toString(),
              owner: marketnft[0].owner,
              creator: marketnft[0].creator,
              image: metadata.image,
              name: metadata.name,
              description: metadata.description,
              tokenURI,
              onAuction:marketnft[0].onAuction,
              onSale:item.onSale,
              tokenId: tokenId.toString(),
              seller: item.seller,
              minBid,
              highestBid,
              highestBidder: item.highestBidder,
              auctionEndTime: item.auctionEndTime,
              active: item.active,
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

}
const checkAndEndAuctions = async () => {
    // Fetch all ongoing auctions and check their end time
    // This could be a batch call or loop through a list of active auctions
    const ongoingAuctions = await fetchAuctionItems(); // Implement this function to fetch your auctions
  console.log("Ongoing auctions:", ongoingAuctions);
    for (const auction of ongoingAuctions) {
        if (auction.auctionEndTime <= Date.now() / 1000) { // Assuming endTime is in seconds
            await endAuction(auction.tokenId);
            console.log(`tokenId ${auction.tokenId} nu puru`);
            
        }
    }
};

// Call this function periodically (e.g., using setInterval)
setInterval(checkAndEndAuctions, 60000); // Check every minute



  // useEffect(()=>{fetchNFTs();},[])

  const fetchMyNFTsOrListedNFTs = async (currentAccount) => {
    try {
      // const contract = await connectingWithSmartContract();
      // const data = await contract.fetchItemsListed(currentAccount)
      // console.log("Fetching own NFTs...");
      const provider = new ethers.JsonRpcProvider(POLYGON_AMOY_RPC_URL);
      console.log("Provider created",provider);
      const contract = fetchContract(provider);
      console.log("Contract fetched");

      const data = await contract.fetchItemsListed(currentAccount);
      console.log("Raw data from contract:", data);

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
              creator: item.creator,
              image: metadata.image,
              name: metadata.name,
              description: metadata.description,
              tokenURI,
              sold:item.sold
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
      console.log("Error while fetching Listed NFT",error);
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
        startAuction,
        placeBid,
        endAuction,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        fetchAuctionItems,
        fetchNftsByCat,
        fetchNftsByid,
        fetchSingleAuctionItem,
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
