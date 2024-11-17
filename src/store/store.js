import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import nftSlice from './nftSlice';
const store = configureStore({
    reducer: {
        auth : authSlice,
        nfts: nftSlice,
    }
});

export default store;