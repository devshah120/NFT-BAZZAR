import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Container,
  MainImgAni,
  Collectioncard,
  Trycard,
  Trendcard,
  Card3Dusage,
  Button,
} from "../components";
import aig from "../assets/working/85.png";
import big from "../assets/working/100.png";
import cig from "../assets/working/400.png";
import dig from "../assets/working/as.png";
import asa from "../assets/card/c.jpg";
import bsa from "../assets/card/hh.jpg";
import csa from "../assets/card/d.jpg";
import dsa from "../assets/card/ee.jpg";
import esa from "../assets/card/f.jpg";
import fsa from "../assets/card/g.jpg";
import gsa from "../assets/card/a.png";
import mag from "../assets/Home/mag.svg";
// import { NFTBazzarContext } from "../../Context/NFTBazzarContext";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  motion,
  useInView,
  useViewportScroll,
  useAnimation,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import ScrollAnimationItem from "../components/Animation/PageAnimation";
import ThemeToggle from "../components/Animation/ThemeToggle";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import NFTCategoryToggle from "../components/Profile";
import { BackgroundGradientAnimation } from "../components/Animation/BackgroudGrediantAni";
import { SparklesCore } from "../components/Animation/BottomSpartical";
import { NFTBazzarContext } from "../../Context/NFTBazzarContext";
import { useNavigate } from "react-router-dom";
import NftsData from "../dataGathering/nftsData"
import { useSelector } from "react-redux";
function Home() {

  const { scrollY } = useViewportScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -200]);
  const [enableScrollEffect, setEnableScrollEffect] = useState(false);

  // Start scroll-driven transformation after the animation is done
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnableScrollEffect(true);
    }, 3000); // Match the animation delay + duration
    return () => clearTimeout(timer);
  }, []);



  const nftss = useSelector((state) => state.nfts.nftList)
  const myRef = useRef(null);
  const imgRef = useRef(null);
  const isInView = useInView(myRef);
  const mainControl = useAnimation();
  const navigate = useNavigate();
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.03,
      },
    }),
  };



  const { fetchNFTs } = useContext(NFTBazzarContext);
  const [onSaleNfts, setOnSaleNfts] = useState([]);
  const [onAuctionNfts, setOnAuctionNfts] = useState([]);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    setNfts(NftsData.getOnSaleNfts(nftss))
    setOnSaleNfts(NftsData.getOnSaleNfts(nftss))
    setOnAuctionNfts(NftsData.getOnAuctionNfts(nftss))
  }, [nftss]);

  const { checkWalletConnected } = useContext(NFTBazzarContext);
  useEffect(() => {
    if (checkWalletConnected) {
      checkWalletConnected();
    } else {
      console.log("No Know");
    }
  }, []);

  // useEffect(() =>{
  //   // mainControl.start("visible");
  //   console.log("you enterd in sec div");
  // },[isInView])

  const gradientVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 5,
        ease: "easeInOut",
        loop: Infinity,
      },
    },
  };


const useDelayByScreen = (dilay = 1) => {
  const [delay, setDelay] = useState(0.5);

  useEffect(() => {
    const updateDelay = () => {
      if (window.innerWidth <= 600) {
        setDelay(1); // Small screens
      }else {
        setDelay(dilay); // Large screens
      }
    };

    updateDelay();
    window.addEventListener("resize", updateDelay);

    return () => window.removeEventListener("resize", updateDelay);
  }, []);

  return delay;
};

  return (
    <main className=" overflow-y-hidden ">
      <div className="min-h-screen text-black dark:text-black">
        {/* <section className="h-[100vh]">
        <BackgroundGradientAnimation>
        <div className="absolute z-50 h-full inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Gradients X Animations
          </p>
        </div>
        </BackgroundGradientAnimation>
      </section> */}

        {/* hero section */}

          <section className="h-[100vh] relative overflow-hidden">

          <motion.img 
              ref={imgRef}
              variants={{
                hiddden: { opacity: 0, x: -100, y:-200  },
                // visiible: {  },
              }}
              initial="hiddden"
              animate={{opacity: 1, x: 0, y:0}}
              style={enableScrollEffect ? { y: y2 } : {}}
              transition={{type: 'spring', duration: 2, delay: 1 }}
              className=" absolute h-[100px] w-[100px] rounded-3xl shadow-md shadow-slate-400 left-56 top-28" src={gsa}></motion.img>
            <motion.img 
              ref={imgRef}
              variants={{
                hiddden: { opacity: 0, x: 100, y:200  },
                // visiible: {  },
              }}
              initial="hiddden"
              animate={{opacity: 1, x: 0, y:0}}
              style={enableScrollEffect ? { y: y2 } : {}}
              transition={{type: 'spring', duration: 2, delay: 1 }}
              className=" absolute h-[100px] w-[100px] rounded-3xl shadow-md shadow-slate-400 right-64 bottom-10" src={csa}></motion.img>
              <motion.img 
              ref={imgRef}
              variants={{
                hiddden: { opacity: 0, x: 0, y:200  },
                // visiible: {  },
              }}
              initial="hiddden"
              animate={{opacity: 1, x: 0, y:0}}
              style={enableScrollEffect ? { y: y1 } : {}}
              transition={{type: 'spring', duration: 2, delay: 1 }}
              className=" absolute h-[100px] w-[100px] rounded-3xl shadow-md shadow-slate-400 left-1/3 bottom-28" src={dsa}></motion.img>
            <motion.img 
              ref={imgRef}
              variants={{
                hiddden: { opacity: 0, x: -100, y:0  },
                // visiible: {  },
              }} 
              initial="hiddden"
              animate={{opacity: 1, x: 0, y:0}}
              style={enableScrollEffect ? { y: y1 } : {}}
              transition={{type: 'spring', duration: 2, delay: 1 }}
              className=" absolute h-[80px] w-[80px] rounded-3xl shadow-md shadow-slate-400 scale-150 left-10 top-80" src={esa}></motion.img>
              <motion.img 
              ref={imgRef}
              variants={{
                hiddden: { opacity: 0, x: 100, y:-200  },
                // visiible: {  },
              }} 
              initial="hiddden"
              animate={{opacity: 1, x: 0, y:0}}
              style={enableScrollEffect ? { y: y1 } : {}}
              transition={{type: 'spring', duration: 2, delay: 1 }}
              className=" absolute h-[80px] w-[80px] rounded-3xl shadow-md shadow-slate-400 scale-150 right-56 top-40" src={fsa}></motion.img>
              <motion.img 
              ref={imgRef}
              variants={{
                hiddden: { opacity: 0, x: 0, y:-200  },
                // visiible: {  },
              }} 
              initial="hiddden"
              animate={{opacity: 1, x: 0, y:0}}
              style={enableScrollEffect ? { y: y1 } : {}}
              transition={{type: 'spring', duration: 2, delay: 1 }}
              className=" absolute h-[80px] w-[80px] rounded-3xl shadow-md shadow-slate-400 scale-150  right-1/4 top-10" src={asa}></motion.img>
            <motion.img 
              ref={imgRef}
              variants={{
                hiddden: { opacity: 0, x: 0, y:-200  },
                // visiible: {  },
              }}
              initial="hiddden"
              animate={{opacity: 1, x: 0, y:0}}
              style={enableScrollEffect ? { y: y2 } : {}}
              transition={{type: 'spring', duration: 2, delay: 1 }}
              className=" absolute h-[150px] w-[150px] rounded-3xl shadow-md shadow-slate-400 left-1/3 top-28" src={gsa}></motion.img>
            <motion.img 
              ref={imgRef}
              variants={{
                hiddden: { opacity: 0, x: -100, y:200  },
                // visiible: {  },
              }}
              initial="hiddden"
              animate={{opacity: 1, x: 0, y:0}}
              style={enableScrollEffect ? { y: y2 } : {}}
              transition={{type: 'spring', duration: 2, delay: 1 }}
              className=" absolute h-[150px] w-[150px] rounded-3xl shadow-md shadow-slate-400 left-20 bottom-20" src={dig}></motion.img>
              <motion.img 
              ref={imgRef}
              variants={{
                hiddden: { opacity: 0, x: 100, y: 0  },
                // visiible: {  },
              }}
              initial="hiddden"
              animate={{opacity: 1, x: 0, y:0}}
              style={enableScrollEffect ? { y: y1 } : {}}
              transition={{type: 'spring', duration: 2, delay: 1 }}
              className=" absolute h-[150px] w-[150px] rounded-3xl shadow-md shadow-slate-400 right-20 top-80" src={aig}></motion.img>


            {/* <BackgroundGradientAnimation> */}
            <Container>
              <motion.div className=" w-full flex items-center flex-row justify-center min-h-screen "
                // initial={{y:'90vw'}}
                // animate={{y:0}}
                // transition={{delay:0.1,type:'spring',stiffness:50}}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, ease: "easeIn" }}

              >

                <div className=" flex justify-center flex-col items-center">


                  <motion.h1 className=" text-2xl sm:text-5xl font-extrabold text-white dark:text-slate-950 text-center"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    DISCOVERY COLLECT <br></br>& SELL EXTRAORDINARY </motion.h1>

                  <motion.h1 className=" text-[120px] leading-none sm:text-9xl font-logofont bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient"
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >NFTS!</motion.h1>
                </div>

              </motion.div>
            </Container>
            {/* </BackgroundGradientAnimation> */}
          </section>
        {/* <motion.div
        className=" h-1  bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] animate-gradient"
        style={{ backgroundSize: "200% 200%" }}
        variants={gradientVariants}
        animate="animate"
        /> */}

        {/* How to USe */}
        {/* bg-fixed bg-topp bg-cover */}
        <section className=" ">
          <ScrollAnimationItem>
            <Container>
              <motion.div
                ref={myRef}
                variants={{
                  hidden: { opacity: 0, y: 75 },
                  visible: { opacity: 1, y: 0 },
                }}
                // whileInView={"visible"}
                initial="hidden"
                animate={mainControl}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileInView="visible"
                //  viewport={{once:true}}

                className=" flex rounded-3xl bg-zinc-800 dark:bg-[#ededed] flex-col justify-center p-10 gap-8  "
              >
                <div className=" flex justify-center">
                  <motion.h1
                    className=" font-logofont text-center text-white dark:text-black text-3xl "
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.5 }}
                  >
                    How{" "}
                    <span className="text-[#28F0CC] bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient ">
                      NFT BAZZAR
                    </span>{" "}
                    Work
                  </motion.h1>
                </div>

                <div className="items-center  gap-12  flex flex-col flex-wrap sm:flex-row justify-center">
                  <motion.div
                  ref={myRef}
                  variants={{
                    hiddden: { opacity: 0, x: 100 },
                    visiible: { opacity: 1, x: 0 },
                  }}
                  initial="hiddden"
                  animate={mainControl}
                  transition={{ duration: 0.5,delay: useDelayByScreen(1) }}
                  whileInView ="visiible">
                  <Trycard
                    title={"Create Your Account & Add wallet"}
                    sub={"Join and Manage Your NFTs: Account and Wallet Setup"}
                    num={"1"}
                    img={aig}
                  />
                  </motion.div>
                  <motion.div
                  ref={myRef}
                  variants={{
                    hiddden: { opacity: 0, x: 100 },
                    visiible: { opacity: 1, x: 0 },
                  }}
                  initial="hiddden"
                  animate={mainControl}
                  transition={{ duration: 0.5,delay: useDelayByScreen(1.5) }}
                  whileInView ="visiible">
                  <Trycard
                    title={"Get Approval From Our Review Team"}
                    sub={
                      "Our Review Team Guarantees Fast Approval for Your NFTs"
                    }
                    num={"2"}
                    img={dig}
                  />
                  </motion.div>
                  <motion.div
                  ref={myRef}
                  variants={{
                    hiddden: { opacity: 0, x: 100 },
                    visiible: { opacity: 1, x: 0 },
                  }}
                  initial="hiddden"
                  animate={mainControl}
                  transition={{ duration: 0.5,delay: useDelayByScreen(2) }}
                  whileInView ="visiible">
                  <Trycard
                    title={"Create Your NFTs & List For Them Sell"}
                    sub={"Easily Create Your NFTs and List Them for Sale Today"}
                    num={"3"}
                    img={big}
                  />
                  </motion.div>
                  <motion.div
                  ref={myRef}
                  variants={{
                    hiddden: { opacity: 0, x: 100 },
                    visiible: { opacity: 1, x: 0 },
                  }}
                  initial="hiddden"
                  animate={mainControl}
                  transition={{ duration: 0.5,delay: useDelayByScreen(2.5) }}
                  whileInView ="visiible">
                  <Trycard
                    title={"Now Sell Your NFTs & Review Our Site"}
                    sub={
                      "Sell NFTs and Review Our Site to Enhance User Experience"
                    }
                    num={"4"}
                    img={cig}
                  />
                  </motion.div>
                </div>
              </motion.div>
            </Container>
          </ScrollAnimationItem>
        </section>
         

        {/* Bidding Section */}

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
                    {onAuctionNfts.map((nft) => (
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
        </ScrollAnimationItem>


        {/*Top section*/}
        {/* bg-fixed bg-items bg-cover */}
        <section className="  ">
          <ScrollAnimationItem>
            <Container>
              <div className=" flex flex-col bg-zinc-800 dark:bg-[#ededed] py-10 justify-center rounded-3xl p-10 ">
                <div className="items-center flex justify-center ">
                  <h1 className=" font-logofont text-white dark:text-black text-center text-3xl mb-8">
                    Popular Items In Last <br className="md:hidden" />
                    <span className="text-[#28F0CC] bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                      1 Month
                    </span>
                  </h1>
                </div>
                <div>
                  <div className="grid md:grid-cols-4 gap-10 ">

                    {onSaleNfts.slice(0, 12).map((nft, index) => (
                      <motion.div
                        ref={myRef}
                        variants={{
                          hiddden: { opacity: 0, x: 100 },
                          visiible: { opacity: 1, x: 0 },
                        }}
                        initial="hiddden"
                        animate={mainControl}
                        transition={{ duration: 0.5,delay: 0.5 }}
                        whileInView ="visiible"
                      >
                        <Trendcard kii={index} mimg={nft.image} id={nft.tokenId} nftname={nft.name} price={`${nft.price} MATIC`} position={index + 1}></Trendcard>
                      </motion.div>
                    ))}


                  </div>
                </div>
              </div>
            </Container>
          </ScrollAnimationItem>
        </section>

        {/* Trending NFT */}
        <ScrollAnimationItem>
          <motion.section
            className=" py-10"
            ref={myRef}
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            // whileInView={"visible"}
            initial="hidden"
            animate={mainControl}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileInView="visible"
            viewport={{ once: false }}
          >
            <Container>
              <div className="items-center flex justify-center ">
                <h1 className=" font-logofont text-white dark:text-black text-center text-3xl mb-8">
                  HOT <br className="md:hidden" />
                  <span className="text-[#28F0CC] bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                    COLLECTION{" "}
                  </span>
                </h1>
              </div>

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
                      Price={nft.price}
                      Image={nft.image}
                      tokenId={nft.tokenId}
                      description={nft.description}
                      owner={nft.owner}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Container>
          </motion.section>
        </ScrollAnimationItem>

        {/* bg-fixed bg-endd bg-cover */}
        <section className=" mb-10 sm:mb-0 ">
          <ScrollAnimationItem>
            <Container>
              <div className="  flex flex-col  justify-center min-h-screen ">
                {/* <div className="items-center flex justify-center">
                  <h1 className=" font-logofont text-white text-3xl mb-8 ">
                    This Week Trending <span className="text-[#28F0CC] bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">NFTs</span>
                  </h1>
                </div> */}

                <div className=" flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/2 items-center justify-center flex ">
                    <div className="flex flex-col items-center md:block">
                      <h3 className="font text-center md:text-left text-4xl font-bold tracking-tight text-[#fff] dark:text-black sm:text-6xl ease-in transition-all ">
                        Dive into the
                        <br className="md:hidden" />{" "}
                        <span className=" bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient ">
                          NFT Revolution:
                        </span>{" "}
                        Discover What's Hot
                      </h3>
                      {/* <motion.h6 className=" mt-4 text-xl text-gray-500"> 
                    Discover the latest trends in NFTs! Explore unique digital art, exclusive collectibles, and innovative projects driving the NFT revolution. Stay updated with top creators, new releases, and market insights. Join our community and immerse yourself in the future of digital ownership and creativity. Don't miss out!
                    </motion.h6> */}
                      <div className=" mt-4 text-xl text-center md:text-left text-gray-500 ">
                        {" Discover the latest trends in NFTs! Explore unique digital art, exclusive collectibles, and innovative projects driving the NFT revolution. Stay updated with top creators, new releases, and market insights. Join our community and immerse yourself in the future of digital ownership and creativity. Don't miss out!"
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
                      <Button className="  mt-6 font-extrabold" onClick={() => navigate("/collections")}>
                        Discover Now
                      </Button>
                    </div>
                  </div>
                  <div className="lg:w-1/2  items-center justify-center flex">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6">
                        <div className=" h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg hover:scale-110 ease-in transition-all">
                          <img src={asa} className="h-full w-full rounded-lg object-cover object-center " />
                        </div>
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg hover:scale-110 ease-in transition-all ">
                          <img src={bsa} className="h-full w-full rounded-lg object-cover object-center" />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8 ">
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg hover:scale-110 ease-in transition-all ">
                          <img src={csa} alt="" className="h-full rounded-lg w-full object-cover object-center" />
                        </div>
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg  hover:scale-110 ease-in transition-all ">
                          <img src={dsa} className="h-full w-full  rounded-lg object-cover object-center" />
                        </div>
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg hover:scale-110 ease-in transition-all  ">
                          <img src={esa} className="h-full w-full rounded-lg object-cover object-center" />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg hover:scale-110 ease-in transition-all">
                          <img src={fsa} alt="" className="h-full w-full  rounded-lg object-cover object-center" />
                        </div>
                        <div className="h-[120px] w-[95px] md:h-[200px] md:w-[150px] overflow-hidden rounded-lg hover:scale-110 ease-in transition-all  ">
                          <img src={gsa} className="h-full w-full  rounded-lg object-cover object-center" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </ScrollAnimationItem>
        </section>

        {/* <section>
        <Container>
         <div className="items-center flex justify-center">
            <h1 className=" font-logofont text-white text-3xl mb-8 ">HOT 
               <span className="text-[#28F0CC] bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient"> COLLECTIONS</span>
            </h1>
          </div>
          
          
        </Container>
      </section> */}
      </div>
    </main>
  );
}

export default Home;
