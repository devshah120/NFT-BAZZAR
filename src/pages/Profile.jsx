import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Container, Card3Dusage, Button } from "../components";
import { NFTBazzarContext } from '../../Context/NFTBazzarContext';
import { useSelector, useDispatch } from 'react-redux';
import EditUser from "../components/modals/EditUser"
import Resell from '../components/modals/Resell';
import userService from '../dataGathering/userData';
import { logout } from '../store/authSlice';
import NftsData from "../dataGathering/nftsData"
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import copy from "../assets/profile/document-copy.svg";
import editt from "../assets/profile/edit.svg";
import { LuCopyPlus } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

function Profile() {
  const nftss = useSelector((state) => state.nfts.nftList)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userData)
  const [editUserOpen, setEditUserOpen] = useState(false);
  const logoutt = async () => {
    try {
      const res = await userService.logout();
      if (res.status == 200) {
        dispatch(logout())
        navigate("/")
      }
    } catch (error) {

    }
  }
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  const isoDateString = user?.createdAt;
  const formattedDate = formatDate(isoDateString);
  console.log(formattedDate); // Outputs: August 2024



  const [selected, setSelected] = useState()
  const [onSaleNfts, setOnSaleNfts] = useState([])
  const [onAuctionNfts, setOnAuctionNfts] = useState([])
  const [boughtNfts, setBoughtNfts] = useState([])
  const [showNfts, setShowNfts] = useState([])
  const { fetchMyNFTsOrListedNFTs } = useContext(NFTBazzarContext);
  // const [nfts, setNfts] = useState([]);
  // const [nftsCopy, setNftsCopy] = useState([]);
  const { checkWalletConnected, currentAccount } = useContext(NFTBazzarContext);

  useEffect(() => {
    //   if(currentAccount){
    //     try {
    //       console.log("acc", currentAccount);

    //     const session = userService.login({MetaHash: currentAccount})
    //     console.log("peofile :" , session);

    //     console.log(session?.data?.checkuser);
    //       if (session.status == 200) {
    //         const userData = session.data.checkuser[0]
    //         const RefreshToken = session.data.RefreshToken
    //           dispatch(setToken(RefreshToken))
    //           dispatch(authLogin({userData}));
    //           navigate("/profile");
    //         } else if (session.status == 204) {
    //           navigate("/register", {state: { account: accounts[0] }})
    //         }
    //     alert("Connected account:", accounts[0]);
    //   } catch (error) {
    //     console.log("error:", error);

    //     alert("Error connecting to MetaMask:", error);
    //   }
    // } else {
    //   alert("MetaMask not detected");
    // }
    console.log("profile currentaccount", currentAccount)
    console.log("nftss", nftss)
    // setNfts(NftsData.getNftsByOwner(nftss, currentAccount));
    setOnAuctionNfts(NftsData.getOnAuctionNftsByOwner(nftss, currentAccount))
    setOnSaleNfts(NftsData.getOnSaleNftsByOwner(nftss, currentAccount))
    setBoughtNfts(NftsData.getBoughtNftsByOwner(nftss, currentAccount))
    if (checkWalletConnected) {
      checkWalletConnected();
    } else {
      console.log("No Know");
    }
  }, [currentAccount, nftss, dispatch]);

  // const location = useLocation();
  // const { account } = location.state || {};
  // const {checkWalletConnected,currentAccount} = useContext(NFTBazzarContext);
  // useEffect(() => {
  //     console.log(currentAccount);

  //   if (checkWalletConnected) {
  //     checkWalletConnected();
  //   }
  //   else{
  //     console.log("No Know");
  //   }
  // }, []);

  // const categories = ['OnSale', 'Owned', 'Created','Collection','Activity'];

  //   const nfts = [
  //     { id: 1, name: 'NFT 1', image: asa, description: 'Description for NFT 1', category: 'OnSale' },
  //     { id: 2, name: 'NFT 2', image: bsa, description: 'Description for NFT 2', category: 'Owned' },
  //     { id: 3, name: 'NFT 3', image: csa, description: 'Description for NFT 3', category: 'Created' },
  //     { id: 4, name: 'NFT 3', image: dsa, description: 'Description for NFT 3', category: 'Collection' },
  //     { id: 5, name: 'NFT 3', image: esa, description: 'Description for NFT 3', category: 'Activity' },
  //     // Add more NFT objects here
  //   ];

  const trimAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  return (
    <main>
      <div className=" min-h-screen  text-white  dark:text-black ">

        {/* Profile Picture Details */}
        <section className=" 
        ">
          <div >
            <img src={user?.BgImage_URL} alt="" className='w-full h-[300px] object-cover  shadow-lg filter ' />
          </div>
          <Container >

            <div className='flex flex-col rounded-lg relative '>
              <img src={user?.MainImage_URL} alt="" className='w-[150px] h-[150px] object-cover absolute rounded-3xl -top-16 left-1/2 transform -translate-x-1/2 sm:left-0 sm:translate-x-0 border z-[5] shadow-[0_0_20px_white] dark:shadow-[0_0_20px_black] ' />
              <div className=' flex flex-col mt-28'>
                <div className=' flex sm:justify-between flex-col sm:flex-row '>
                <div>
                <h1 className=' font-bold text-center sm:text-left text-4xl '>{user?.Name}</h1>
                <h1 className='
                            text-[#a8a7a7] font-medium text-center sm:text-left dark:text-slate-800'>
                  {`Joined ${formattedDate}`}
                </h1></div>
                <div className=' flex gap-4 justify-center mt-5'>
                <Button className={"flex justify-around h-fit"}>
                  <LuCopyPlus className=' text-xl mr-2 ' />
                  <editt/>
                  <h1 className=' text-black text-base dark:text-white font-semibold'>{currentAccount ? `${trimAddress(currentAccount)}` : "No account connected"}</h1></Button>
                  <Button onClick={() => {
                  setEditUserOpen(true)
                  if (typeof window != 'undefined' && window.document) {
                    console.log(document.body.style.overflow);

                    document.body.style.overflow = 'hidden';
                    console.log(document.body.style.overflow);

                  }
                }} className={"pr-2 pl-3 h-fit"}><FaUserEdit className=' text-2xl'/></Button>
                  <Button onClick={() => logoutt()} className={"pr-2 pl-2 h-fit"}><RiLogoutCircleRLine className=' text-2xl'/></Button>
                </div>
                </div>
                {/* <div className='h-[30px] w-[430px] rounded-full bg-transparent border bg-white flex justify-center items-center dark:border-slate-900 dark:border-2'>
                  <h1 className=' text-black dark:text-slate-700 font-semibold'>{currentAccount ? `${currentAccount}` : "No account connected"}</h1></div> */}
                
                
                <h1 className='font-thin text-wrap text-center sm:text-left text-xl mt-8 dark:font-normal'>{user?.Description}</h1>
                
              </div>
            </div>

          </Container>
        </section>

        {/* show all nft by their owner */}
        <section className=' my-10 '>
          <Container>
            <div className=' border-b-2 border-zinc-800 dark:border-[#c7c7c7]'></div>
          <div className='flex rounded-xl  dark:text-zinc-400 text-zinc-500 text-xl font-bold'>
            <div 
              className={`w-1/2 text-center flex justify-center items-center gap-2 py-2 rounded-s-lg cursor-pointer ${selected === 'owned' ? 'text-white dark:text-black' : ''}`} 
              onClick={() => {setShowNfts(NftsData.getBoughtNftsByOwner(nftss, currentAccount))
                setSelected('owned')}
              }
            >
              Owned <span className={` bg-zinc-600 ${selected === 'owned' ? 'text-white ' : ''} py-1 px-3  text-base rounded-xl`}>{boughtNfts.length}</span>
            </div>
            <div 
              className={`w-1/2 text-center flex justify-center items-center gap-2 py-2 rounded-e-lg cursor-pointer ${selected === 'onSale' ? 'text-white dark:text-black' : ''}`} 
              onClick={() => {setShowNfts(NftsData.getOnSaleNftsByOwner(nftss, currentAccount))
                setSelected('onSale')
              }}
            >
              On Sale <span className={` bg-zinc-600 ${selected === 'onSale' ? 'text-white ' : ''} py-1 px-3  text-base rounded-xl`}>{onSaleNfts.length}</span>
            </div><div 
              className={`w-1/2 text-center flex justify-center items-center gap-2 py-2 rounded-e-lg cursor-pointer ${selected === 'onAuction' ? 'text-white dark:text-black' : ''}`} 
              onClick={() => {setShowNfts(NftsData.getOnAuctionNftsByOwner(nftss, currentAccount))
                setSelected('onAuction')
              }}
            >
              On Auction <span className={` bg-zinc-600 ${selected === 'onAuction' ? 'text-white ' : ''} py-1 px-3  text-base rounded-xl`}>{onAuctionNfts.length}</span>
            </div>
          </div>
          <div className=' border-b-2 border-zinc-800 dark:border-[#c7c7c7]'></div>

          <div className="flex gap-4 flex-wrap mt-5 justify-center">
            {showNfts.length > 0 ? (
              showNfts.map((nft) => (
                <Card3Dusage
                  key={nft.tokenId}
                  tokenId={nft.tokenId}
                  Name={nft.name}
                  Creator={nft.creator}
                  Price={nft.price}
                  Image={nft.image}
                />
              ))
            ) : (
              <div className="text-center h-[483.2px] mt-5 flex items-center text-white dark:text-slate-950">
                No NFTs found with that name. Try a different search.
              </div>
            )}
          </div>
          </Container>
        </section>


        
      </div>
      {
        editUserOpen && <EditUser userdata={user} onClose={() => {
          setEditUserOpen(false)
          if (typeof window != 'undefined' && window.document) {
            console.log(document.body.style.overflow);
            document.body.style.overflow = '';
            console.log(document.body.style.overflow);
          }
        }} />  // Display the EditUser modal when isOpen is true
      }
    </main>
  )
}


export default Profile