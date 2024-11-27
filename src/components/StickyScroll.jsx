"use client";
import React, { useRef, useState, useContext, useEffect } from "react";
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
import Countdown from "react-countdown";
import PlaceBid from "./modals/PlaceBid";
import UserData from "../dataGathering/userData"
import owner from '../assets/profile/owner.jpg'
import creator from '../assets/profile/creator.jpg'


export const StickyScroll = ({ contentClassName, nftData }) => {
  const trimAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };
  const navigate = useNavigate();
  const [bid, setBid] = useState();
  const [resellOpen, setResellOpen] = useState();
  const [placeBidOpen, setPlaceBidOpen] = useState();
  const [loader, setLoader] = useState();
  const socketConnection = useSelector((state) => state.nfts.socketConnection);
  console.log("scrollpage", nftData.owner);
  const price = nftData.price;

  const tokenId = nftData.tokenId;
  console.log(nftData);

  const user = useSelector((state) => state.auth.userData);
  console.log(
    "scrollpage",
    user.MetaHash.toLowerCase() === nftData?.highestBidder.toLowerCase()
  );
  console.log("userData", user);

  const { buyNFT, placeBid, fetchSingleAuctionItem } =
    useContext(NFTBazzarContext);

  const handleBuyNFT = async () => {
    console.log("Buy button clicked");
    try {
      setLoader(true);
      const nftData = {
        tokenId: tokenId,
        price, // Ensure price is a string
      };
      console.log("Attempting to buy NFT with data:", nftData);
      await buyNFT(nftData);
      console.log("NFT purchase completed");
      setLoader(false);
      navigate("/");
      alert("NFT purchase completed");
    } catch (error) {
      console.error("Error buying NFT:", error);
      setLoader(false);
    }
  };
  const righttime = new Date().getTime();
  const countdown =
    nftData?.auctionEndTime !== undefined
      ? nftData.auctionEndTime.toString()
      : "";
  console.log("countdown", countdown);
  console.log("righttime", righttime);

  const handlePlaceBid = async (e) => {
    console.log("Buy button clicked");
    console.log("bid", bid);
    console.log(
      "tru or fsl",
      bid && bid > nftData?.highestBid && bid > nftData?.price
    );

    if (bid && bid > nftData?.highestBid && bid > nftData?.price) {
      console.log(socketConnection);

      if (socketConnection) {
        console.log("placeBid called");
        //   socketConnection.emit("placeBid", {
        //     tokenId,
        //     bidAmount: bid
        //   });
        // }
        try {
          setLoader(true);
          const nftDataaa = {
            tokenId: tokenId,
            bidAmount: bid, // Ensure price is a string
          };
          console.log("Attempting to bid NFT with data:", nftDataaa);
          await placeBid(tokenId, nftDataaa.bidAmount);
          console.log("NFT purchase completed");
          setLoader(false);
          navigate("/");
          alert("bid successfully");
        } catch (error) {
          console.error("Error in biding NFT:", error);
          setLoader(false);
        }
      } else if (bid > nftData?.highestBid || bid > nftData?.minBid) {
        alert(
          "Please enter a valid bid and make sure it is greater than the current highest bid and the minimum bid"
        );
      }
    }
  };

  // useEffect(
  //   async () => {
  //     if(nftData.creator){
  //       const data = await UserData.getUserData({MetaHash : nftData.creator});
  //       console.log(data);
  //     }
  //   }
  // ,[]);


  const renderer = ({ days,hours, minutes, seconds, completed }) => {
    // console.log("this is renderr", hours, minutes, seconds, completed);
    
    if (completed) {
      // Render a completed state
      return <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold  h-16 rounded-lg">
      Wait for while
    </div>;
    } else {
      // Render a countdown
      return (
        <div className=" flex gap-4">
          <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
            {days}
          </div>
          <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
            {hours}
          </div>
          <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
            {minutes}
          </div>
          <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
            {seconds}
          </div>
        </div>
      );
    }
  };
  return nftData ? (
    <motion.div>
      <Container>
        <div className=" overflow-y-auto no-scrollbar md:h-[100vh] relative  rounded-md flex flex-col md:flex-row justify-center items-center">
          <div className="div md:w-1/2 relative flex justify-center items-start px-4">
            <div className="max-w-2xl">
              <div className=" w-full flex justify-center mb-5">
                <motion.img
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                  src={nftData.image}
                  alt=""
                  className=" mt-4 mb-4 h-[500px] w-[500px] rounded-xl "
                />
              </div>
              {/* <div className=" w-full h-0 border-b-2 mb-5"></div>
          <h1 className=" text-white dark:text-black text-2xl font-extrabold mb-2">Description :</h1>
          <h1 className=" text-white text-lg dark:text-black font-light">
           {nftData.description}
         </h1>
          <div className="md:h-40" /> */}
            </div>
          </div>
          <div
            // style={{ background: backgroundGradient }}
            className={cn(
              "block md:w-1/2 my-4 rounded-md md:px-0 px-4 text-white dark:text-black md:top-10 sticky",
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
                <h2 className=" text-4xl font-bold text-white">
                  {nftData.name}
                </h2>
                <h2 className=" text-xl text-gray-400 font-bold mb-2">
                  {nftData.description}
                </h2>
                {/* creator owner */}
                <div className="  dark:bg-[#ededed] flex rounded-2xl gap-3">
                  <div className=" flex gap-3 items-center w-full p-2 rounded-xl bg-zinc-800 dark:bg-[#ffffffbd]">
                    <img
                      src={creator}
                      alt=""
                      className=" h-10 w-10 rounded-full "
                    />
                    <div>
                      <h6 className=" text-white text-xs   font-semibold">
                        Creator
                      </h6>
                      <h6 className=" text-sm ease-in text-white transition-all font-bold">
                        {trimAddress(nftData.creator)}
                      </h6>
                    </div>
                  </div>
                  <div className=" flex gap-3 items-center w-full text-white p-2 bg-zinc-800 rounded-xl  dark:bg-[#ffffffbd]">
                    <img
                      src={owner}
                      alt=""
                      className=" h-10 w-10 rounded-full"
                    />
                    <div>
                      <h6 className=" text-xs   font-semibold">Owner</h6>
                      <h6 className=" text-sm ease-in transition-all   font-bold">
                        {trimAddress(nftData.creator)}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className=" mt-2  dark:bg-[#ededed] text-white rounded-2xl">
                  <div className=" border-b-2 border-[#8cc8f9] my-4 "></div>
                  <h6 className=" text-lg  text-[#767676] font-semibold">
                    Floor price:
                  </h6>
                  <h6 className=" text-xl ease-in transition-all  font-bold">
                    {`${nftData.price} MATIC`}
                  </h6>

                  {/* auction details */}

                  {!nftData.onSale &&
                    nftData.onAuction &&
                    user.MetaHash.toLowerCase() !==
                      nftData?.owner.toLowerCase() && (
                      <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 120,
                        }}
                        className=" flex gap-6 w-full flex-col   mt-4 "
                      >
                        <div className=" rounded-xl mt-2  dark:bg-[#ffffffbd]">
                          <h6 className=" text-lg text-[#767676] font-semibold mb-1">
                            Auction ends in:
                          </h6>
                          <Countdown
                            date={countdown*1000}
                            renderer={renderer}
                          />
                          {/* <div className=" flex gap-4">
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              1
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              13
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              10
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              58
                            </div>
                          </div> */}
                          <div className="  dark:bg-[#ededed] mt-4 flex flex-col rounded-lg gap-3">
                            <div className=" flex gap-3 items-center w-1/2 p-2 rounded-xl bg-zinc-800 dark:bg-[#ffffffbd]">
                              <div>
                                <h6 className=" text-white text-base   font-semibold">
                                  Highest Bid
                                </h6>
                                <h6 className=" text-sm ease-in text-white transition-all font-bold">
                                  {`${nftData.highestBid} MATIC`}
                                </h6>
                              </div>
                            </div>
                            <div className=" flex gap-3 items-center w-1/2 text-white p-2 bg-zinc-800 rounded-xl  dark:bg-[#ffffffbd]">
                              <div>
                                <h6 className=" text-base font-semibold">
                                  Highest Bidder
                                </h6>
                                <h6 className=" text-sm ease-in transition-all   font-bold">
                                  {trimAddress(nftData.highestBidder)}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" border-b-2 border-[#8cc8f9] my-4 "></div>
                        <div className="flex gap-3 mt-2">
                          <button onClick={() => {
                           setPlaceBidOpen(true);
                           if (typeof window != "undefined" && window.document) {
                             console.log(document.body.style.overflow);

                             document.body.style.overflow = "hidden";
                             console.log(document.body.style.overflow);
                           }
                         }}
                       className="rounded-xl text-base  px-4 py-2 w-full bg-white dark:bg-black  dark:text-white text-nowrap text-black font-bold">
                            {loader ? "Loading..." : "Place Bid"}
                          </button>
                        </div>
                        {/* <div className="flex flex-col  md:justify-center gap-6 m-4">
                          <div className=" flex flex-col justify-center">
                            <h1 className=" text-[#6d6d6d] font-extrabold">
                              HighestBid
                            </h1>
                            <h1>{`${nftData?.highestBid} MATIC`}</h1>
                            <h1 className=" text-[#6d6d6d] font-extrabold">
                              HighestBidder
                            </h1>
                            <h1>{`${trimAddress(nftData?.highestBidder)}`}</h1>
                          </div>
                          <div className="">
                            <h1>Auction Ends In</h1>
                            <CountdownTimer
                              initialSeconds={Math.floor(countdown / 1000)}
                            />
                          </div>
                          {user.MetaHash.toLowerCase() ===
                          nftData?.highestBidder.toLowerCase() ? (
                            <div className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                              You are the highest bidder!
                            </div>
                          ) : (
                            <div>
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
                                {loader ? "Loading..." : "Place Bid"}
                              </Button>
                            </div>
                          )}
                        </div> */}
                      </motion.div>
                    )}
                  {!nftData.onSale &&
                    nftData.onAuction &&
                    user.MetaHash.toLowerCase() ===
                      nftData.owner.toLowerCase() && (
                      <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 120,
                        }}
                        className=" flex gap-6 w-full flex-col   mt-4 "
                      >
                        <div className=" rounded-xl mt-2  dark:bg-[#ffffffbd]">
                          <h6 className=" text-lg text-[#767676] font-semibold mb-1">
                            Auction ends in:
                          </h6>
                          <Countdown
                            date={countdown*1000}
                            renderer={renderer}
                          />
                          {/* <div className=" flex gap-4">
                      <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                        1
                      </div>
                      <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                        13
                      </div>
                      <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                        10
                      </div>
                      <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                        0
                      </div>
                    </div> */}
                          <div className="  dark:bg-[#ededed] mt-4 flex flex-col rounded-lg gap-3">
                            <div className=" flex gap-3 items-center w-1/2 p-2 rounded-xl bg-zinc-800 dark:bg-[#ffffffbd]">
                              <div>
                                <h6 className=" text-white text-base   font-semibold">
                                  Highest Bid
                                </h6>
                                <h6 className=" text-sm ease-in text-white transition-all font-bold">
                                  {`${nftData.highestBid} MATIC`}
                                </h6>
                              </div>
                            </div>
                            <div className=" flex gap-3 items-center w-1/2 text-white p-2 bg-zinc-800 rounded-xl  dark:bg-[#ffffffbd]">
                              <div>
                                <h6 className=" text-base font-semibold">
                                  Highest Bidder
                                </h6>
                                <h6 className=" text-sm ease-in transition-all   font-bold">
                                  {trimAddress(nftData.highestBidder)}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" border-b-2 border-[#8cc8f9] my-4 "></div>
                        <div className="flex gap-3 mt-2">
                          <button
                            disabled
                            className="rounded-xl text-base  px-4 py-2 w-full bg-white dark:bg-black  dark:text-white text-nowrap text-black font-bold"
                          >
                            Your NFT are on auction.
                          </button>
                        </div>
                        {/* <div className="flex flex-col  md:justify-center gap-6 m-4">
                          <div className=" flex flex-col justify-center">
                            <h1 className=" text-[#6d6d6d] font-extrabold">
                              HighestBid
                            </h1>
                            <h1>{`${nftData?.highestBid} MATIC`}</h1>
                            <h1 className=" text-[#6d6d6d] font-extrabold">
                              HighestBidder
                            </h1>
                            <h1>{`${trimAddress(nftData?.highestBidder)}`}</h1>
                          </div>
                          <div className="">
                            <h1>Auction Ends In</h1>
                            <CountdownTimer
                              initialSeconds={Math.floor(countdown / 1000)}
                            />
                          </div>
                          {user.MetaHash.toLowerCase() ===
                          nftData?.highestBidder.toLowerCase() ? (
                            <div className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                              You are the highest bidder!
                            </div>
                          ) : (
                            <div>
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
                                {loader ? "Loading..." : "Place Bid"}
                              </Button>
                            </div>
                          )}
                        </div> */}
                      </motion.div>
                    )}

                  {/* onsale complete */}
                  {nftData.onSale &&
                    !nftData.onAuction &&
                    user.MetaHash.toLowerCase() ===
                      nftData.owner.toLowerCase() && (
                      <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 120,
                        }}
                        className=" flex gap-6 w-full flex-col   mt-4 "
                      >
                        <div className=" rounded-xl mt-2  dark:bg-[#ffffffbd]">
                          <h6 className=" text-lg text-[#767676] font-semibold mb-1">
                            Auction ends in:
                          </h6>
                          <div className=" flex gap-4">
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                          </div>
                          <div className="  dark:bg-[#ededed] mt-4 flex flex-col rounded-lg gap-3">
                            <div className=" flex gap-3 items-center w-1/2 p-2 rounded-xl bg-zinc-800 dark:bg-[#ffffffbd]">
                              <div>
                                <h6 className=" text-white text-base   font-semibold">
                                  Highest Bid
                                </h6>
                                <h6 className=" text-sm ease-in text-white transition-all font-bold">
                                  {`${nftData.highestBid} MATIC`}
                                </h6>
                              </div>
                            </div>
                            <div className=" flex gap-3 items-center w-1/2 text-white p-2 bg-zinc-800 rounded-xl  dark:bg-[#ffffffbd]">
                              <div>
                                <h6 className=" text-base font-semibold">
                                  Highest Bidder
                                </h6>
                                <h6 className=" text-sm ease-in transition-all   font-bold">
                                  {trimAddress(nftData.highestBidder)}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" border-b-2 border-[#8cc8f9] my-4 "></div>
                        <div className="flex gap-3 mt-2">
                          <button
                            disabled
                            className="rounded-xl text-base  px-4 py-2 w-full bg-white dark:bg-black  dark:text-white text-nowrap text-black font-bold"
                          >
                            Your NFT are on sale.
                          </button>
                        </div>
                        {/* <div className="flex flex-col  md:justify-center gap-6 m-4">
                          <div className=" flex flex-col justify-center">
                            <h1 className=" text-[#6d6d6d] font-extrabold">
                              HighestBid
                            </h1>
                            <h1>{`${nftData?.highestBid} MATIC`}</h1>
                            <h1 className=" text-[#6d6d6d] font-extrabold">
                              HighestBidder
                            </h1>
                            <h1>{`${trimAddress(nftData?.highestBidder)}`}</h1>
                          </div>
                          <div className="">
                            <h1>Auction Ends In</h1>
                            <CountdownTimer
                              initialSeconds={Math.floor(countdown / 1000)}
                            />
                          </div>
                          {user.MetaHash.toLowerCase() ===
                          nftData?.highestBidder.toLowerCase() ? (
                            <div className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                              You are the highest bidder!
                            </div>
                          ) : (
                            <div>
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
                                {loader ? "Loading..." : "Place Bid"}
                              </Button>
                            </div>
                          )}
                        </div> */}
                      </motion.div>
                    )}

                  {/* buynow complete */}
                  {nftData.onSale &&
                    !nftData.onAuction &&
                    user.MetaHash.toLowerCase() !==
                      nftData.owner.toLowerCase() && (
                      <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 120,
                        }}
                        className=" flex gap-6 w-full flex-col   mt-4 "
                      >
                        <div className=" rounded-xl mt-2  dark:bg-[#ffffffbd]">
                          <h6 className=" text-lg text-[#767676] font-semibold mb-1">
                            Auction ends in:
                          </h6>
                          <div className=" flex gap-4">
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                          </div>
                          <div className="  dark:bg-[#ededed] mt-4 flex flex-col rounded-lg gap-3">
                            <div className=" flex gap-3 items-center w-1/2 p-2 rounded-xl bg-zinc-800 dark:bg-[#ffffffbd]">
                              <div>
                                <h6 className=" text-white text-base   font-semibold">
                                  Highest Bid
                                </h6>
                                <h6 className=" text-sm ease-in text-white transition-all font-bold">
                                  {`${nftData.highestBid} MATIC`}
                                </h6>
                              </div>
                            </div>
                            <div className=" flex gap-3 items-center w-1/2 text-white p-2 bg-zinc-800 rounded-xl  dark:bg-[#ffffffbd]">
                              <div>
                                <h6 className=" text-base font-semibold">
                                  Highest Bidder
                                </h6>
                                <h6 className=" text-sm ease-in transition-all   font-bold">
                                  {trimAddress(nftData.highestBidder)}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" border-b-2 border-[#8cc8f9] my-4 "></div>
                        <div className="flex gap-3 mt-2">
                          <button
                            onClick={handleBuyNFT}
                            className="rounded-xl text-base  px-4 py-2 w-full bg-white dark:bg-black  dark:text-white text-nowrap text-black font-bold"
                          >
                            {loader ? "Loading..." : "Buy Now"}
                          </button>
                        </div>
                      </motion.div>
                      // <Button
                      //   className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7"
                      //   onClick={handleBuyNFT}
                      // >
                      //   {loader ? "Loading..." : "Buy Now"}
                      // </Button>
                    )}

                  {/* resell complete */}
                  {!nftData.onSale &&
                    !nftData.onAuction &&
                    user.MetaHash.toLowerCase() ===
                      nftData.owner.toLowerCase() && (
                      <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 120,
                        }}
                        className=" flex gap-6 w-full flex-col   mt-4 "
                      >
                        <div className=" rounded-xl mt-2  dark:bg-[#ffffffbd]">
                          <h6 className=" text-lg text-[#767676] font-semibold mb-1">
                            Auction ends in:
                          </h6>
                          <div className=" flex gap-4">
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                            <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                              0
                            </div>
                          </div>
                          <div className="  dark:bg-[#ededed] mt-4 flex flex-col rounded-lg gap-3">
                            <div className=" flex gap-3 items-center w-1/2 p-2 rounded-xl bg-zinc-800 dark:bg-[#ffffffbd]">
                              <div>
                                <h6 className=" text-white text-base   font-semibold">
                                  Highest Bid
                                </h6>
                                <h6 className=" text-sm ease-in text-white transition-all font-bold">
                                  {`${nftData.highestBid} MATIC`}
                                </h6>
                              </div>
                            </div>
                            <div className=" flex gap-3 items-center w-1/2 text-white p-2 bg-zinc-800 rounded-xl  dark:bg-[#ffffffbd]">
                              <div>
                                <h6 className=" text-base font-semibold">
                                  Highest Bidder
                                </h6>
                                <h6 className=" text-sm ease-in transition-all   font-bold">
                                  {trimAddress(nftData.highestBidder)}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" border-b-2 border-[#8cc8f9] my-4 "></div>
                        <div className="flex gap-3 mt-2">
                          <button
                            onClick={() => {
                              setResellOpen(true);
                              if (
                                typeof window != "undefined" &&
                                window.document
                              ) {
                                console.log(document.body.style.overflow);

                                document.body.style.overflow = "hidden";
                                console.log(document.body.style.overflow);
                              }
                            }}
                            className="rounded-xl text-base  px-4 py-2 w-full bg-white dark:bg-black  dark:text-white text-nowrap text-black font-bold"
                          >
                            Resell
                          </button>
                        </div>
                      </motion.div>
                      // <Button
                      //   className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7"
                      //   onClick={() => {
                      //     setResellOpen(true);
                      //     if (typeof window != "undefined" && window.document) {
                      //       console.log(document.body.style.overflow);

                      //       document.body.style.overflow = "hidden";
                      //       console.log(document.body.style.overflow);
                      //     }
                      //   }}
                      // >
                      //   Resell
                      // </Button>
                    )}

                  {/* <div className=" rounded-xl mt-2  dark:bg-[#ffffffbd]">
                    <h6 className=" text-lg text-[#767676] font-semibold mb-1">
                      Auction ends in:
                    </h6>
                    <div className=" flex gap-4">
                      <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                        1
                      </div>
                      <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                        13
                      </div>
                      <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                        10
                      </div>
                      <div className="  bg-[#22333b] flex justify-center items-center text-2xl font-bold w-16 h-16 rounded-lg">
                        58
                      </div>
                    </div>
                    <div className="  dark:bg-[#ededed] mt-4 flex flex-col rounded-lg gap-3">
                      <div className=" flex gap-3 items-center w-1/2 p-2 rounded-xl bg-zinc-800 dark:bg-[#ffffffbd]">
                        <div>
                          <h6 className=" text-white text-base   font-semibold">
                            Highest Bid
                          </h6>
                          <h6 className=" text-sm ease-in text-white transition-all font-bold">
                            {`${nftData.highestBid} MATIC`}
                          </h6>
                        </div>
                      </div>
                      <div className=" flex gap-3 items-center w-1/2 text-white p-2 bg-zinc-800 rounded-xl  dark:bg-[#ffffffbd]">
                        <div>
                          <h6 className=" text-base font-semibold">
                            Highest Bidder
                          </h6>
                          <h6 className=" text-sm ease-in transition-all   font-bold">
                            {trimAddress(nftData.creator)}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" border-b-2 border-[#8cc8f9] my-4 "></div>
                  <div className="flex gap-3 mt-2">
                    <button className="rounded-xl text-base  px-4 py-2 w-full bg-white dark:bg-black  dark:text-white text-nowrap text-black font-bold">
                      Buy Now
                    </button>
                  </div>  */}
                </div>
              </motion.div>
              {/* <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                className=" gap-2 flex flex-col"
              >
                {!nftData.onSale &&
                  nftData.onAuction &&
                  user.MetaHash.toLowerCase() !==
                    nftData?.owner.toLowerCase() && (
                    <motion.div
                      initial={{ opacity: 0, x: 200 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 120,
                      }}
                      className=" flex gap-6 border rounded-md w-full flex-col   bg-transparent mt-4 "
                    >
                      <div className="flex flex-col  md:justify-center gap-6 m-4">
                        <div className=" flex flex-col justify-center">
                          <h1 className=" text-[#6d6d6d] font-extrabold">
                            HighestBid
                          </h1>
                          <h1>{`${nftData?.highestBid} MATIC`}</h1>
                          <h1 className=" text-[#6d6d6d] font-extrabold">
                            HighestBidder
                          </h1>
                          <h1>{`${trimAddress(nftData?.highestBidder)}`}</h1>
                        </div>
                        <div className="">
                          <h1>Auction Ends In</h1>
                          <CountdownTimer
                            initialSeconds={Math.floor(countdown / 1000)}
                          />
                        </div>
                        {user.MetaHash.toLowerCase() ===
                        nftData?.highestBidder.toLowerCase() ? (
                          <div className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                            You are the highest bidder!
                          </div>
                        ) : (
                          <div>
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
                              {loader ? "Loading..." : "Place Bid"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                {!nftData.onSale &&
                  nftData.onAuction &&
                  user.MetaHash.toLowerCase() ===
                    nftData.owner.toLowerCase() && (
                    <div className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                      Your nft on auction
                    </div>
                  )}
                {nftData.onSale &&
                  !nftData.onAuction &&
                  user.MetaHash.toLowerCase() ===
                    nftData.owner.toLowerCase() && (
                    <div className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                      Your nft on sale
                    </div>
                  )}
                {nftData.onSale &&
                  !nftData.onAuction &&
                  user.MetaHash.toLowerCase() !==
                    nftData.owner.toLowerCase() && (
                    <Button
                      className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7"
                      onClick={handleBuyNFT}
                    >
                      {loader ? "Loading..." : "Buy Now"}
                    </Button>
                  )}
                {!nftData.onSale &&
                  !nftData.onAuction &&
                  user.MetaHash.toLowerCase() ===
                    nftData.owner.toLowerCase() && (
                    <Button
                      className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7"
                      onClick={() => {
                        setResellOpen(true);
                        if (typeof window != "undefined" && window.document) {
                          console.log(document.body.style.overflow);

                          document.body.style.overflow = "hidden";
                          console.log(document.body.style.overflow);
                        }
                      }}
                    >
                      Resell
                    </Button>
                  )}
              </motion.div> */}
            </div>
          </div>
        </div>
      </Container>

      {
        resellOpen && (
          <Resell
            nftdata={nftData}
            onClose={() => {
              setResellOpen(false);
              if (typeof window != "undefined" && window.document) {
                console.log(document.body.style.overflow);

                document.body.style.overflow = "";
                console.log(document.body.style.overflow);
              }
            }}
          />
        ) // Display the EditUser modal when isOpen is true
      }

{
        placeBidOpen && (
          <PlaceBid
            nftdata={nftData}
            onClose={() => {
              setPlaceBidOpen(false);
              if (typeof window != "undefined" && window.document) {
                console.log(document.body.style.overflow);

                document.body.style.overflow = "";
                console.log(document.body.style.overflow);
              }
            }}
          />
        ) // Display the EditUser modal when isOpen is true
      }
    </motion.div>
  ) : (
    <div>Loading NFT data...</div> // Or a placeholder
  );
};
export default StickyScroll;
