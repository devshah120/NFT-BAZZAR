import { useContext, useEffect, useState } from 'react';
import {Header , Footer} from './components'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import toast, {Toaster} from 'react-hot-toast'
import {NFTBazzarContext} from '../Context/NFTBazzarContext';
import { Register } from './pages';
import UserData from './dataGathering/userData';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login as authLogin,logout,setToken } from './store/authSlice'
import { setSocketConnection, setNfts, addNft, buyNft, bidNft, resellNft, endAuction } from './store/nftSlice';
import io from 'socket.io-client'

function App() {
  const user = useSelector((state) => state.auth.userData)
  const [loading,setLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const {fetchAllNFTs} = useContext(NFTBazzarContext);
    console.log(location);

    
  
    useEffect(() => {
      setLoading(true);
      const loadNfts = async () => {
        try {
          const nftList = await fetchAllNFTs();
          console.log("All items fetched", nftList);
          dispatch(setNfts(nftList));
        } catch (error) {
          console.error("Failed to fetch NFTs:", error);
        } finally {
          setLoading(false); // Ensure loading is false after fetching
        }
      };
      UserData.getUserDetails()
        .then((res) => {
          if(res.status === 200){
            const { user, RefreshToken } = res.data;
            const userData = user[0]
            
            
            dispatch(setToken(RefreshToken))
            dispatch(authLogin({userData}));
          } else if (res.status === 201 || res.status === 204) {
            dispatch(logout())
          }
        })
      loadNfts();
    },[]);
    const { checkWalletConnected, currentAccount } =  useContext(NFTBazzarContext);

    useEffect(() => {
      // if (checkWalletConnected) {
      //   checkWalletConnected();
      // } else {
      //   console.log("No Know");
      // }

      if(currentAccount && user && currentAccount !== user.MetaHash) {
        dispatch(logout())
      }


    },[currentAccount])
        
        

      

    useEffect(()=>{
      const socketConnection = io('http://localhost:3000')
       
      dispatch(setSocketConnection(socketConnection))

      socketConnection.on('idmarketItemCreated',(nftData) => {
        console.log("nftData: " , nftData);
        dispatch(addNft(nftData));
      })

      socketConnection.on('buyItem',({tokenId,buyer}) => {
        console.log("buyitem " , tokenId,buyer);
        dispatch(buyNft({tokenId,buyer}));
      })

      socketConnection.on('newBid', ({ tokenId,highestBidder, highestBid}) => {
        console.log("new bid received for id", tokenId, highestBidder, highestBid );
        dispatch(bidNft({tokenId, highestBid, highestBidder} ));
      });

      socketConnection.on('auctionEnded', ({ tokenId, highestBid, highestBidder }) => {
        console.log("auction ended",tokenId );
        dispatch(endAuction({tokenId, highestBid, highestBidder}))
      });

      socketConnection.on('resellItem', ({ tokenId, price, onAuction, auctionEndTime, highestBidder }) => {
        console.log("resell nft ",tokenId );
        dispatch(resellNft({tokenId, price, onAuction, auctionEndTime, highestBidder}))
      });

      

      return () => {
        socketConnection.disconnect()
      }
    },[dispatch])


    


  return (
    !loading && (location.pathname === "/register" ? (
      <div className='bg-black dark:bg-white'>
        <Register />
      </div>
    ) : (
      <div className=' bg-[#0c0c0c] dark:bg-white'>
          <Toaster/>
            <Header/>
            <ScrollToTop />
            <Outlet/> 
            <Footer/>
      </div>
    ))
  )
}

export default App


// ef1d8c72942d434cadf74980e53ced77