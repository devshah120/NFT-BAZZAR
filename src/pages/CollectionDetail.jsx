import React, { useContext, useEffect, useState } from "react";
import { Container } from "../components";
import { useParams } from "react-router-dom";
import nftsData from "../dataGathering/nftsData";
import Card3Dusage from "../components/cards/Card3Dusage";
import Trendcard from "../components/cards/Trendcard";
import ScrollAnimationItem from "../components/Animation/PageAnimation";
import { NFTBazzarContext } from "../../Context/NFTBazzarContext";



import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
function CollectionDetail() {
  const [nfts, setNfts] = useState([]);
  const { cat } = useParams();
  console.log(cat);
  const { fetchNftsByCat } = useContext(NFTBazzarContext);


  // get nfts data
  useEffect(() => {
    fetchNftsByCat(cat).then((item) => {
    setNfts(item.reverse());
    console.log(nfts);
    });
  }, []);

  return (
    <main>
      {/* popular nfts */}
      <section>
        <ScrollAnimationItem>
          <Container>
            <div className=" flex flex-col py-10 justify-center min-h-screen ">
              <div className="items-center flex justify-center ">
                <h1 className=" font-logofont text-white dark:text-black text-center text-3xl mb-8">
                  Popular Items From <span className="text-[#28F0CC] bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                  {cat.toUpperCase( )}
                  </span> In Last <br className="md:hidden" />
                  <span className="text-[#28F0CC] bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                    1 Month
                  </span>
                </h1>
              </div>
              <div>
                <div className="grid md:grid-cols-3 gap-10 ">
                  {nfts && nfts.slice(0, 9).map((item, index) => (
                    <Trendcard
                      mimg={item.image}
                      nftname={item.name}
                      price={`${item.price} MATIC`}
                      position={index + 1}
                    ></Trendcard>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </ScrollAnimationItem>
      </section>
      {/* latest nfts */}
      <section>
        <Container>
          <h1 className=" font-logofont text-white dark:text-black text-center text-3xl mb-8">
            Latest NFTs Of <br className="md:hidden" />
            <span className="text-[#28F0CC] bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
              {cat.toUpperCase()}
            </span>
          </h1>
          {nfts && (
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
                  spaceBetween: 40,
                },
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {nfts?.map((nft) => (
                <SwiperSlide>
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
          )}
        </Container>
      </section>
    </main>
  );
}

export default CollectionDetail;
