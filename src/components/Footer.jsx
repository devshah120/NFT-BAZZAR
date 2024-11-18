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
        {/* <div className=' w-full border-b-2 border-[#313148] my-5'></div> */}

            <div className='flex flex-col md:flex-row justify-center md:px-10 py-5 rounded-tr-3xl dark:bg-[#ededed] bg-zinc-800 rounded-tl-3xl'>
                <div className=' flex flex-col items-center justify-center md:w-1/2'>
                    <h1 className=' pb-[1px] text-white text-5xl text-center font-logofont dark:text-black mt-4'><span className=' bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient '>NFT</span> BAZZAR</h1>
                    <p className=' text-white sm:mr-[100px] lg:mr-[26px] text-center mt-4 text-base md:text-xl font-light italic dark:text-black'>
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
                
            </div>
                    

        </Container>
    </footer>
  )
}

export default Footer