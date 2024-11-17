import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  socketConnection : null,
  nftList: [],
  errror: null,
  loading: false,
}


const nftSlice = createSlice({
    name: 'nfts',
    initialState,
    reducers: {
      setSocketConnection : (state,action)=>{
        state.socketConnection = action.payload
      },
      setNfts: (state,action)=>{
        state.nftList = action.payload;
      },
      addNft: (state, action) => {
        state.nftList.push(action.payload);
      },
      buyNft: (state, action) => {
        const nft = state.nftList.find(n => n.tokenId === action.payload.tokenId);
        console.log("nftSlice",action.payload);
        console.log("nftSlice",nft);
        if (nft) {
          nft.seller = nft.owner;
          nft.owner = action.payload.buyer;
          nft.sold = true;
          nft.onSale = false;
        }
        console.log("nftSlice after",nft);
      },
      resellNft: (state, action) => {
        const nft = state.nftList.find(n => n.tokenId === action.payload.tokenId);
        if (nft) {
          nft.seller = nft.owner;
          nft.sold = false;
          nft.onAuction = action.payload.onAuction;
          nft.onSale = !action.payload.onAuction;
          nft.price = action.payload.price;
          nft.auctionEndTime = action.payload.auctionEndTime;
          nft.highestBid = 0;
          nft.highestBidder = action.payload.highestBidder;
        }
      },
      endAuction: (state, action) => {
        const nft = state.nftList.find(n => n.tokenId === action.payload.tokenId);
        if (nft) {
          nft.onAuction = false;
          nft.seller = nft.owner;
          nft.owner = action.payload.highestBidder;
          nft.price = action.payload.highestBid;
        }
        console.log("endAuction", nft);
      },
      bidNft: (state, action) => {
        const nft = state.nftList.find(n => n.tokenId === action.payload.tokenId);
        console.log("bidNft", action.payload);

        if (nft) {
          nft.highestBid = action.payload.highestBid;
          nft.highestBidder = action.payload.highestBidder;
        }
        console.log("bidNft", nft);
      }

    } 
})

export const { setSocketConnection, setNfts, addNft, buyNft, bidNft, endAuction, resellNft } = nftSlice.actions;

export default nftSlice.reducer;




