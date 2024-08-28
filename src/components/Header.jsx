import React, { useContext, useEffect, useState } from "react";
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
import logo from "../assets/header/logo1.svg";

import { NFTBazzarContext } from "../../Context/NFTBazzarContext";
function Header() {
  const [navTog, setNavTog] = useState(false);
  const [exp, setExp] = useState(false);
  const [auc, setAuc] = useState(false);
  const [coll, setColl] = useState(false);
  const [cre, setCre] = useState(false);
  useEffect(() => console.log(navTog), [navTog]);

  const { connectWallet, currentAccount } = useContext(NFTBazzarContext);

  return (
    <header className=" bg-slate-900 dark:bg-white text-white sticky top-0 z-[40] md:mx-auto md:flex md:w-full md:items-center md:justify-between    ">
      <Container>
        <motion.div
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          {/* laptop nav */}
          <nav className=" hidden md:flex md:items-center justify-between ">
            <div className=" flex md:items-center md:gap-12">
              <Link to="/">
                <h1 className="  text-4xl font-logofont">
                  <span className=" bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient ">
                    NFT
                  </span>{" "}
                  <span className=" text-white dark:text-black">BAZZAR</span>
                </h1>
              </Link>

              <ul className=" dark:text-black md:flex md:gap-12 z-[-1] md:z-auto md:static w-full md:w-auto md:py-0 md:pl-0 transition-all ease-in   ">
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
                 {currentAccount ? (
    <NavLink to='create-nft' onClick={() => setNavTog(false)}>
      <li
        className={`after:block after:h-[2px] after:mt-1 after:duration-300 after:transition-all after:ease-in ${cre ? "after:w-full" : "after:w-0"} hover:after:w-full after:bg-[length:200%_auto] after:animate-gradient after:bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.blue.500),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.blue.500),theme(colors.indigo.400))] m-4 md:my-5 font-semibold cursor-pointer`}
      >
        Create
      </li>
    </NavLink>
  ) : null}
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <img
                  src={wallet}
                  alt=""
                  className="md:hidden h-[40px] w-[40px]"
                />
                {currentAccount ? (
                  <Link to="profile">
                    <button
                      onClick={() => setNavTog(false)}
                      className="font-semibold"
                    >
                      Profile
                    </button>
                  </Link>
                ) : (
                  <button onClick={connectWallet} className="font-semibold">
                    Connect Wallet
                  </button>
                )}
              </div>
              <ThemeToggle />
            </div>
          </nav>
          {/* mobile nav */}
          <nav className="flex md:hidden items-center justify-between">
            <Link to="/" onClick={() => setNavTog(false)}>
              <img src={logo} className=" h-[40px] w-[40px]"></img>
            </Link>
            <span
              onClick={() => (!navTog ? setNavTog(true) : setNavTog(false))}
              className=" cursor-pointer md:hidden block mx-2"
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
            <ThemeToggle />
          </nav>
        </motion.div>
      </Container>
      <ul
        className={`md:hidden text-white  text-xl z-50  bg-slate-900 ${
          navTog ? "fixed" : "hidden"
        } h-full w-full `}
      >
        <Link to="explore" onClick={() => setNavTog(false)}>
          <li className="flex items-center justify-between mx-4 py-5 md:my-5 font-semibold">
            Explore <img src={Rarrow} alt="" className=" h-8" />
          </li>
        </Link>
        <Link to="collections" onClick={() => setNavTog(false)}>
          <li className="flex items-center justify-between mx-4 py-5 md:my-5 font-semibold">
            Collections <img src={Rarrow} alt="" className=" h-8" />
          </li>
        </Link>
        <Link to="auction" onClick={() => setNavTog(false)}>
          <li className="flex items-center justify-between mx-4 py-5 md:my-5 font-semibold">
            Auction <img src={Rarrow} alt="" className=" h-8" />
          </li>
        </Link>
        <Link to="create-nft" onClick={() => setNavTog(false)}>
          <li className="flex items-center justify-between mx-4 py-5 md:my-5 font-semibold">
            Create <img src={Rarrow} alt="" className=" h-8" />
          </li>
        </Link>
        <Link to="profile" onClick={() => setNavTog(false)}>
          <li className="flex items-center justify-between mx-4 py-5 md:my-5 font-semibold">
            Profile <img src={Rarrow} alt="" className=" h-8" />
          </li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
