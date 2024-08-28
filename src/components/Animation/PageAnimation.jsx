import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// import { motion,useInView,useAnimation,AnimatePresence } from "framer-motion";

const scrollVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const ScrollAnimationItem = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={scrollVariants}
      transition={{ duration:1}}
        
    >
      {children}
    </motion.div>
  );
};


export default ScrollAnimationItem;




// import React from 'react';
// import { motion, useTransform, useViewportScroll } from 'framer-motion';

// const ScrollAnimationItem = ({children}) => {
//   const { scrollYProgress } = useViewportScroll();
//   const y = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);

//   return (
//     <motion.div style={{ position: 'relative', height: '100vh' }}>
//       <motion.div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'linear-gradient(to bottom, #9A74D24D, #D2BF744D)',
//         y, // Apply the y transform for the parallax effect
//         }}
//       />
//       <motion.div
//         style={{
//           position: 'absolute',
//           top: '-7%',
//           left: '30%',
//           translate: '-50%, -50%',
//           zIndex: 2,
//         }}
//       >
//        {children}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ScrollAnimationItem;




// import React from 'react';
// import { motion, useTransform, useMotionValue } from 'framer-motion';
// const ScrollAnimationItem = () => {
//   const scrollY = useMotionValue(0);

//   React.useEffect(() => {
//     const updateScrollValue = () => {
//       scrollY.set(window.scrollY);
//     };

//     window.addEventListener('scroll', updateScrollValue);

//     return () => window.removeEventListener('scroll', updateScrollValue);
//   }, [scrollY]);

//   const y = useTransform(scrollY, [1, window.innerHeight], ['0%', '-100%']);

//   return (
//     <motion.div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
//       <motion.div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'linear-gradient(to bottom, #28F0CC, #28F080)',
//           y,
//         }}
//       />
//       <motion.div
//         style={{
//           position: 'absolute',
//           top: '25%',
//           left: '33%',
//           translate: '-50%, -50%',
          
//           zIndex: 1,
//         }}
//       >
        
     
     
//        <motion.div className=" " 
//          // initial={{y:'90vw'}}
//          // animate={{y:0}}
//          // transition={{delay:0.1,type:'spring',stiffness:50}}
         
         
//        >
    
//            <div className=" flex justify-center flex-col items-center">
               
           
//                      <motion.h1 className=" text-5xl font-extrabold text-white text-center"
//                      initial={{opacity: 0, x: -100}}
//                      animate={{opacity:1,x:0}}
//                      transition={{delay:0.1}}
//                      >
//                        DISCOVERY COLLECT <br></br>& SELL EXTRAORDINARY </motion.h1>

//                      <motion.h1 className=" text-9xl md:text-9xl font-logofont bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient"
//                      initial={{opacity: 0, x: 200}}
//                      animate={{opacity:1,x:0}}
//                      transition={{delay:0.2}}
//                      >NFTS!</motion.h1>
               
             

//                    <motion.div className=" mt-4 "
//                    initial={{opacity: 0, x: 200}}
//                    animate={{opacity:1,x:0}}
//                    transition={{delay:0.4}}>
//                      <h3 className=" text-white"><span className=" text-sky-300">Popular searches:</span> cryptopunks, bored ape yacht club, moonbirds
//                      </h3>
//                    </motion.div>
//            </div>
       
//        </motion.div>
     
//       </motion.div>
//     </motion.div>
//   );
// };




// import React, { useEffect } from 'react';
// import { motion, useTransform, useScroll } from 'framer-motion';

// const ScrollAnimationItem = ({ speed, children }) => {
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 1000], [0, -speed]);

//   return (
//     <motion.div className=" w-full h-screen" style={{ y }}>
//       {children}
//     </motion.div>
//   );
// };


// export default ScrollAnimationItem;
