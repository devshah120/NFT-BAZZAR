"use client";
import { cn } from "../utils/cn";
import { AnimatePresence,useMotionValue,useScroll,useTransform,useSpring, motion } from "framer-motion";
import React ,{ useState, useEffect ,useContext } from "react";
import { Container } from "../components";
import { Link } from "react-router-dom";
import Card3Dusage from '../components/cards/Card3Dusage';
import { NFTBazzarContext } from "../../Context/NFTBazzarContext";




import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";

// import nftsData from "../dataGathering/nftsData";


export const Collections = () => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const [nfts,setNfts] = useState([])
  // useEffect(() => {
  //   nftsData.getAllNfts()
  //   .then((res) => {
  //     setNfts(res.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }, []);
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

  const [hoveredIndex, setHoveredIndex] = useState(null);
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

  const { checkWalletConnected } = useContext(NFTBazzarContext);
  useEffect(() => {
    if (checkWalletConnected) {
      checkWalletConnected();
    } else {
      console.log("No Know");
    }
  }, []);

  return (
    <main>
        <section>
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
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
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
        </motion.div>
      </motion.div>
    </div>
        </section>
    

      <Container><section
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10"
      )}>
      {items.map((item, idx) => (
        <Link
          to={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </section></Container>
    </main>
  );
};

export const Highlight = ({
  className,
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1  px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500`,
        className
      )}
    >
     captivating NFTs.
    </motion.span>
  );
};

export const Header123 = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-48 md:py-30 px-4 w-full left-0 top-0">
      <div className={cn("relative z-[3] text-4xl md:text-7xl flex flex-col gap-4 text-white font-bold dark:text-black")}><span>Start Your Collection Today: <br/> Explore a vast selection of  </span><span><Highlight></Highlight></span></div>
    </div>
  );
};
export default Collections

const items = [
    {
      title: "Art",
      description:
        "Explore a diverse collection of unique digital art NFTs, showcasing various styles and creativity from emerging and established artists.",
      link: "/collections/Art",
    },
    {
      title: "Gaming",
      description:
        "The Gaming NFT collection features vibrant, dynamic illustrations of virtual reality, retro games, and futuristic worlds, capturing the essence of gaming's past, present, and future.",
      link: "/collections/Gaming",
    },
    {
      title: "Meta-Verse",
      description:
        "A collection of futuristic virtual reality landscapes, digital utopias, and advanced technology cityscapes.",
      link: "/collections/Meta-Verse",
    },
    {
      title: "Sport",
      description:
        "A dynamic collection capturing the excitement and intensity of various sports, from football to skiing, in vibrant illustrations.",
      link: "/collections/Sport",
    },
    {
      title: "Magic",
      description:
        "Experience the mystical realm with our Magic NFT collection, featuring enchanting artworks of wizards, spells, and mythical creatures.",
      link: "/collections/Magic",
    },
    {
      title: "Abstract",
      description:
        "Discover the Abstract NFT collection: a fusion of colors and shapes, offering a mesmerizing journey into the world of abstract art, where imagination meets innovation.",
      link: "/collections/Abstract",
    },
  ];

export const Card = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden  bg-fixed bg-items bg-cover border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
