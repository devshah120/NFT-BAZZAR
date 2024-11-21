import React, { useEffect, useState,useRef } from "react";
import Container from "./Container";
import Button from "./Button";
import ConnectWalletButton from "./ConnectWalletButton";
import { motion, useInView, useAnimation } from "framer-motion";
import ThemeToggle from "./Animation/ThemeToggle";
import asa from "../assets/card/85.jpg";
import wallet from "../assets/header/connectwallet.svg";
import tmenu from "../assets/header/menu.svg";
import tclose from "../assets/header/close.svg";
import Rarrow from "../assets/header/right-arrow.svg";
import { Link, NavLink } from "react-router-dom";
import { connectWallet } from "./ConnectWalletButton";
function Header() {
  const [navTog, setNavTog] = useState(false);
  const [exp, setExp] = useState(false);
  const [auc, setAuc] = useState(false);
  const [coll, setColl] = useState(false);
  const [cre, setCre] = useState(false);
  const myRef = useRef(null)
  const mainControl = useAnimation();


  return (
    <header className=" bg-[#0c0c0ce6] dark:bg-[#fffffff0] text-white sticky top-0 z-[30] md:mx-auto md:flex md:w-full md:items-center md:justify-between    ">
      <Container>
        <motion.div
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          {/* laptop nav */}
          <nav className=" hidden md:flex md:items-center justify-between ">
            <div className=" flex md:items-center md:gap-8">
              <Link to="/">
                <h1 className="  text-4xl font-logofont">
                  <span className=" bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient ">
                    NFT
                  </span>{" "}
                  <span className=" text-white dark:text-black">BAZZAR</span>
                </h1>
              </Link>

              <ul className=" dark:text-black md:flex z-[-1] md:z-auto md:static w-full md:w-auto md:py-0 md:pl-0 transition-all ease-in   ">
                <NavLink
                  to="explore"
                  className={({ isActive }) =>
                    `${isActive ? setExp(true) : setExp(false)}`
                  }
                >
                  <li
                    className={`after:block after:h-[2px] after:mt-1 after:duration-300 after:transition-all after:ease-in ${
                      exp ? "after:w-full" : "after:w-0"
                    } hover:after:w-full after:bg-[length:200%_auto] after:animate-gradient after:bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] m-4 md:my-5 font-semibold cursor-pointer`}
                  >
                    Explore
                  </li>
                </NavLink>
                <NavLink
                  to="collections"
                  className={({ isActive }) =>
                    `${isActive ? setColl(true) : setColl(false)}`
                  }
                >
                  <li
                    className={`after:block after:h-[2px] after:mt-1 after:duration-300 after:transition-all after:ease-in ${
                      coll ? "after:w-full" : "after:w-0"
                    } hover:after:w-full after:bg-[length:200%_auto] after:animate-gradient after:bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] m-4 md:my-5 font-semibold cursor-pointer`}
                  >
                    Collections
                  </li>
                </NavLink>
                <NavLink
                  to="auction"
                  className={({ isActive }) =>
                    `${isActive ? setAuc(true) : setAuc(false)}`
                  }
                >
                  <li
                    className={`after:block after:h-[2px] after:mt-1 after:duration-300 after:transition-all after:ease-in ${
                      auc ? "after:w-full" : "after:w-0"
                    } hover:after:w-full after:bg-[length:200%_auto] after:animate-gradient after:bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] m-4 md:my-5 font-semibold cursor-pointer`}
                  >
                    Auction
                  </li>
                </NavLink>
                <NavLink
                  to="create-nft"
                  className={({ isActive }) =>
                    `${isActive ? setCre(true) : setCre(false)}`
                  }
                >
                  <li
                    className={`after:block after:h-[2px] after:mt-1 after:duration-300 after:transition-all after:ease-in ${
                      cre ? "after:w-full" : "after:w-0"
                    } hover:after:w-full after:bg-[length:200%_auto] after:animate-gradient after:bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] m-4 md:my-5 font-semibold cursor-pointer`}
                  >
                    Create
                  </li>
                </NavLink>
              </ul>
            </div>
            <div className=" flex items-center gap-2">
              <div>
                <img
                  src={wallet}
                  alt=""
                  className="md:hidden h-[40px] w-[40px]"
                />
                <ConnectWalletButton />
              </div>
              <ThemeToggle></ThemeToggle>
            </div>
          </nav>
          {/* mobile nav */}
          <nav className="flex md:hidden items-center justify-between">
            <Link to="/">
              <h1 className="  text-4xl font-logofont">
                <span className=" bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient ">
                  NFT
                </span>{" "}
                <span className=" text-white dark:text-black">BAZZAR</span>
              </h1>
            </Link>
            {/* <Link to='/' onClick={() => setNavTog(false)}><img src={logo} className=' h-[40px] w-[40px]'></img></Link> */}
            <div className="flex">
              <ConnectWalletButton />
              <ThemeToggle />
              <span
                onClick={() => {
                  if (!navTog) {
                    setNavTog(true);
                    if (typeof window !== "undefined" && window.document) {
                      console.log(document.body.style.overflow);
                      document.body.style.overflow = "hidden";
                      console.log(document.body.style.overflow);
                    }
                  } else {
                    setNavTog(false);
                    if (typeof window !== "undefined" && window.document) {
                      console.log(document.body.style.overflow);
                      document.body.style.overflow = "";
                      console.log(document.body.style.overflow);
                    }
                  }
                }}
                className=" cursor-pointer md:hidden block my-auto mx-2"
              >
                {" "}
                <img
                  src={navTog ? tclose : tmenu}
                  alt=""
                  className={`${
                    navTog ? "h-[46px] w-[36px] -p-[6px]" : "h-[30px] w-[30px]"
                  }`}
                />
              </span>
            </div>
          </nav>
        </motion.div>
      </Container>
      <ul
        className={`md:hidden text-white  text-xl z-50  bg-black dark:bg-white dark:text-black ${
          navTog ? "fixed" : "hidden"
        } h-full w-full `}
      >
        <motion.div
                        ref={myRef}
                        variants={{
                          hiddden: { opacity: 0, x: 100 },
                          visiible: { opacity: 1, x: 0 },
                        }}
                        initial="hiddden"
                        animate={mainControl}
                        transition={{ duration: 0.5,delay: 0.5 }}
                        whileInView ="visiible"
                      >
        <Link to="explore" onClick={() => setNavTog(false)}>
          <li className="flex items-center justify-between mx-4 py-5 md:my-5 font-semibold">
            Explore <img src={Rarrow} alt="" className=" h-8" />
          </li>
        </Link>
        </motion.div>
        <motion.div
                        ref={myRef}
                        variants={{
                          hiddden: { opacity: 0, x: 100 },
                          visiible: { opacity: 1, x: 0 },
                        }}
                        initial="hiddden"
                        animate={mainControl}
                        transition={{ duration: 0.5,delay: 0.75}}
                        whileInView ="visiible"
                      >
        <Link to="collections" onClick={() => setNavTog(false)}>
          <li className="flex items-center justify-between mx-4 py-5 md:my-5 font-semibold">
            Collections <img src={Rarrow} alt="" className=" h-8" />
          </li>
        </Link>
        </motion.div>
        <motion.div
                        ref={myRef}
                        variants={{
                          hiddden: { opacity: 0, x: 100 },
                          visiible: { opacity: 1, x: 0 },
                        }}
                        initial="hiddden"
                        animate={mainControl}
                        transition={{ duration: 0.5,delay: 1 }}
                        whileInView ="visiible"
                      >
        <Link to="auction" onClick={() => setNavTog(false)}>
          <li className="flex items-center justify-between mx-4 py-5 md:my-5 font-semibold">
            Auction <img src={Rarrow} alt="" className=" h-8" />
          </li>
        </Link>
        </motion.div>
        <motion.div
                        ref={myRef}
                        variants={{
                          hiddden: { opacity: 0, x: 100 },
                          visiible: { opacity: 1, x: 0 },
                        }}
                        initial="hiddden"
                        animate={mainControl}
                        transition={{ duration: 0.5,delay: 1.25 }}
                        whileInView ="visiible"
                      >
        <Link to="create-nft" onClick={() => setNavTog(false)}>
          <li className="flex items-center justify-between mx-4 py-5 md:my-5 font-semibold">
            Create <img src={Rarrow} alt="" className=" h-8" />
          </li>
        </Link>
        </motion.div>
        <motion.div
                        ref={myRef}
                        variants={{
                          hiddden: { opacity: 0, x: 100 },
                          visiible: { opacity: 1, x: 0 },
                        }}
                        initial="hiddden"
                        animate={mainControl}
                        transition={{ duration: 0.5,delay: 1.5 }}
                        whileInView ="visiible"
                      >
        <Link to="profile" onClick={() => setNavTog(false)}>
          <li className="flex items-center justify-between mx-4 py-5 md:my-5 font-semibold">
            Profile <img src={Rarrow} alt="" className=" h-8" />
          </li>
        </Link>
        </motion.div>
      </ul>
    </header>
  );
}

export default Header;
