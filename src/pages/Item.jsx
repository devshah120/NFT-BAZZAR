





import React from "react";
import {
  Container,
  MainImgAni,
  Collectioncard,
  Trycard,
  Trendcard,
  Button,
} from "../components";
import fsa from "../assets/card/g.jpg";
import fig from "../assets/working/3759390.jpg";
import CountdownTimer from "../components/Countdown";
import NFTCategoryToggle from "../components/Profile";
import StickyScroll from "../components/StickyScroll";
import asa from "../assets/card/c.jpg";
import bsa from "../assets/card/hh.jpg";
import csa from "../assets/card/d.jpg";
import dsa from "../assets/card/ee.jpg";
import esa from "../assets/card/f.jpg";
import { motion, AnimatePresence ,useAnimation} from "framer-motion";
import { useInView } from 'react-intersection-observer';
import ScrollAnimationItem from "../components/Animation/PageAnimation";
function Item() {
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
 
  const content = [
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

    // <div>
    //   <section className="text-slate-100 dark:text-slate-950 dark:bg-white">
      
    //    <Container>
    //       <div className="flex items-center flex-col md:flex-row ">
    //         <motion.img
              
    //           initial={{ opacity: 0, x: -200 }}
    //           animate={{ opacity: 1, x: 0 }}
    //           transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
    //           src={fig}
    //           alt=""
    //           className=" mt-4 mb-4 h-[600px] w-[600px] rounded-xl "
    //         />
    //         <div className=" md:m-10 flex flex-col items-center gap-6 ">
    //           <motion.div
    //             initial={{ opacity: 0, x: 200 }}
    //             animate={{ opacity: 1, x: 0 }}
    //             transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
    //             className=" gap-4 flex flex-col"
    //           >
    //             <h1 className=" font-semibold">Dhruv Shah</h1>
    //             <h1 className=" text-4xl font-bold">#NFT NAME</h1>
    //             <h1 className=" text-xm font-bold">
    //               4.7 ETH Highest bid 1/1 Available
    //             </h1>
    //             <h1 className=" text-xm font-light">
    //               Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
    //               quaerat quos, animi velit, mollitia voluptate asperiores
    //               repudiandae, adipisci ex maxime incidunt tempora est sed.
    //               Magni, voluptatibus? Adipisci similique a nulla ea quibusdam
    //               assumenda deserunt nesciunt est sunt voluptatum non illum,
    //               delectus beatae voluptatibus quidem perspiciatis ullam officia
    //               asperiores recusandae voluptate!
    //             </h1>
    //             <div className=" flex flex-row gap-[50px]">
    //               <div className=" flex gap-3 items-center mb-3">
    //                 <img src={fig} alt="" className=" h-10 w-10 rounded" />
    //                 <div>
    //                   <h6 className=" text-xs   font-semibold">
    //                     Created By:
    //                   </h6>
    //                   <h6 className=" text-sm ease-in transition-all  hover:text-[#28F0CC] font-bold">
    //                     Dhruv Shah
    //                   </h6>
    //                 </div>
    //               </div>
    //               <div className=" flex gap-3 items-center mb-3">
    //                 <img src={fig} alt="" className=" h-10 w-10 rounded" />
    //                 <div>
    //                   <h6 className=" text-xsfont-semibold">
    //                     Owened By:
    //                   </h6>
    //                   <h6 className=" text-sm ease-in transition-all  hover:text-[#28F0CC] font-bold">
    //                     Dhruv Shah
    //                   </h6>
    //                 </div>
    //               </div>
    //             </div>
    //           </motion.div>

    //           <motion.div
    //             initial={{ opacity: 0, x: 200 }}
    //             animate={{ opacity: 1, x: 0 }}
    //             transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
            
    //             className=" flex gap-6 border rounded-md w-full flex-col   bg-transparent mt-4 ">
    //             <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-6 m-4">
    //               <div className=" flex flex-col justify-center">
    //                 <h1 className=" font-semibold">
    //                   Highest Bid By NFT WALLET ID{" "}
    //                 </h1>
    //                 <div className=" flex gap-3 items-center mt-2">
    //                   <img src={fig} alt="" className=" h-10 w-10 rounded" />
    //                   <div>
    //                     <h6 className=" text-xs  font-semibold">
    //                       Created By:
    //                     </h6>
    //                     <h6 className=" text-sm ease-in transition-all  hover:text-[#28F0CC] font-bold ">
    //                       Dhruv Shah
    //                     </h6>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className=" border md:h-[80px]  "></div>

    //               <div className="">
    //                 <h1>Auction Ends In</h1>
    //                 <CountdownTimer initialSeconds={12000} />
    //               </div>

    //             </div>
    //           </motion.div>
    //               <Button className="  md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
    //                 Place Bid
    //               </Button>
    //         </div>
    //       </div>
    //     </Container>
      
       
    //   </section>
    //   <section >
        
    //     <Container>
    //       <div>
    //         <NFTCategoryToggle categories={categories} nfts={nfts} />
    //       </div>
    //     </Container>
     
    //   </section>
    // </div>

    

    <main>
      <section>
      <div className="">
        <StickyScroll content={content} />
      </div>
    </section>
     <section >
        
      <Container>
        <div>
          <NFTCategoryToggle categories={categories} nfts={nfts} />
        </div>
      </Container>
    </section>
    </main>
      
  );
}

 export default Item;



