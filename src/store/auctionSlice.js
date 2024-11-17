import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auctionList: null,
  socketConnection : null,
  error: null,
  loading: false,
};

const auctionSlice = createSlice({
  name: 'auctions',
  initialState,
  reducers: {
    setSocketConnection : (state,action)=>{
      state.socketConnection = action.payload
    }
    }
})

export const { setSocketConnection } = auctionSlice.actions;

export default auctionSlice.reducer;