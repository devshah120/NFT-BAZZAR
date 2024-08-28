"use client";
import { NFTBazzarContext } from "../../../Context/NFTBazzarContext";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../cards/Card3D";
import { Link } from "react-router-dom";
import aimg from "../../assets/card/a.png"
import Nimg from "../../assets/card/art/nimg.jpg"
export function Card3Dusage( {className, Name="Unknown", Creator="Dhruv Shah", Price = "0", Image } ) {
  
  return (
      <Link to="/item">
    <CardContainer className={`inter-var ${className}`}>
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[300px] h-auto rounded-xl p-6 border  ">  

      {/* main image */}
        <CardItem translateZ="100" className="w-full">
          <img
            src={Image}
            className="h-72 w-72 object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        {/* Nft name */}
        <CardItem
          translateZ="70"
          className="text-xl mt-2 font-bold text-black dark:text-white"
        >
          {Name}
        </CardItem>
        {/* created by */}
        <CardItem
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          <div className=' flex gap-3 items-center mb-3'>
                <img src={aimg} alt="" className=' h-10 w-10 rounded-full' />
                    <div>
                        <h6 className=' text-xs text-[#838181]   font-semibold'>
                            Created By:
                        </h6>
                        <h6 className=' text-sm ease-in transition-all  hover:text-[#28F0CC] font-bold text-[#212121] dark:text-white'>
                            {Creator}
                        </h6>
                    </div>
            </div>
        </CardItem>
        {/* div line */}
        {/* <CardItem translateZ="60">
        <div className=' border w-full border-[#ff4949] mb-2'></div>
        </CardItem> */}
        {/* current bid and bid now */}
        <div className="flex justify-between items-center">
          <CardItem
            translateZ={40}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            <div className=' flex flex-col justify-between items-center'>
                <h6 className=' text-xs text-[#838181]  font-semibold'>Price</h6>
                <div className=' flex gap-2'>
                    <img src={aimg} alt=""  className=' w-4'/>
                    <h4 className=' text-sm   font-semibold dark:text-white text-[#212121]'>{
                      Price}</h4>
                </div>
            </div>
          </CardItem>
          <CardItem
            translateZ={40}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Buy Now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
      </Link>
  );
}
