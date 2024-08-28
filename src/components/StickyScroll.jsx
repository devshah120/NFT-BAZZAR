"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import fsa from "../assets/card/g.jpg";
import fig from "../assets/working/3759390.jpg";
import asa from "../assets/card/c.jpg";
import bsa from "../assets/card/hh.jpg";
import csa from "../assets/card/d.jpg";
import dsa from "../assets/card/ee.jpg";
import esa from "../assets/card/f.jpg";
import Button from "./Button";
import CountdownTimer from "../components/Countdown";
import Container from "./Container";
import NFTCategoryToggle from "./Profile";

export const StickyScroll = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);


  const categories = ["OnSale", "Owned", "Created", "Collection", "Activity"];

  const nfts = [
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
 
  const content1 = [
    {
      title: "Collaborative Editing",
      description:
        "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Collaborative Editing
        </div>
      ),
    },
    {
      title: "Real time changes",
      description:
        "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          dknclzcisv
        </div>
      ),
    },
    {
      title: "Version control",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          Version control
        </div>
      ),
    },
    {
      title: "Running out of content",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Running out of content
        </div>
      ),
    },
  ];


  return (
    



    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      // className=" overflow-y-auto no-scrollbar h-[100vh] relative space-x-10 rounded-md "
      ref={ref}
    >
      <Container>
        <div className=" overflow-y-auto no-scrollbar h-[100vh] relative space-x-10 rounded-md flex ">
      <div className="div w-2/3 relative flex items-start px-4">
        <div className="max-w-2xl">
          <div className=" w-full flex justify-center mb-5">
        <motion.img  
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          src={fig}
          alt=""
          className=" mt-4 mb-4 h-[600px] w-[600px] rounded-xl "
          /></div>
          <div className=" w-full h-0 border-b-2 mb-5"></div>
          <h1 className=" text-white text-2xl font-extrabold mb-2">Description :</h1>
          <h1 className=" text-white text-lg font-light">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
           quaerat quos, animi velit, mollitia voluptate asperiores
           repudiandae, adipisci ex maxime incidunt tempora est sed.
           Magni, voluptatibus? Adipisci similique a nulla ea quibusdam
           assumenda deserunt nesciunt est sunt voluptatum non illum,
           delectus beatae voluptatibus quidem perspiciatis ullam officia
           asperiores recusandae voluptate!
         </h1>
          <div className="h-40" />
        </div>
      </div>
      <div
        // style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block w-1/3 my-4 rounded-md text-white top-10 sticky",
          contentClassName
        )}
      >
        <div className=" flex flex-col  gap-6 ">
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                className=" gap-2 flex flex-col"
              >
                <div className=" flex gap-3 items-center">
                  <img src={fig} alt="" className=" h-7 w-7 rounded-full" />
                  <h1 className=" font-semibold">Dhruv Shah</h1>
                </div>
                <h1 className=" text-3xl font-bold">#NFT NAME</h1>
                <h1 className=" text-xm text-[#656565] font-bold">
                  Royalties <span className=" rounded bg-sky-500 text-white px-1"> 0% </span>
                </h1>
                <div className=" flex flex-row mt-5 gap-[50px]">
                  <div className=" flex gap-3 items-center mb-3">
                    <img src={fig} alt="" className=" h-10 w-10 rounded" />
                    <div>
                      <h6 className=" text-xs   font-semibold">
                        Creator
                      </h6>
                      <h6 className=" text-sm ease-in transition-all  hover:text-[#28F0CC] font-bold">
                        Dhruv Shah
                      </h6>
                    </div>
                  </div>
                  {/* <div className=" flex gap-3 items-center mb-3">
                    <img src={fig} alt="" className=" h-10 w-10 rounded" />
                    <div>
                      <h6 className=" text-xsfont-semibold">
                        Owened By:
                      </h6>
                      <h6 className=" text-sm ease-in transition-all  hover:text-[#28F0CC] font-bold">
                        Dhruv Shah
                      </h6>
                    </div>
                  </div> */}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
            
                className=" flex gap-6 border rounded-md w-full flex-col   bg-transparent mt-4 ">
                <div className="flex flex-col  md:justify-center gap-6 m-4">
                  <div className=" flex flex-col justify-center">
                    <h1 className=" text-[#6d6d6d] font-extrabold">price</h1>
                    <h1>10 ETH</h1>
                  </div>
                  <div className="">
                    <h1>Auction Ends In</h1>
                    <CountdownTimer initialSeconds={12000} />
                  </div>

                </div>
              </motion.div>
                  {/* <Button className="  md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                    Place Bid
                  </Button> */}
            </div>
      </div>
      </div>
      </Container>
    </motion.div>
  );
};
export default StickyScroll;
