import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from 'framer-motion';
import { NFTBazzarContext } from '../../../Context/NFTBazzarContext';
import { useNavigate } from 'react-router-dom';

function Resell({nftdata, onClose }) {
  const { register, handleSubmit } = useForm()
  
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [saleType, setSaleType] = useState('onSale') // State to track the selected form
  const {reSellItem} = useContext(NFTBazzarContext) 
  const submit = async (data) => {
    console.log(data);
    
    try {
      setLoader(true);
      console.log(nftdata); 
      
      // Ensure you have necessary inputs (price, tokenId, etc.)
      if (!data.price || !nftdata.tokenId) {
        console.error("Price or Token ID is missing.");
        setLoader(false);
        return;
      }
  
      // If you're handling auction-based resell
      if (saleType === 'onAuction') {
        const onAuction = true; // Boolean for auction mode
        await reSellItem(nftdata.tokenId, data.price, onAuction, data.auctionDuration); // Resell with auction
        alert("NFT has been listed for auction!");
      } else {
        await reSellItem(nftdata.tokenId, data.price); // Regular resale without auction
        alert("NFT has been re-listed for sale!");
      }
  
      setLoader(false);
      navigate("/"); // Navigate back to the marketplace or home page after successful resale
    } catch (error) {
      console.error("Error while reselling NFT:", error);
      setLoader(false);
    }
  }


  // Framer Motion Animations
  const backdropVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const modalVariant = {
    hidden: { opacity: 0, y: "-50px" },
    visible: { opacity: 1, y: "0px", transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { opacity: 0, y: "50px" },
  }

  const formVariant = {
    hidden: { opacity: 0, x: "-100px" },
    visible: { opacity: 1, x: "0px", transition: { duration: 0.5 } },
    exit: { opacity: 0, x: "-100px" },
  }
  const formVariant1 = {
    hidden: { opacity: 0, x: "100px" },
    visible: { opacity: 1, x: "0px", transition: { duration: 0.5 } },
    exit: { opacity: 0, x: "100px" },
  }

  return (
    <motion.div 
      className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex items-center justify-center z-20'
      variants={backdropVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className='bg-white p-6 m-1 rounded-lg w-full max-w-sm relative py-10 shadow-lg'
        variants={modalVariant}
      >
        <RxCross2 onClick={onClose} className='absolute h-6 w-6 right-2 top-2 cursor-pointer hover:text-red-600' />
        <h2 className='text-center font-semibold text-xl mb-4 text-gray-700'>Resell</h2>

        <div className='flex flex-col bg-gray-200 p-4 h-72 rounded-md overflow-hidden'>
          <div className='flex'>
            <div 
              className={`w-1/2 text-center text-gray-700 py-2 rounded-s-lg cursor-pointer ${saleType === 'onSale' ? 'bg-blue-300' : 'bg-gray-300 hover:bg-blue-200'}`} 
              onClick={() => setSaleType('onSale')}
            >
              On Sale
            </div>
            <div 
              className={`w-1/2 text-center text-gray-700 py-2 rounded-e-lg cursor-pointer ${saleType === 'onAuction' ? 'bg-blue-300' : 'bg-gray-300 hover:bg-blue-200'}`} 
              onClick={() => setSaleType('onAuction')}
            >
              On Auction
            </div>
          </div>  

          {/* Forms with AnimatePresence */}
          <div className="relative h-36 mt-5">
            <AnimatePresence mode="wait">
              {saleType === 'onSale' && (
                <motion.form 
                  key="onSaleForm" 
                  onSubmit={handleSubmit(submit)} 
                  className='absolute w-full grid gap-2' 
                  variants={formVariant} 
                  initial="hidden" 
                  animate="visible" 
                  exit="exit"
                >
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="price" className="text-gray-600">Price</label>
                    <input 
                      type="text" 
                      name="price" 
                      id="price" 
                      {...register("price")} 
                      required 
                      placeholder='Enter your sale price' 
                      className='bg-gray-100 rounded-md px-2 py-1 border focus:outline-none focus:border-blue-500' 
                    />
                  </div>
                  <button 
                    type='submit' 
                    className='bg-blue-400 hover:bg-blue-500 rounded-md text-lg h-8 mt-5 font-semibold text-white transition-colors duration-300'
                    
                  >
                    {loader ? "Loading" : 'Put on Sale'}
                  </button>
                </motion.form>
              )}

              {saleType === 'onAuction' && (
                <motion.form 
                  key="onAuctionForm" 
                  onSubmit={handleSubmit(submit)} 
                  className='absolute w-full grid gap-2' 
                  variants={formVariant1} 
                  initial="hidden" 
                  animate="visible" 
                  exit="exit"
                >
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="price" className="text-gray-600">Price</label>
                    <input 
                      type="text" 
                      name="price" 
                      id="price" 
                      {...register("price")} 
                      required 
                      placeholder='Enter your auction price' 
                      className='bg-gray-100 rounded-md px-2 py-1 border focus:outline-none focus:border-blue-500' 
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="auctionDuration" className="text-gray-600">Auction Duration</label>
                    <input 
                      type="text" 
                      name="auctionDuration" 
                      id="auctionDuration" 
                      {...register("auctionDuration")} 
                      required 
                      placeholder='Enter the auction duration' 
                      className='bg-gray-100 rounded-md px-2 py-1 border focus:outline-none focus:border-blue-500' 
                    />
                  </div>
                  <button 
                    type='submit' 
                    className='bg-blue-400 hover:bg-blue-500 rounded-md text-lg h-8 mt-5 font-semibold text-white transition-colors duration-300'
                  >
                    {loader ? "Loading" : 'Start Auction'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Resell;
