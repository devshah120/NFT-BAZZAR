import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Container, Card3Dusage, Button} from "../components";
import { NFTBazzarContext } from '../../Context/NFTBazzarContext';
import { useSelector, useDispatch } from 'react-redux';
import EditUser from "../components/modals/EditUser"
import userService from '../dataGathering/userData';
import { logout } from '../store/authSlice';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.userData)
    const [editUserOpen,setEditUserOpen] = useState(false);
    const logoutt = async () => {
        try {
            const res = await userService.logout();
            if( res.status==200) {
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


    
    const [nfts,setNfts] = useState([])
    const { fetchMyNFTsOrListedNFTs } = useContext(NFTBazzarContext);
    // const [nfts, setNfts] = useState([]);
    // const [nftsCopy, setNftsCopy] = useState([]);
    const { checkWalletConnected, currentAccount } =  useContext(NFTBazzarContext);
  
    useEffect(() => {
      console.log("profile currentaccount", currentAccount)
      fetchMyNFTsOrListedNFTs(currentAccount).then((item) => {
      setNfts(item.reverse());
    //   setNftsCopy(item);
      console.log(nfts);
      });
      if (checkWalletConnected) {
        checkWalletConnected();
      } else {
        console.log("No Know");
      }
    }, [currentAccount]);

    // const location = useLocation();
    // const { account } = location.state || {};
    // const {checkWalletConnected,currentAccount} = useContext(NFTBazzarContext);
    useEffect(() => {
        console.log(currentAccount);
        
      if (checkWalletConnected) {
        checkWalletConnected();
      }
      else{
        console.log("No Know");
      }
    }, []);

    // const categories = ['OnSale', 'Owned', 'Created','Collection','Activity'];
  
//   const nfts = [
//     { id: 1, name: 'NFT 1', image: asa, description: 'Description for NFT 1', category: 'OnSale' },
//     { id: 2, name: 'NFT 2', image: bsa, description: 'Description for NFT 2', category: 'Owned' },
//     { id: 3, name: 'NFT 3', image: csa, description: 'Description for NFT 3', category: 'Created' },
//     { id: 4, name: 'NFT 3', image: dsa, description: 'Description for NFT 3', category: 'Collection' },
//     { id: 5, name: 'NFT 3', image: esa, description: 'Description for NFT 3', category: 'Activity' },
//     // Add more NFT objects here
//   ];

    
  return (
    <main>
        <div  className=" min-h-screen dark:bg-white text-white bg-black dark:text-black ">
            
            {/* Profile Picture Details */}
            <section className=" h-[100vh]  ">
                    <div >
                    <img src={user?.BgImage_URL} alt="" className='w-full h-[300px] object-cover rounded-lg shadow-lg filter ' />
                    </div>
                    <Container >
                 
                    <div className='flex justify-center items-center border-2 rounded-lg relative'>
                        <img src={user?.MainImage_URL} alt="" className='w-[150px] h-[150px] object-cover absolute  border-4 z-[5]'  />
                        <div className=' flex justify-center items-center flex-col gap-3'>
                            <h1 className=' font-bold  text-4xl mt-4  '>{user?.Name}</h1>
                            <div className='h-[30px] w-[430px] rounded-full bg-transparent border bg-white flex justify-center items-center dark:border-slate-900 dark:border-2'>
                                <h1 className=' text-black dark:text-slate-700 font-semibold'>{currentAccount ? `${currentAccount}` : "No account connected"}</h1></div>
                            <h1 className='font-thin text-xl text-center dark:font-normal'>{user?.Description}</h1>    
                            <h1 className='
                            text-[#a8a7a7] font-medium dark:text-slate-800'>
                                {`Joined ${formattedDate}`}
                            </h1>
                            <Button onClick={() => {setEditUserOpen(true)
                                if (typeof window != 'undefined' && window.document) {
                                    console.log(document.body.style.overflow);
                                    
                                    document.body.style.overflow = 'hidden';
                                    console.log(document.body.style.overflow);

                                }
                            }} >Edit</Button>
                            <Button onClick={() => logoutt()}>Logout</Button>
                        </div>
                    </div>
                    
                </Container>
                {/* <Container >
                
                    <div className='flex  justify-center items-center'>
                    <img src={bsa} alt="" className='w-[150px] h-[150px] object-cover filter -mt-[75px] border-4 z-10'  />
                    </div>
                    <div className=' flex justify-center items-center flex-col gap-3'>
                        <h1 className=' font-bold  text-4xl mt-4  '>Dhruv Shah</h1>
                        <div className='h-[30px] w-[430px] rounded-full bg-transparent border bg-white flex justify-center items-center dark:border-slate-900 dark:border-2'>
                            <h1 className=' text-black dark:text-slate-700 font-semibold'>{currentAccount ? `${currentAccount}` : "No account connected"}</h1></div>
                        <h1 className='font-thin text-xl text-center dark:font-normal'>I make art with the simple goal of giving <br/> you something pleasing to look at for a few seconds.</h1>    
                        <h1 className='
                         text-[#a8a7a7] font-medium dark:text-slate-800'>
                            Joined December 2021
                        </h1>

                    </div>
                </Container> */}
            </section>
            <section className="h-[100vh]">
    <Container>
      <div className="flex flex-col justify-center min-h-screen">
        <div className="items-center flex justify-center">
          <h1 className="font-logofont text-white dark:text-black text-3xl mb-8">
            Live Bidding{" "}
            <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
              NFTs
            </span>
          </h1>
        </div>
        <div>
          <Swiper
            slidesPerView={1}
            spaceBetween={7}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 3.5,
                spaceBetween: 50,
              },
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {nfts.map((nft) => (
              <SwiperSlide key={nft.tokenId}>
                <Card3Dusage
                  Name={nft.name}
                  Creator={nft.owner}
                  Price={nft.price}
                  Image={nft.image}
                  tokenId={nft.tokenId}
                  description={nft.description}
                  owner={nft.owner}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Container>
  </section>

            
       
                
       
       
       
        </div>
        {
            editUserOpen && <EditUser userdata={user} onClose={() => {setEditUserOpen(false)
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