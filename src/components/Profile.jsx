import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, MainImgAni,Collectioncard,Trycard,Trendcard, Button} from "../components";
import asa from '../assets/card/85.jpg'

const NFTCategoryToggle = ({ categories, nfts }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredNFTs = selectedCategory
    ? nfts.filter(nft => nft.category === selectedCategory)
    : nfts;

  return(
    <section>
        <Container>
    
<div>
               
    <div>
    <ul className=' mb-12 flex items-center justify-center overflow-x-auto overflow-y-hidden border-b border-cyan-500 pb-px dark:border-cyan-600 md:justify-center '>
       {categories.map((category,index) => (
            <li key={index}>
                <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className=" relative flex items-center whitespace-nowrap py-3 px-6 dark:text-black text-white  hover:text-cyan-400   dark:hover:text-cyan-400  font-bold text-lg ease-in transition-all "
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}

                </motion.button>
            </li>
                    ))}
    </ul>
    </div>


    <div className='flex flex-row gap-10 justify-center items-center flex-wrap'>
    {filteredNFTs.map(nft => (
<motion.div
key={nft.id}
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.8 }}
transition={{ duration: 0.3 }}>



    <div className='group/main ease-in transition-all dark:bg-slate-100  bg-[#ffffff1e] w-[250px] h-[430px] rounded-2xl p-2 dark:shadow-[0_0_10px_black]'>
            <div className=' h-72 mb-3 ease-in transition-all rounded-2xl overflow-hidden relative'>
                <img src={nft.image} alt="" className='rounded-2xl object-cover w-full h-full group-hover/main:scale-110 ease-in transition-all'/>
                <Button className='   font-bold opacity-0 absolute top-[-45%] right-[-33%] group-hover/main:top-[-53%] group-hover/main:right-[-33%] group-hover/main:opacity-100 duration-200 ease-in transition-all '>Place Bid</Button>
            </div>
            <div className='flex mb-[9px]'>
                <h1 className=' font-extrabold dark:text-black text-white hover:text-[#28F0CC] ease-in transition-all'>{nft.name}</h1>
            </div>
            <div className=' flex gap-3 items-center mb-3'>
                <img src={asa} alt="" className=' h-10 w-10 rounded-full' />
                    <div>
                        <h6 className=' text-xs text-[#838181]  dark:text-black font-semibold'>
                            Created By:
                        </h6>
                        <h6 className=' text-sm ease-in transition-all dark:text-black hover:text-[#28F0CC] font-bold text-[#fff]'>
                        {nft.description}
                        </h6>
                    </div>
            </div>
            <div className=' border border-[#676767] mb-2'>
                
            </div>
            <div className=' flex justify-between items-center'>
                <h6 className=' text-xs text-[#838181] dark:text-black font-semibold'>Current Bid</h6>
                <div className=' flex gap-2'>
                    <img src={asa} alt=""  className=' w-4'/>
                    <h4 className=' text-sm text-[#ffffff] dark:text-black font-semibold'>15.67</h4>
                </div>
            </div>
     
   
     </div>
     </motion.div>
))}
    </div>



</div>            
</Container>
    </section>

  )
}

export default NFTCategoryToggle;





// <div>

// </div>
    
// <div>
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// {filteredNFTs.map(nft => (
// <motion.div
// key={nft.id}
// initial={{ opacity: 0, scale: 0.8 }}
// animate={{ opacity: 1, scale: 1 }}
// exit={{ opacity: 0, scale: 0.8 }}
// transition={{ duration: 0.3 }}
// className="bg-white rounded-lg shadow-md p-4"
// >
// <img src={nft.image} alt={nft.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
// <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
// <p className="text-gray-500">{nft.description}</p>
// </motion.div>
// ))}
// </div>
// </div>
// {/* data gained */}
// <div>
// <div className='group/main ease-in transition-all dark:bg-[#28b4f056] bg-[#ffffff1e] w-[250px] h-[430px] rounded-2xl p-2 dark:shadow-[0_0_20px_purple]'>
// <div className=' h-72 mb-3 ease-in transition-all rounded-2xl overflow-hidden relative'>
// <img src={asa} alt="" className='rounded-2xl object-cover w-full h-full group-hover/main:scale-110 ease-in transition-all'/>
// <Button className='   font-bold opacity-0 absolute top-[-45%] right-[-33%] group-hover/main:top-[-53%] group-hover/main:right-[-33%] group-hover/main:opacity-100 duration-200 ease-in transition-all '>Place Bid</Button>
// </div>
// <div className='flex mb-[9px]'>
// <h1 className=' font-extrabold dark:text-black text-white hover:text-[#28F0CC] ease-in transition-all'>NFT NAME</h1>
// </div>
// <div className=' flex gap-3 items-center mb-3'>
// <img src={aimg} alt="" className=' h-10 w-10 rounded-full' />
//     <div>
//         <h6 className=' text-xs text-[#838181]  dark:text-black font-semibold'>
//             Created By:
//         </h6>
//         <h6 className=' text-sm ease-in transition-all dark:text-black hover:text-[#28F0CC] font-bold text-[#fff]'>
//             Dhruv Shah
//         </h6>
//     </div>
// </div>
// <div className=' border border-[#676767] mb-2'>

// </div>
// <div className=' flex justify-between items-center'>
// <h6 className=' text-xs text-[#838181] dark:text-black font-semibold'>Current Bid</h6>
// <div className=' flex gap-2'>
//     <img src={aimg} alt=""  className=' w-4'/>
//     <h4 className=' text-sm text-[#ffffff] dark:text-black font-semibold'>15.67</h4>
// </div>
// </div>
// </div>
// </div>