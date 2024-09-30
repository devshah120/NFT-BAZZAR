import React from 'react'
import Container from './Container'
import { AccountItems } from './menu item/Account'
import { CompanyItems } from './menu item/Company'
import { ExploreItems } from './menu item/Explore'
import { facebook,twit,insta,git } from '../assets/Footer'

function Footer() {
  return (
    <footer className=' '>
        <Container>
        <div className=' w-full border-b-2 border-[#313148] my-5'></div>

            <div className='flex flex-col md:flex-row md:mx-10 '>
                <div className=' flex flex-col items-center md:items-start md:w-1/2'>
                    <h1 className=' pb-[1px] text-white text-5xl  font-logofont dark:text-black mt-4'><span className=' bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient '>NFT</span> BAZZAR</h1>
                    <p className=' text-white sm:mr-[100px] lg:mr-[260px] text-center md:text-left mt-4 text-base md:text-xl font-light italic dark:text-black'>
                        Explore the world of digital art with our NFT Bazaar – where creativity meets blockchain technology.
                    </p>
                    <div className=' mt-4'>
                        <ul className=' flex gap-8'>
                            <li className='bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient'><img src={facebook} alt="facebook" /></li>
                            <li><img src={insta} alt="insta" /></li>
                            <li><img src={git} alt="git" /></li>
                            <li><img src={twit} alt="twit" /></li>
                        </ul>
                    </div>
                </div>
                <div className=' md:w-1/2 flex justify-center items-center'>
                    <div className=' flex justify-center '>
                        <ul className='flex md:gap-16 gap-10 text-slate-400 mt-10 font-bold text-base md:text-xl'>
                            <li>
                            <span className=' text-dark-textPrimary dark:text-light-textPrimary' >Explore</span>
                                <ul className=' mt-4 text-dark-textSecondary dark:text-light-textSecondary font-light'>
                                    {ExploreItems.map((item,index) => (
                                        <li key={index} className='dark:text-black italic mb-2'>{item.title}</li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <span className='text-dark-textPrimary dark:text-light-textPrimary'>Company</span>
                                <ul className=' mt-4 text-dark-textSecondary dark:text-light-textSecondary font-light' >
                                    {CompanyItems.map((item,index) => (
                                        <li key={index} className='dark:text-black italic mb-2'>{item.title}</li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                            <span className=' text-dark-textPrimary dark:text-light-textPrimary'>My Account</span>
                                <ul className=' mt-4 text-dark-textSecondary dark:text-light-textSecondary font-light'>
                                    {AccountItems.map((item,index) => (
                                        <li key={index} className=' dark:text-black italic mb-2'>{item.title}</li>
                                    ))}
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
                    <div className=' w-full border-b-2 border-[#313148] my-5'></div>
            <div className=' flex flex-col md:flex-row md:justify-between pb-5'>
                <h1 className='text-dark-accent text-center md:text-left dark:text-light-accent'>@2024 NFT BAZZAR - Made By Dev Shah & Dhruv Shah</h1>
                <div className=' flex flex-col md:flex-row items-center'>
                    <h1 className=' text-dark-accent dark:text-light-accent mx-4'> Terms And Conditions </h1> 
                    <h1 className=' text-dark-accent dark:text-light-accent'> Privacy Policy </h1>
                </div>
            </div>

        </Container>
    </footer>
  )
}

export default Footer