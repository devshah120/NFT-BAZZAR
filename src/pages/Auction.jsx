import React, { useEffect, useState, useContext } from "react";
import { BackgroundGradientAnimation } from "../components/Animation/BackgroudGrediantAni";
import { Button, Container } from "../components";
import { Card3Dusage } from "../components";
import { motion } from "framer-motion";
import { NFTBazzarContext } from "../../Context/NFTBazzarContext";
import ScrollAnimationItem from "../components/Animation/PageAnimation";
import { Swiper, SwiperSlide } from "swiper/react";

import "../style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards,Autoplay } from "swiper/modules";
function Auction() {
  const [nfts, setNfts] = useState([]);
  const { fetchNFTs } = useContext(NFTBazzarContext);
  // const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item.reverse());
      setNftsCopy(item);
      console.log(nfts);
    });
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
        {/* <div className='p-4 h-full flex justify-center'>
        <div className=' absolute z-[5] w-1/2 h-full flex justify-center flex-col'>
          <h1 className=' text-2xl sm:text-4xl font-extrabold text-white dark:text-slate-950 text-left'>Capture Rare Digital Assets at Auction</h1>
          <p className='max-w-2xl text-base md:text-xl mt-8 text-white dark:text-black'>Place your bids on the most sought-after NFTs and elevate your digital collection.</p>
          <Button>Explore</Button>  
        </div>
        <div></div>
      </div> */}
        <Container>
          <div className="  flex flex-col  justify-center min-h-screen ">
            <div className=" flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/2 items-center justify-center flex ">
                <div className="flex flex-col items-center md:block">
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
                  // loop={true}
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
                        Creator={nft.seller}
                        Price={nft.price}
                        Image={nft.image}
                        tokenId={nft.tokenId}
                        description={nft.description}
                        owner={nft.owner}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6">
                        <div className=" h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 hover:scale-110 ease-in transition-all">
                          <img
                            src={asa}
                            className="h-full w-full rounded-lg object-cover object-center "
                          />
                        </div>
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 hover:scale-110 ease-in transition-all ">
                          <img
                            src={bsa}
                            className="h-full w-full rounded-lg object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8 ">
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg hover:scale-110 ease-in transition-all ">
                          <img
                            src={csa}
                            alt=""
                            className="h-full rounded-lg w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 hover:scale-110 ease-in transition-all ">
                          <img
                            src={dsa}
                            className="h-full w-full  rounded-lg object-cover object-center"
                          />
                        </div>
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 hover:scale-110 ease-in transition-all  ">
                          <img
                            src={esa}
                            className="h-full w-full rounded-lg object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg hover:scale-110 ease-in transition-all">
                          <img
                            src={fsa}
                            alt=""
                            className="h-full w-full  rounded-lg object-cover object-center"
                          />
                        </div>
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 hover:scale-110 ease-in transition-all  ">
                          <img
                            src={gsa}
                            className="h-full w-full  rounded-lg object-cover object-center"
                          />
                        </div>
                      </div>
                    </div> */}
              </div>
            </div>
          </div>
        </Container>
      </BackgroundGradientAnimation>
      <ScrollAnimationItem>
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
                  Creator={nft.seller}
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
</ScrollAnimationItem>
    </main>
  );
}

export default Auction;