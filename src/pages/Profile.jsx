import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { Container, MainImgAni,Collectioncard,Trycard,Trendcard, Button} from "../components";
import eig from "../assets/working/4999653.jpg"
import fig from "../assets/working/3759390.jpg"
import asa from "../assets/card/c.jpg"
import bsa from "../assets/card/hh.jpg"
import csa from "../assets/card/d.jpg"
import dsa from "../assets/card/ee.jpg"
import esa from "../assets/card/f.jpg"
import fsa from "../assets/card/g.jpg"
import NFTCategoryToggle from '../components/Profile';
import { NFTBazzarContext } from '../../Context/NFTBazzarContext';

function Profile() {

    // const location = useLocation();
    // const { account } = location.state || {};
    const {checkWalletConnected,currentAccount} = useContext(NFTBazzarContext);
    useEffect(() => {
      if (checkWalletConnected) {
        checkWalletConnected();
      }
      else{
        console.log("No Know");
      }
    }, []);

    const categories = ['OnSale', 'Owned', 'Created','Collection','Activity'];
  
  const nfts = [
    { id: 1, name: 'NFT 1', image: asa, description: 'Description for NFT 1', category: 'OnSale' },
    { id: 2, name: 'NFT 2', image: bsa, description: 'Description for NFT 2', category: 'Owned' },
    { id: 3, name: 'NFT 3', image: csa, description: 'Description for NFT 3', category: 'Created' },
    { id: 4, name: 'NFT 3', image: dsa, description: 'Description for NFT 3', category: 'Collection' },
    { id: 5, name: 'NFT 3', image: esa, description: 'Description for NFT 3', category: 'Activity' },
    // Add more NFT objects here
  ];

    
  return (
    <main>
        <div  className=" min-h-screen dark:bg-white text-white bg-black dark:text-black ">
            
            {/* Profile Picture Details */}
            <section className=" h-[100vh]  ">
                    <div >
                    <img src={asa} alt="" className='w-full h-[300px] object-cover rounded-lg shadow-lg filter ' />
                    </div>
                <Container >
                
                    <div className='flex  justify-center items-center'>
                    <img src={bsa} alt="" className='w-[150px] h-[150px] object-cover filter -mt-[75px] border-4 z-10'  />
                    </div>
                    <div className=' flex justify-center items-center flex-col gap-3'>
                        <h1 className=' font-bold  text-4xl mt-4  '>Dhruv Shah</h1>
                        <div className='h-[30px] w-[430px] rounded-full bg-transparent border bg-white flex justify-center items-center dark:border-slate-900 dark:border-2'>
                            <h1 className=' text-black dark:text-slate-700 font-semibold'>{currentAccount ? `${currentAccount}` : "No account connected"}</h1></div>
                        <h1 className='font-thin text-xl text-center dark:font-normal'>I make art with the simple goal of giving <br/> you something pleasing to look at for a few seconds.</h1>    
                        <h1 className='
                         text-[#a8a7a7] font-medium dark:text-slate-800'>
                            Joined December 2021
                        </h1>

                    </div>
                </Container>
            </section>


            {/* profile Items */}
            {/* <section className=" h-[100vh] bg-slate-800 dark:bg-slate-50">
                <Container>
               <div>
                <ul className=' mb-12 flex items-center justify-center overflow-x-auto overflow-y-hidden border-b border-cyan-500 pb-px dark:border-cyan-600 md:justify-center'>
                    <li>
                        <button className=' relative flex items-center whitespace-nowrap py-3 px-6 text-cyan-100 hover:text-cyan-400 dark:text-slate-800 font-bold text-lg dark:hover:text-cyan-400'
                        // onClick={() => handleCategoryClick(category)}
                        >On Sale</button>
                    </li>
                    <li>
                        <button className=' relative flex items-center whitespace-nowrap py-3 px-6 text-cyan-100 hover:text-cyan-400 dark:text-slate-800  font-bold text-lg dark:hover:text-cyan-400'>Owned</button>
                    </li>
                    <li>
                        <button className=' relative flex items-center whitespace-nowrap py-3 px-6 text-cyan-100 hover:text-cyan-400 dark:text-slate-800  font-bold text-lg dark:hover:text-cyan-400'>Created</button>
                    </li>
                    <li>
                        <button className=' relative flex items-center whitespace-nowrap py-3 px-6 text-cyan-100 hover:text-cyan-400 dark:text-slate-800  font-bold text-lg dark:hover:text-cyan-400'>Collections</button>
                    </li>
                    <li>
                        <button className=' relative flex items-center whitespace-nowrap py-3 px-6 text-cyan-100 hover:text-cyan-400 dark:text-slate-800  font-bold text-lg dark:hover:text-cyan-400'>Activity</button>
                    </li>
                </ul>
               </div>

               
                </Container>
            </section> */}
       
                <div>
            
                <NFTCategoryToggle  categories={categories} nfts={nfts} />
                   
               </div>
       
       
       
        </div>
    </main>
  )
}

export default Profile