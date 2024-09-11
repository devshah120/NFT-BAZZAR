"use client";
import React, {useState, useEffect, useContext} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { Container } from "../components";
import axios from "axios";
import mag from '../assets/Home/mag.svg'
import { cn } from "../utils/cn";
// import nftsData from "../dataGathering/nftsData"
import Card3Dusage from '../components/cards/Card3Dusage';
import { NFTBazzarContext } from "../../Context/NFTBazzarContext";

// import { login } from "../store/authSlice";



export const Explore = () => {
  const [search, setSearch] = useState()
  const [searchedNfts, setSearchedNfts] = useState()
  const { fetchNFTs } = useContext(NFTBazzarContext);
  // const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fetchNFTs().then((item) => {
      setNftsCopy(item);
    });
  }, []);

// useEffect(()=>{
  
// },[search])


  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  
  return (

    <main>
      <section
      className={cn(
        "relative h-[40rem] flex items-center bg-black dark:bg-white justify-center w-full group"
      )}
      onMouseMove={handleMouseMove}
    ><Container>
      <div className="absolute inset-0 bg-dot-thick-neutral-900 dark:bg-dot-thick-neutral-300  pointer-events-none" />
      <motion.div
        className="pointer-events-none bg-dot-thick-[#fff] dark:bg-dot-thick-indigo-900   absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,    
        }}
      />

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
          onChange={(e)=>setSearch(e.target.value)}
          value={search}
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
    
      </Container></section>

      <section>
        <Container>
        <div className=" flex gap-4 flex-wrap justify-center">
        {
          search ? searchedNfts && searchedNfts.length > 0 ? (
              searchedNfts.map((nft) => (
                <Card3Dusage
                  key={nftsCopy.tokenId}
                  id={nftsCopy.tokenId}
                  Name={nftsCopy.Name}
                  Creator={nftsCopy.Creator}
                  Price={nftsCopy.Price}
                  Image={nftsCopy.Image}
                />
              ))
            ) : (
              <div className="text-center text-white dark:text-slate-950">
                No results found for your search. Try a different query.
              </div>
            ): <div className="text-center text-white dark:text-slate-950">
        please search something first
              </div>
        }
        

          {/* {
            searchedNfts.length === 0 && (
              <div className="text-center text-white dark:text-slate-950">
                No results found for your search. Try a different query.
              </div>
            )
          } */}
        </div>
        </Container>
      </section>

    </main>
  );
};


export default Explore;
