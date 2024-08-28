 import React from 'react'
 import aimg from "../../assets/card/dd.png";
 import Button from "../Button";


 function Collectioncard() {
   return (
     <div className='group/main ease-in transition-all dark:bg-[#000000] bg-[#ffffff1e] w-[250px] h-[430px] rounded-2xl p-2 '>
            <div className=' h-72 mb-3 ease-in transition-all rounded-2xl overflow-hidden relative'>
                <img src={aimg} alt="" className='rounded-2xl object-cover w-full h-full group-hover/main:scale-110 ease-in transition-all'/>
                <Button className='   font-bold opacity-0 absolute top-[-45%] right-[-33%] group-hover/main:top-[-53%] group-hover/main:right-[-33%] group-hover/main:opacity-100 duration-200 ease-in transition-all '>Place Bid</Button>
            </div>
            <div className='flex mb-[9px] text-white '>
                <h1 className=' font-extrabold  hover:text-[#28F0CC] ease-in transition-all'>NFT NAME</h1>
            </div>
            <div className=' flex gap-3 items-center mb-3'>
                <img src={aimg} alt="" className=' h-10 w-10 rounded-full' />
                    <div>
                        <h6 className=' text-xs text-[#838181]   font-semibold'>
                            Created By:
                        </h6>
                        <h6 className=' text-sm ease-in transition-all  hover:text-[#28F0CC] font-bold text-[#fff]'>
                            Dhruv Shah
                        </h6>
                    </div>
            </div>
            <div className=' border border-[#676767] mb-2'>
                
            </div>
            <div className=' flex justify-between items-center'>
                <h6 className=' text-xs text-[#838181]  font-semibold'>Current Bid</h6>
                <div className=' flex gap-2'>
                    <img src={aimg} alt=""  className=' w-4'/>
                    <h4 className=' text-sm   font-semibold dark:text-white text-white'>15.67</h4>
                </div>
            </div>
     </div>
   )
 }
 
 export default Collectioncard