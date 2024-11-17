"use client";
import React, {  useRef, useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { useNavigate } from "react-router-dom";
import fig from "../assets/working/3759390.jpg";
import Resell from "./modals/Resell";
import { NFTBazzarContext } from "../../Context/NFTBazzarContext";
import { useSelector } from "react-redux";
import CountdownTimer from "../components/Countdown";
import Container from "./Container";
import Button from "./Button";
import { Input } from "./Input";

export const StickyScroll = ({

  contentClassName,
  nftData
}) => {
  const trimAddress = (address) => {
    return `${address}`;
  };
  const navigate = useNavigate();
  const [bid, setBid] =useState();
  const [resellOpen,setResellOpen] = useState();
  const [loader,setLoader] = useState();
  const socketConnection = useSelector(state => state.nfts.socketConnection);
  console.log("scrollpage",nftData.owner);
  const price = nftData.price;
  
  const tokenId = nftData.tokenId;
  console.log(nftData);
  
  const user = useSelector((state) => state.auth.userData)
  console.log("scrollpage",user.MetaHash.toLowerCase() === nftData?.highestBidder.toLowerCase());
  console.log("userData", user)
  
  const { buyNFT,placeBid,fetchSingleAuctionItem } = useContext(NFTBazzarContext);
  
  const handleBuyNFT = async () => {
    console.log("Buy button clicked");
    try { 
      setLoader(true)
      const nftData = {
        tokenId: tokenId,
        price // Ensure price is a string
      };
      console.log("Attempting to buy NFT with data:", nftData);
      await buyNFT(nftData);
      console.log("NFT purchase completed");
      setLoader(false)
      navigate("/")
      alert("NFT purchase completed");
    } catch (error) {
      console.error("Error buying NFT:", error);
      setLoader(false)
    }
  };
  const righttime = new Date().getTime();
  const countdown = nftData?.auctionEndTime !== undefined 
  ? (nftData.auctionEndTime.toString() * 1000) - righttime 
  : "";
  console.log("countdown",countdown);
  console.log("righttime",righttime);

  
  
  const handlePlaceBid = async (e) => {
    console.log("Buy button clicked");
    console.log("bid",bid);
    console.log("tru or fsl",bid && bid > nftData?.highestBid && bid > nftData?.price);
    
    if(bid && bid > nftData?.highestBid && bid > nftData?.price){
      console.log(socketConnection);  
      
      if(socketConnection){
        console.log("placeBid called");
      //   socketConnection.emit("placeBid", {
      //     tokenId,
      //     bidAmount: bid
      //   });
      // }
      try {
        setLoader(true)
        const nftDataaa = {
          tokenId: tokenId,
          bidAmount: bid, // Ensure price is a string
        };
        console.log("Attempting to bid NFT with data:", nftDataaa);
        await placeBid(tokenId,nftDataaa.bidAmount);
        console.log("NFT purchase completed");
        setLoader(false)
        navigate("/")
        alert("bid successfully");
      } catch (error) {
        console.error("Error in biding NFT:", error);
        setLoader(false)
      }
    } else if(bid > nftData?.highestBid || bid > nftData?.minBid){
      alert("Please enter a valid bid and make sure it is greater than the current highest bid and the minimum bid")
    }
  }
  }
  return (
    
      nftData ? (
        <motion.div>
      <Container>
        <div className=" overflow-y-auto no-scrollbar md:h-[100vh] relative md:space-x-10 rounded-md flex flex-col md:flex-row ">
      <div className="div md:w-2/3 relative flex items-start px-4">
        <div className="max-w-2xl">
          <div className=" w-full flex justify-center mb-5">
        <motion.img  
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          src={nftData.image}
          alt=""
          className=" mt-4 mb-4 h-[600px] w-[600px] rounded-xl "
          /></div>
          <div className=" w-full h-0 border-b-2 mb-5"></div>
          <h1 className=" text-white dark:text-black text-2xl font-extrabold mb-2">Description :</h1>
          <h1 className=" text-white text-lg dark:text-black font-light">
           {nftData.description}
         </h1>
          <div className="md:h-40" />
        </div>
      </div>
      <div
        // style={{ background: backgroundGradient }}
        className={cn(
          "block md:w-1/3 my-4 rounded-md md:px-0 px-4 text-white dark:text-black md:top-10 sticky",
          contentClassName
        )}
      >
        <div className=" flex flex-col  gap-6 ">
        <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                className=" gap-2 flex flex-col"
              >
                <div className=" flex gap-3 items-center">
                  <img src={fig} alt="" className=" h-7 w-7 rounded-full" />
                  <h1 className=" font-semibold">{trimAddress(nftData.owner)}</h1>
                </div>
                <h1 className=" text-3xl font-bold">{nftData.name}</h1>

                <div className=" flex flex-row mt-5 gap-[50px]">
                  <div className=" flex gap-3 items-center mb-3">
                    <img src={fig} alt="" className=" h-10 w-10 rounded" />
                    <div>
                      <h6 className=" text-xs   font-semibold">
                        Creator
                      </h6>
                      <h6 className=" text-sm ease-in transition-all  hover:text-[#28F0CC] font-bold">
                      {trimAddress(nftData.creator)}
                      </h6>
                    </div>
                  </div>
                  {/* <div className=" flex gap-3 items-center mb-3">
                    <img src={fig} alt="" className=" h-10 w-10 rounded" />
                    <div>
                      <h6 className=" text-xsfont-semibold">
                        Owened By:
                      </h6>
                      <h6 className=" text-sm ease-in transition-all  hover:text-[#28F0CC] font-bold">
                        Dhruv Shah
                      </h6>
                    </div>
                  </div> */}
                </div>
                <div className=" flex flex-row mt-5 gap-[50px]">
                  <div className=" flex gap-3 items-center mb-3">
                    <div>
                      <h6 className=" text-lg   font-semibold">
                        Price:
                      </h6>
                      <h6 className=" text-xl ease-in transition-all  hover:text-[#28F0CC] font-bold">
                      {`${nftData.price} MATIC`}
                      </h6>
                    </div>
                  </div>
                  {/* <div className=" flex gap-3 items-center mb-3">
                    <img src={fig} alt="" className=" h-10 w-10 rounded" />
                    <div>
                      <h6 className=" text-xsfont-semibold">
                        Owened By:
                      </h6>
                      <h6 className=" text-sm ease-in transition-all  hover:text-[#28F0CC] font-bold">
                        Dhruv Shah
                      </h6>
                    </div>
                  </div> */}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                className=" gap-2 flex flex-col"
              >
              {!nftData.onSale && nftData.onAuction && (
                user.MetaHash.toLowerCase() !== nftData?.owner.toLowerCase() && (
                <motion.div
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
              
                  className=" flex gap-6 border rounded-md w-full flex-col   bg-transparent mt-4 ">
                  <div className="flex flex-col  md:justify-center gap-6 m-4">
                    <div className=" flex flex-col justify-center">
                      <h1 className=" text-[#6d6d6d] font-extrabold">HighestBid</h1>
                      <h1>{`${nftData?.highestBid} MATIC`}</h1>
                      <h1 className=" text-[#6d6d6d] font-extrabold">HighestBidder</h1>
                      <h1>{`${trimAddress(nftData?.highestBidder)}`}</h1>
                    </div>
                    <div className="">
                      <h1>Auction Ends In</h1>
                      <CountdownTimer initialSeconds={Math.floor(countdown/1000)} />
                    </div>
                    {user.MetaHash.toLowerCase() === nftData?.highestBidder.toLowerCase() ? (
                      <div className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                        You are the highest bidder!
                      </div>
                    ) : (<div>
                    <Input
                      placeholder="place Bid"
                      type="text"
                      value={bid}
                      onChange={(e) => setBid(e.target.value)}
                    />
                      <Button
                        className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7"
                        onClick={handlePlaceBid}
                      >
                        {
                      loader? "Loading..." : "Place Bid"
                    }
                      </Button>
                    </div>)}
                    

                  </div>
                </motion.div>)
              )}
              {!nftData.onSale && nftData.onAuction && (
                user.MetaHash.toLowerCase() === nftData.owner.toLowerCase() && (
                  <div className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                    Your nft on auction
                  </div>
                )
              )}
              {nftData.onSale && !nftData.onAuction && (
                user.MetaHash.toLowerCase() === nftData.owner.toLowerCase() && (
                  <div className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                    Your nft on sale
                  </div>
                )
              )}
              {nftData.onSale && !nftData.onAuction && (
                user.MetaHash.toLowerCase() !== nftData.owner.toLowerCase() && (
                  <Button
                    className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7"
                    onClick={handleBuyNFT}
                  >
                      {
                      loader? "Loading..." : "Buy Now"
                      }
                  </Button>
                  
                )
              )}
              {!nftData.onSale && !nftData.onAuction && (
                user.MetaHash.toLowerCase() === nftData.owner.toLowerCase() && (
                  <Button
                    className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7"
                    onClick={() => {setResellOpen(true)
                      if (typeof window != 'undefined' && window.document) {
                          console.log(document.body.style.overflow);
                          
                          document.body.style.overflow = 'hidden';
                          console.log(document.body.style.overflow);

                      }
                    }}
                  >
                    Resell
                  </Button>
                )
              )}
              {/* {currentAccount.toLowerCase() !== nftData.creator.toLowerCase() && (
                  <Button
                    className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7"
                    // onClick={handleBuyNFT}
                  >
                    
                      {}
                    
                  </Button>
                )}

                {user.MetaHash.toLowerCase() === nftData.creator.toLowerCase() && (
                  <div className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                    You Cannot Buy
                  </div>
                )} */}
                </motion.div>

              
                  {/* <Button className="  md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                    Place Bid
                  </Button> */}
            </div>
      </div>
      </div>
      </Container>

        {
            resellOpen && <Resell nftdata={nftData} onClose={() => {setResellOpen(false)
                if (typeof window != 'undefined' && window.document) {
                    console.log(document.body.style.overflow);
                    
                    document.body.style.overflow = '';
                    console.log(document.body.style.overflow);

                }
            }} />  // Display the EditUser modal when isOpen is true
        }
    </motion.div>
      ) : (
        <div>Loading NFT data...</div> // Or a placeholder
      )



    
  );
};
export default StickyScroll;
