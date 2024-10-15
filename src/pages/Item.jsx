





import React, {useState,useEffect,useContext} from "react";
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
import nftsData from "../dataGathering/nftsData"
import { Swiper, SwiperSlide } from "swiper/react";
import { Card3Dusage } from "../components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
function Item() {
  const {tokenId} = useParams()
  const [nftData,setNftData] = useState()
  const [nftDataCat,setNftDataCat] = useState()
  const user = useSelector((state) => state.auth.userData)

  const { fetchNftsByid,fetchNftsByCat } = useContext(NFTBazzarContext);


  // get nfts data
  useEffect(() => {
    fetchNftsByid(tokenId).then((item) => {
    setNftData(item[0]);
    console.log("item", item[0]);
      if(item[0]){
        fetchNftsByCat(item[0].catagory).then((item) => {
          setNftDataCat(item.reverse());
          });
      }
    });
  }, []);

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

  
    nftDataCat &&

    <main>
      <section>
        <div className="">
          <StickyScroll nftData={nftData} />
        </div>
      </section>
      <section >
        <Container>
          <div>
          <div className="items-center flex justify-center ">
        <h1 className=" font-logofont text-white dark:text-black text-center text-3xl mb-8">
              More From This  <br className="md:hidden"/><span className="text-[#28F0CC] bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">Category</span>
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
      
  );
}

 export default Item;



