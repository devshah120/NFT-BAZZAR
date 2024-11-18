import React from 'react'
import Button from '../Button'
import { Link } from 'react-router-dom'
function Trendcard({mimg,nftname,price,position,id}) {
  return (
    <div className=' ease-in transition-all hover:border-2 dark:border-neutral-950  rounded-2xl md:hover:border-sky-300 md:hover:dark:border-sky-500'>
        
        
        <div className=' bg-[#0c0c0c]  dark:bg-[#ffffffbd] rounded-2xl items-center flex w-full h-full gap-2 ease-in transition-all overflow-hidden '>
        
                    <div>
                        <div className=' flex gap-3 items-center p-3 ml-5 relative  '>
                        
                                <div className=' absolute flex items-center justify-center h-7 w-7 border-2 border-[#ffffff]   -left-1 bg-slate-950  rounded-full text-white   text-xs'>{position}</div>
                             
                            <div className='bg-[conic-gradient(theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] flex items-center justify-center rounded-full p-[2px] '>
                                <img src={mimg} alt="" className=' h-14 w-14 rounded-full ' />
                            </div>
                           
                            <div className=' ml-2'>
                                
                                <h6 className=' text-sm ease-in transition-all  font-bold  text-[#fff] dark:text-black'>
                                    {nftname}
                                </h6>
                                <h6 className=' text-xs  text-[#838181] font-semibold'>
                                    {price}
                                </h6>
                            </div>
                        
                    
                        </div>
                              
                
                    </div>
            
            {/* </div> */}
            
         </div>
    </div>
  )
}

export default Trendcard