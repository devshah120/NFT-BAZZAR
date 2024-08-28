import React from 'react'
import ThemeToggle from '../Animation/ThemeToggle'
function Trycard({num,title,sub,img}) {
  return (
    <div className=' rounded-2xl items-center  gap-12  flex justify-center overflow-hidden hover:scale-110 ease-in transition-all  dark:shadow-[0_0_10px_purple]'>
        <div className='bg-[conic-gradient(theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] '>
          <div className="w-56 p-3 rounded-2xl m-[4px] flex flex-col  relative items-center bg-[#2a2828] dark:bg-[#0c0202b9] overflow-hidden ">
              <img
                  src={img}
                  alt=""
                  className=" h-40 scale-100 rounded-lg  "
              />
              
              <h5 className='text-[#ffffff] dark:text-[#fff] text-center font-bold '>{title}</h5>
              
              <h5 className='text-[#ffffff] dark:text-[#ffffff] dark:font-semibold  text-center font-light mt-2 '>{sub}

              </h5>
              
              <h5 className='text-[#ffffff3a]  text-[210px] ml-2 absolute top-[85px]  -left-[40px]  font-extrabold '>{num}</h5>
          </div>
        </div>

  </div>
  
  )
}

export default Trycard



{/* <div className=' bg-[#ffffff28] rounded-2xl items-center  gap-12  flex justify-center relative overflow-hidden hover:scale-110 ease-in transition-all hover:border-4  hover:border-[#28F0CC] border-2 border-[#fff] '> */}