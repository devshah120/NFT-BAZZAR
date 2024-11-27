"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./Card3D";
import { Link } from "react-router-dom";
import aimg from "../../assets/card/polygon-matic-logo.png"
import Nimg from "../../assets/card/art/nimg.jpg"
export function Preview( {className, Name, Price, Image } ) {

  const defaultName = Name || 'NFT NAME';
  const defaultPrice = Price || '0';
  return (
      <Link to="/item">
    <CardContainer className={`inter-var ${className}`}>
      <CardBody className="bg-zinc-800 relative group/card md:hover:border-sky-500  dark:bg-white dark:border-black w-[300px] h-auto rounded-xl p-6 dark:border-2  ">  

      {/* main image */}
        <CardItem translateZ="100" className="w-full">
        {Image ? (
              <img
                src={Image}
                className="h-72 w-72 object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            ) : (
              <div className="h-72 w-[250px]  rounded-xl group-hover/card:shadow-xl">
                <span className="text-gray-400 text-sm">No Image Uploaded</span>
              </div>
            )}
        </CardItem>
        {/* Nft name */}
        <CardItem
          translateZ="70"
          className="text-xl mt-2 font-bold text-white dark:text-black"
        >
          {defaultName}
        </CardItem>
        {/* created by */}
        <CardItem
          translateZ="60"
          className="text-neutral-500  text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          <div className=' flex gap-3 items-center mb-3'>
                <img src={Nimg} alt="" className=' h-10 w-10 rounded-full' />
                    <div>
                        <h6 className='text-xs text-[#838181] font-semibold'>
                            Created By:
                        </h6>
                        <h6 className='text-sm ease-in dark:text-black transition-all font-bold text-white'>
                            You
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
                    <h4 className=' text-sm font-semibold dark:text-black text-white'>{
                      defaultPrice} MATIC</h4>
                </div>
            </div>
          </CardItem>
          <CardItem
            translateZ={40}
            as="button"
            className="px-4 py-2 rounded-xl bg-white dark:bg-black dark:text-white text-black text-xs font-bold"
          >
            Buy Now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
      </Link>
  );
}
