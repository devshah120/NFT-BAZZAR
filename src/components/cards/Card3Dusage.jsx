import React from 'react';
import { Link } from 'react-router-dom';
import { CardBody, CardContainer, CardItem } from "../cards/Card3D";
import aimg from "../../assets/card/a.png";

const Card3Dusage = ({ Name, Creator, Price, Image, tokenId,description, className }) => {
  const trimAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return (
    <Link 
      to={`/nft/${tokenId}`}
      state={{ Name, Creator, Price, Image, tokenId,description }}
    >
      <CardContainer className={`inter-var ${className}`}>
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[300px] h-auto rounded-xl p-6 border">  
          {/* Main image */}
          <CardItem translateZ="100" className="w-full">
            <img
              src={Image}
              className="h-72 w-72 object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          {/* NFT name */}
          <CardItem translateZ="70" className="text-xl mt-2 font-bold text-black dark:text-white">
            {Name}
          </CardItem>
          {/* Created by */}
          <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
            <div className='flex gap-3 items-center mb-3'>
              <img src={aimg} alt="" className='h-10 w-10 rounded-full' />
              <div>
                <h6 className='text-xs text-[#838181] font-semibold'>Created By:</h6>
                <h6 className='text-sm ease-in transition-all hover:text-[#28F0CC] font-bold text-[#212121] dark:text-white'>
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
                  <h4 className='text-sm font-semibold dark:text-white text-[#212121]'>{Price}</h4>
                </div>
              </div>
            </CardItem>
            <CardItem translateZ={40} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
              Buy Now
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  );
};

export default Card3Dusage;