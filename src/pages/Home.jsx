import React, { useState, useEffect, useContext, useRef } from "react";
import Bidcard from "../components/cards/Bidcard";
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
import eig from "../assets/working/4999653.jpg";
import fig from "../assets/working/3759390.jpg";
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

function Home() {
  const myRef = useRef(null);
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

  const nft = [
    {
      id: 1,
      name: "NFT 1",
      image: asa,
      description: "Description for NFT 1",
      category: "OnSale",
    },
    {
      id: 2,
      name: "NFT 2",
      image: bsa,
      description: "Description for NFT 2",
      category: "Owned",
    },
    {
      id: 3,
      name: "NFT 3",
      image: csa,
      description: "Description for NFT 3",
      category: "Created",
    },
    {
      id: 7,
      name: "NFT 3",
      image: dsa,
      description: "Description for NFT 3",
      category: "Collection",
    },
    {
      id: 8,
      name: "NFT 3",
      image: esa,
      description: "Description for NFT 3",
      category: "Activity",
    },
    {
      id: 4,
      name: "NFT 3",
      image: esa,
      description: "Description for NFT 3",
      category: "Activity",
    },
    {
      id: 5,
      name: "NFT 3",
      image: esa,
      description: "Description for NFT 3",
      category: "Activity",
    },
    {
      id: 6,
      name: "NFT 3",
      image: esa,
      description: "Description for NFT 3",
      category: "Activity",
    },
    // Add more NFT objects here
  ];

  const categories = ["OnSale", "Owned", "Created", "Collection", "Activity"];

  const { fetchNFTs } = useContext(NFTBazzarContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item.reverse());
      setNftsCopy(item);
      console.log(nfts);
    });
  }, []);

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

  return (
    <main>
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
        <ScrollAnimationItem > 
      
      <section className="h-[100vh] overflow-hidden">
          {/* <BackgroundGradientAnimation> */}
        <Container>
          <motion.div className=" w-full flex items-center flex-row justify-center min-h-screen " 
            // initial={{y:'90vw'}}
            // animate={{y:0}}
            // transition={{delay:0.1,type:'spring',stiffness:50}}
            initial = {{opacity: 0}}
            animate ={{opacity: 1}}
            transition={{delay:0.1,ease: "easeIn"}}
            
          >
       
              <div className=" flex justify-center flex-col items-center">
                  
              
                        <motion.h1 className=" text-2xl sm:text-5xl font-extrabold text-white dark:text-slate-950 text-center"
                        initial={{opacity: 0, x: -100}}
                        animate={{opacity:1,x:0}}
                        transition={{delay:0.1}}
                        >
                          DISCOVERY COLLECT <br></br>& SELL EXTRAORDINARY </motion.h1>
                        
                        <motion.h1 className=" text-[120px] leading-none sm:text-9xl font-logofont bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient"
                        initial={{opacity: 0, x: 200}}
                        animate={{opacity:1,x:0}}
                        transition={{delay:0.2}}
                        >NFTS!</motion.h1>
                      
                          {/* <div className="w-[40rem] h-40 relative">
                            
                            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-white dark:via-black to-transparent h-[2px] w-3/4 blur-sm" />
                            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-white dark:via-black to-transparent h-px w-3/4" />
                            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-white dark:via-black to-transparent h-[5px] w-1/4 blur-sm" />
                            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-white dark:via-black to-transparent h-px w-1/4" />
                    
                            
                            <SparklesCore
                              background="transparent"
                              minSize={0.9}
                              maxSize={2}
                              particleDensity={1000}
                              className="w-full h-full"
                              particleColor="#2196F3" 
                            />
                    
                            
                            <div className="absolute inset-0 w-full h-full dark:bg-white bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                          </div> */}
                        
                  
                        {/* <motion.div className="relative mt-10 sm:w-[600px] rounded-xl dark:shadow-[0_0_10px_purple]"
                        initial={{opacity: 0, x: -200}}
                        animate={{opacity:1,x:0}}
                        transition={{delay:0.3}}
                        >
                            <input type="text" id="password" className="w-full  pl-3 pr-10 py-2 hover:border-2 bg-[#ffffff2b]  rounded-xl hover:border-sky-300 focus:outline-none focus:border-sky-500 transition-colors text-sky-200 font-semibold dark:text-slate-950 dark:border-2 dark:border-sky-400 " placeholder="Search By Collection,NFT Or User"></input>
                            <button className=" w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2  focus:outline-none hover:sky-200 transition-colors flex items-center justify-center  "><img src={mag} alt="" className=" h-5 w-5 " /></button>
                        </motion.div>
                      <motion.div className=" mt-4 "
                      initial={{opacity: 0, x: 200}}
                      animate={{opacity:1,x:0}}
                      transition={{delay:0.4}}>
                        <h3 className=" text-white dark:text-slate-950 text-center"><span className=" text-sky-300 dark:text-purple-900 dark:font-semibold">Popular searches:</span> cryptopunks, bored ape yacht club, moonbirds
                        </h3>
                      </motion.div> */}
              </div>
          
          </motion.div>
        </Container>
      {/* </BackgroundGradientAnimation> */}
      </section>
      </ScrollAnimationItem>
        {/* <motion.div
        className=" h-1  bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] animate-gradient"
        style={{ backgroundSize: "200% 200%" }}
        variants={gradientVariants}
        animate="animate"
        /> */}

        {/* How to USe */}
        {/* bg-fixed bg-topp bg-cover */}
        <section className=" py-10 ">
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

                className=" flex flex-col justify-center min-h-screen gap-20  "
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

                <div className="items-center  gap-12  flex flex-col sm:flex-row justify-center">
                  <Trycard
                    title={"Create Your Account & Add wallet"}
                    sub={"Join and Manage Your NFTs: Account and Wallet Setup"}
                    num={"1"}
                    img={aig}
                  />
                  <Trycard
                    title={"Get Approval From Our Review Team"}
                    sub={
                      "Our Review Team Guarantees Fast Approval for Your NFTs"
                    }
                    num={"2"}
                    img={dig}
                  />
                  <Trycard
                    title={"Create Your NFTs & List For Them Sell"}
                    sub={"Easily Create Your NFTs and List Them for Sale Today"}
                    num={"3"}
                    img={big}
                  />
                  <Trycard
                    title={"Now Sell Your NFTs & Review Our Site"}
                    sub={
                      "Sell NFTs and Review Our Site to Enhance User Experience"
                    }
                    num={"4"}
                    img={cig}
                  />
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


        {/*Top section*/}
        {/* bg-fixed bg-items bg-cover */}
        <section className=" ">
          <ScrollAnimationItem>
            <Container>
              <div className=" flex flex-col py-10 justify-center min-h-screen ">
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

{nfts.slice(0,12).map((nft,index) => (
    
   <Trendcard kii={index} mimg={nft.image} id={nft.tokenId}  nftname={nft.name} price={`${nft.price} ETH`} position={index+1}></Trendcard>
  
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
            </Container>
          </motion.section>
        </ScrollAnimationItem>

        {/* bg-fixed bg-endd bg-cover */}
        <section className=" py-10  ">
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
