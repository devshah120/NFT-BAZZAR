import React, { useEffect, useState, useContext } from "react";
import { BackgroundGradientAnimation } from "../components/Animation/BackgroudGrediantAni";
import { Button, Container } from "../components";
import { Card3Dusage } from "../components";
import { motion } from "framer-motion";
import { NFTBazzarContext } from "../../Context/NFTBazzarContext";
import NftsData from '../dataGathering/nftsData'
import ScrollAnimationItem from "../components/Animation/PageAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

import "../style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards,Autoplay } from "swiper/modules";
function Auction() {
  const nftss = useSelector((state) => state.nfts.nftList)
  const [nfts, setNfts] = useState([]);
  const { fetchAuctionItems } = useContext(NFTBazzarContext);
  // const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    // fetchAuctionItems().then((item) => {
    //   setNftsCopy(item);
    //   console.log(nfts);
    // });
    setNfts(NftsData.getOnAuctionNfts(nftss));
  }, []);
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.03,
      },
    }),
  };
  return (
    <main>
      <BackgroundGradientAnimation>
        <Container>
          <div className="  flex flex-col  justify-center ">
            <div className=" flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/2 items-center justify-center flex ">
                <div className="flex flex-col items-center z-10 md:block">
                  <h3 className="font text-center md:text-left text-4xl font-bold tracking-tight text-[#fff] dark:text-black sm:text-6xl ease-in transition-all ">
                  Capture
                    <br className="md:hidden" />{" "}
                    <span className=" bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient ">
                    Rare Digital Assets
                    </span>{" "}
                    at Auction
                  </h3>
                  <div className=" mt-4 text-xl text-center md:text-left text-gray-500 ">
                    {" Place your bids on the most sought-after NFTs and elevate your digital collection. "
                      .split("")
                      .map((char, index) => (
                        <motion.span
                          key={index}
                          custom={index} // Pass the index as a custom prop
                          initial="hidden"
                          animate="visible"
                          variants={textVariants}
                        >
                          {char}
                        </motion.span>
                      ))}
                  </div>
                  <Button
                    className="  mt-6 font-extrabold"
                    onClick={() => navigate("/collections")}
                  >
                    Discover Now
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2  items-center justify-center flex">
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
                  modules={[EffectCards,Autoplay]}
                  className="mySwiper "
                >
                  {nfts.map((nft) => (
                    <SwiperSlide key={nft.tokenId}>
                      <Card3Dusage
                  Name={nft.name}
                  Creator={nft.creator}
                  Price={nft.minBid}
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
          </div>
          <div className="flex flex-col justify-center min-h-screen">
        <div className="items-center flex justify-center">
          <h1 className="font-logofont z-10 text-white dark:text-black text-3xl mb-8">
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
                  Creator={nft.creator}
                  Price={nft.minBid}
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
      </BackgroundGradientAnimation>
      
    </main>
  );
}

export default Auction;