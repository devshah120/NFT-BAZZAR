"use client";
import React, {useEffect, useState} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import mag from '../assets/Home/mag.svg'
import TrendCard from "../components/cards/Trendcard";
import Bidcard from "../components/cards/Bidcard";
import Card3Dusage from '../components/cards/Card3Dusage';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
import axios from "axios";




export const Explore = () => {

  const [nfts,setNfts] = useState([])
  useEffect(() => {
    myfun()
  }, []); // Empty array ensures this runs only once when the component mounts
const myfun = async () => {
  axios.get('/api/nft/allNft')
      .then((res) => {
        setNfts(res.data);
      })
      .catch((error) => {
        console.log(error);axios.get('/api/nft/allNft')
        .then((res) => {
          setNfts(res.data);
          // console.log(nfts);
        })
        .catch((error) => {
          console.log(error);})
})
}
  // Log the nfts state whenever it changes
  useEffect(() => {
    console.log(nfts);
  }, [nfts]);



  const firstRow = [1, 2, 3, 4];
  const secondRow = [1, 2, 3, 4];
  const ref = React.useRef(null);
  const { scrollYProgress ,scrollXProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollXProgress, [0, 1], [200, 0]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-850, 0]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className=" h-auto overflow-hidden justify-center antialiased relative flex flex-col  [perspective:1000px] [transform-style:preserve-3d] text-white dark:text-black"
    >
      <Header123 />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          translateX,
          opacity,
        }}
        className=" -z-[1]"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            // breakpoints={{
            //   "@0.00": {
            //     slidesPerView: 1,
            //     spaceBetween: 10,
            //   },
            //   "@0.75": {
            //     slidesPerView: 2,
            //     spaceBetween: 20,
            //   },
            //   "@1.00": {
            //     slidesPerView: 3,
            //     spaceBetween: 40,
            //   },
            //   "@1.50": {
            //     slidesPerView: 3,
            //     spaceBetween: 50,
            //   },
            // }}
            modules={[Autoplay]}
            className="mySwiper"
          >

            {nfts?.map((nft) => (
              <SwiperSlide>
                <Card3Dusage Name={nft.Name} Creator={nft.Creator} Price ={nft.Price} Image={nft.Image_URL}/>
              </SwiperSlide>
            ))}
            {/* <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
            <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
            <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
            <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide> */}
          </Swiper>
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              reverseDirection: true,
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
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
            <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
            <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
            <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide>
            <SwiperSlide>
              <Card3Dusage/>
            </SwiperSlide>
          </Swiper>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header123 = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-48 md:py-30 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-white dark:text-black">
        Explore Rare and Unique NFTs <br /> on Our Platform
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-white dark:text-black">
        Discover a diverse collection of rare and unique NFTs, curated for
        collectors and enthusiasts. Join our platform to buy, sell, and trade
        today.
      </p>
      <motion.div
        className="relative mt-10 sm:w-[600px] rounded-xl "
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          id="password"
          className="w-full  pl-3 pr-10 py-2 hover:border-2 bg-[#ffffff2b]  rounded-xl hover:border-sky-300 focus:outline-none focus:border-sky-500 transition-colors text-sky-200 font-semibold dark:text-slate-950 dark:border-2 dark:border-sky-400 "
          placeholder="Search By Collection,NFT Or User"
        ></input>
        <button className=" w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 focus:outline-none hover:text-sky-200 transition-colors flex items-center justify-center ">
          <img src={mag} alt="" className=" h-5 w-5 " />
        </button>
      </motion.div>
      <motion.div
        className=" mt-4 "
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className=" text-white dark:text-slate-950  ">
          <span className=" text-sky-300 dark:text-purple-900 dark:font-semibold">
            Popular searches:
          </span>{" "}
          cryptopunks, bored ape yacht club, moonbirds
        </h3>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};

export default Explore;
