import React from 'react'
import { motion,useInView,useAnimation } from "framer-motion";


function Button({children,className,onClick}) {
  return (
    // <button className={`border-[3px] px-6 py-2 rounded-lg text-xs border-[#28F0CC] overflow-hidden relative after:content-['*'] after:bg-[#28f0CC] after:h-[255px] after:left-[-135px] after:opacity-20 after:absolute after:top-[-55px] after:rotate-45 after:transition-all after:duration-500 after:ease-in  after:w-[50px]   hover:after:left-[120%]  hover:after:transition-all hover:after:duration-500 hover:after:ease-in ${className}`}><span className=' z-0'>{children}</span></button>


    <motion.button className={`${className} px-4 py-2 rounded-xl bg-white dark:bg-black dark:text-white text-black text-xs font-bold `}
    onClick={onClick}
  //   whileHover={{
  //     textShadow:"0px 0px 8px rgb(255,255,255)",
  //     boxShadow :"0px 0px 8px rgb(255,255,255)",
  // }}
    >{children}</motion.button>
  )
}

export default Button

// bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400))]