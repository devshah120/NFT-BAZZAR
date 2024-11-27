import React from 'react';
import { Link } from 'react-router-dom';
import { CardBody, CardContainer, CardItem } from "../cards/Card3D";
import bimg from "../../assets/card/a.png";
import aimg from "../../assets/card/polygon-matic-logo.png";

const Card3Dusage = ({ Name="soham", Creator, Price, Image={bimg}, tokenId,description="soham",owner, className }) => {
  const trimAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return (
    <Link 
      to={`/nft/${tokenId}`}
      state={{ Name, Creator, Price, Image, tokenId,description,owner }}
    >
      <CardContainer className={`inter-var ${className}`}>
        <CardBody className="bg-zinc-800 relative group/card md:hover:border-sky-500  dark:bg-white dark:border-black w-[300px] h-auto rounded-xl p-6 dark:border-2 ">  
          {/* Main image */}
          <CardItem translateZ="100" className="w-full">
            <img
              src={Image}
              className="h-72 w-72 object-cover rounded-xl group-hover/card:shadow-xl dark:border-2 dark:border-black "
              alt="thumbnail"
              
            />
          </CardItem>
          {/* NFT name */}
          <CardItem translateZ="70" className="text-xl mt-2 font-bold text-white dark:text-black">
            {Name}
          </CardItem>
          {/* Created by */}
          <CardItem translateZ="60" className="text-neutral-500  text-sm max-w-sm mt-2 dark:text-neutral-300">
            <div className='flex gap-3 items-center mb-3'>
              {/* <img src={bimg} alt="" className='h-10 w-10 rounded-full' /> */}
              <div>
                <h6 className='text-xs text-[#838181] font-semibold'>Created By:</h6>
                <h6 className='text-sm ease-in dark:text-black transition-all font-bold text-white '>
                  {trimAddress(Creator)}
                </h6>
              </div>
            </div>
          </CardItem>
          {/* Current bid and bid now */}
          <div className="flex justify-between items-center">
            <CardItem translateZ={40} className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
              <div className='flex flex-col justify-between items-center'>
                <h6 className='text-xs text-[#838181] font-semibold'>Price</h6>
                <div className='flex gap-2'>
                  <img src={aimg} alt="" className='w-4'/> 
                  <h4 className='text-sm font-semibold dark:text-black text-white'>{Price} MATIC</h4>
                </div>
              </div>
            </CardItem>
            <CardItem translateZ={40} as="button" className="px-4 py-2 rounded-xl bg-white dark:bg-black dark:text-white text-black text-xs font-bold">
              View NFT
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  );
};

export default Card3Dusage;