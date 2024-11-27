import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from 'framer-motion';
import { NFTBazzarContext } from '../../../Context/NFTBazzarContext';
import { useNavigate } from 'react-router-dom';


export default function PlaceBid({nftdata, onClose }) {

    const { register, handleSubmit } = useForm()
    const { placeBid } =
    useContext(NFTBazzarContext);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const submit = async (data) => {
        console.log("Buy button clicked");
        const bid = data.price
    console.log("bid", bid);
    console.log(
      "tru or fsl",
      bid && bid > nftdata?.highestBid && bid > nftdata?.price
    );

    if (bid && bid > nftdata?.highestBid && bid > nftdata?.price) {
      
        console.log("placeBid called");
        //   socketConnection.emit("placeBid", {
        //     tokenId,
        //     bidAmount: bid
        //   });
        // }
        try {
          setLoader(true);
          const nftDataaa = {
            tokenId: nftdata.tokenId,
            bidAmount: bid, // Ensure price is a string
          };
          console.log("Attempting to bid NFT with data:", nftDataaa);
          await placeBid(nftdata.tokenId, nftDataaa.bidAmount);
          console.log("NFT purchase completed");
          setLoader(false);
          navigate("/");
          alert("bid successfully");
        } catch (error) {
          console.error("Error in biding NFT:", error);
          setLoader(false);
        }
      } else if (bid > nftData?.highestBid || bid > nftData?.minBid) {
        alert(
          "Please enter a valid bid and make sure it is greater than the current highest bid and the minimum bid"
        );
      }
    
      }

  return (
    <motion.div 
      className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex items-center justify-center z-20'
    //   variants={backdropVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className='bg-white p-6 m-1 rounded-lg w-full max-w-sm relative py-10 shadow-lg'
        // variants={modalVariant}
      >
        <RxCross2 onClick={onClose} className='absolute h-6 w-6 right-2 top-2 cursor-pointer hover:text-red-600' />
        <h2 className='text-center font-semibold text-xl mb-4 text-gray-700'>Place Bid</h2>

        <div className='flex flex-col bg-gray-200 p-4 rounded-md overflow-hidden'>
        
          {/* Forms with AnimatePresence */}
          <div className="relative h-36 mt-5">
            <AnimatePresence mode="wait">
                <motion.form 
                  key="onSaleForm" 
                  onSubmit={handleSubmit(submit)} 
                  className='absolute w-full grid gap-2' 
                //   variants={formVariant} 
                  initial="hidden" 
                  animate="visible" 
                  exit="exit"
                >
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="price" className="text-gray-600">Bid amount</label>
                    <input 
                      type="text" 
                      name="price" 
                      id="price" 
                      {...register("price")} 
                      required 
                      placeholder='Enter your bid amount' 
                      className='bg-gray-100 rounded-md px-2 py-1 border focus:outline-none focus:border-blue-500' 
                    />
                  </div>
                  <button 
                    type='submit' 
                    className='bg-blue-400 hover:bg-blue-500 rounded-md text-lg h-8 mt-5 font-semibold text-white transition-colors duration-300'
                    
                  >
                    {loader ? "Loading" : 'Place Bid'}
                  </button>
                </motion.form>
              

              
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
