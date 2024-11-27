import React, { useState, useEffect, useContext } from "react";
import CountdownTimer from "../components/Countdown";
import { NFTBazzarContext } from "../../Context/NFTBazzarContext";
import { useSelector } from "react-redux";
import {
  Container,
  MainImgAni,
  Collectioncard,
  Trycard,
  Trendcard,
  Button,
} from "../components";
import StickyScroll from "../components/StickyScroll";
import { useParams } from "react-router-dom";
import NftsData from "../dataGathering/nftsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card3Dusage } from "../components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
function Item() {
  const nftss = useSelector((state) => state.nfts.nftList);

  const { tokenId } = useParams();
  const [nftData, setNftData] = useState();
  const [nftDataCat, setNftDataCat] = useState();
  const user = useSelector((state) => state.auth.userData);
  const righttime = new Date().getTime();

  const { fetchNftsByid, fetchNftsByCat } = useContext(NFTBazzarContext);

  const trimAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  // get nfts data
  useEffect(() => {
    // fetchNftsByid(tokenId).then((item) => {
    // setNftData(item[0]);
    // console.log("item", item[0]);
    //   if(item[0]){
    //     fetchNftsByCat(item[0].catagory).then((item) => {
    //       setNftDataCat(item.reverse());
    //       });
    //   }
    // });
    console.log(tokenId);

    console.log("nftdata from item", NftsData.getNftById(nftss, tokenId));

    setNftData(NftsData.getNftById(nftss, tokenId));
    setNftDataCat(NftsData.getNftsByNftCategory(nftss, tokenId));

    
  }, [nftss]);

  // useEffect(() => {
  //     nftsData.getNft(id)
  //       .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         console.log(res.data);
  //         setNftData(res.data)
  //         nftsData.getNftByCat(res.data.Token_ID)
  //             .then((res) => {
  //             console.log(res);
  //             if (res.status === 200) {
  //               console.log(res.data);
  //               setNftDataCat(res.data)
  //             }else{
  //               console.log("data is not coming");
  //             }
  //         })
  //         nftsData.getNftByCre(res.data.Creator)
  //             .then((res) => {
  //             console.log(res);
  //             if (res.status === 200) {
  //               console.log(res.data);
  //               setNftDataCre(res.data)
  //             }else{
  //               console.log("data is not coming");
  //             }
  //         })
  //       }else{
  //         console.log("data is not coming");
  //       }
  //   })
  // },[id])

  return (
    nftDataCat && (
      <main>
        <section>
        <div className="">
          <StickyScroll nftData={nftData} />
        </div>
      </section>
        {/* <section className=" h-[90vh] flex items-center">
          <Container>
            <div className=" flex ">
              <div className=" w-1/2">
                <img
                  src={nftData.image}
                  alt=""
                  className=" w-[500px] h-[500px] rounded-3xl"
                />
              </div>
              <div className=" w-1/2">
                <h2 className=" text-4xl font-bold text-white">
                  {nftData.name}
                </h2>
                <h2 className=" text-xl text-gray-400 font-bold mb-2">
                  {nftData.description}
                </h2>
                
                <div className="  dark:bg-[#ededed] flex rounded-2xl gap-3">
                  <div className=" flex gap-3 items-center w-full p-2 rounded-xl bg-zinc-800 dark:bg-[#ffffffbd]">
                    <img
                      src={nftData.image}
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
                      src={nftData.image}
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
                  
                  
                  <div className=" rounded-xl mt-2  dark:bg-[#ffffffbd]">
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
                    <button className="rounded-xl mt-3 text-base w-1/2 px-4 py-2 bg-white dark:bg-black  dark:text-white text-nowrap text-black font-bold">
                      Place Bid
                    </button>
                  <div className=" border-b-2 border-[#8cc8f9] my-4 "></div>
                  <div className="flex gap-3 mt-2">
                    <button className="rounded-xl text-base  px-4 py-2 w-full bg-white dark:bg-black  dark:text-white text-nowrap text-black font-bold">
                      Buy Now
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section> */}
        <section>
          <Container>
            <div>
              <div className="items-center flex justify-center ">
                <h1 className=" font-logofont text-white dark:text-black text-center text-3xl mb-8">
                  More From This <br className="md:hidden" />
                  <span className="text-[#28F0CC] bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                    Category
                  </span>
                </h1>
              </div>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
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
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                {nftDataCat?.map((nft) => (
                  <SwiperSlide>
                    <Card3Dusage
                      key={nft.tokenId}
                      tokenId={nft.tokenId}
                      Name={nft.name}
                      Creator={nft.creator}
                      Price={nft.price}
                      Image={nft.image}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Container>
        </section>
      </main>
    )
  );
}

export default Item;
