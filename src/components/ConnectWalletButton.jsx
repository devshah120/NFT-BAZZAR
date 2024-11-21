import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userService from "../dataGathering/userData";
import {login as authLogin, setToken} from "../store/authSlice"
import { IoWalletOutline } from "react-icons/io5";
const ConnectWalletButton = () => {
  
  const dispatch = useDispatch()
    const navigate = useNavigate();
  
    const connectWallet = async () => {
  
      if (typeof window.ethereum !== "undefined") {
        // MetaMask detected
        try {
          // Request account access
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
    
          console.log("Connected account:", accounts[0]);
    
          // Login logic with backend
          const session = await userService.login({ MetaHash: accounts[0] });
          console.log("Session data:", session.data.checkuser);
    
          if (session.status === 200) {
            const userData = session.data.checkuser[0];
            const RefreshToken = session.data.RefreshToken;
    
            dispatch(setToken(RefreshToken));
            dispatch(authLogin({ userData }));
            navigate("/profile");
          } else if (session.status === 204) {
            navigate("/register", { state: { account: accounts[0] } });
          }
    
          alert(`Connected account: ${accounts[0]}`);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
          alert(`Error connecting to MetaMask: ${error.message}`);
        }
      } else if (navigator.userAgent.toLowerCase().includes("android")) {
        // MetaMask not detected, attempt to open the MetaMask app via deep link
        alert("MetaMask not detected in your browser. Opening MetaMask app...");
        window.open("https://metamask.app.link/dapp/https://nft-bazzar.vercel.app/", "_blank");
      } else {
        // MetaMask not detected on other platforms
        if (confirm("MetaMask is not detected. Would you like to install it?")) {
          window.open("https://metamask.io/download.html", "_blank", "noopener noreferrer");
        }
      }
    };
  
  const user = useSelector((state) => state.auth)
  useEffect(() => {
    console.log("user changed" ,user);
    
  },[user])
  
  
  return (
    <div className="flex items-center">
      {user.userData ? (<Link to="/profile">
        <img src={user.userData.MainImage_URL} alt="" className=" h-10 w-10  border-2 rounded-full object-fill" />
      </Link>):
      (<button
        className=" h-10 w-10  items-center flex justify-center"
        onClick={connectWallet}
      >
        <IoWalletOutline className=" h-7 w-7 dark:text-black " />
      </button>)}
    </div>
  );
};
// const ConnectWalletButton = () => {
//   const [account, setAccount] = useState(null);
//   const navigate = useNavigate();

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         setAccount(accounts[0]);
//         console.log("Connected account:", accounts[0]);
//         navigate("/profile", { state: { account: accounts[0] } }); // Redirect to profile page with state
//       } catch (error) {
//         console.error("Error connecting to MetaMask:", error);
//       }
//     } else {
//       console.error("MetaMask not detected");
//     }
//   };

//   return (
//     <div>
//       <button
//         className="hidden md:block font-extrabold"
//         onClick={connectWallet}
//       >
//         {account ? "Profile" : "Connect Wallet"}
//       </button>
//     </div>
//   );
// };
// export const connectWallet = async () => {
//   if (window.ethereum) {
//     try {
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       console.log(accounts[0]);

//       const session = await userService.login({MetaHash: accounts[0]})
//       console.log(session.data.checkuser);
//         if (session.status == 200) {
//           const userData = session.data.checkuser[0]
//           const RefreshToken = session.data.RefreshToken
//             dispatch(setToken(RefreshToken))
//             dispatch(authLogin({userData}));
//             navigate("/profile");
//           } else if (session.status == 204) {
//             navigate("/register", {state: { account: accounts[0] }})
//           } 
//       alert("Connected account:", accounts[0]);
//       // navigate("/profile", { state: { account: accounts[0] } }); // Redirect to profile page with state
//     } catch (error) {
//       console.log("error:", error);
      
//       alert("Error connecting to MetaMask:", error);
//     }
//   } else {
//     // alert("MetaMask not detected");
//     if (confirm("MetaMask is not detected. Would you like to install it?")) {
//       window.open("https://metamask.io/download.html", "_blank", "noopener noreferrer");
//     }
//   }
// };
export const connectWallet = async () => {
  
  if (typeof window.ethereum !== "undefined") {
    // MetaMask detected
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected account:", accounts[0]);

      // Login logic with backend
      const session = await userService.login({ MetaHash: accounts[0] });
      console.log("Session data:", session.data.checkuser);

      if (session.status === 200) {
        const userData = session.data.checkuser[0];
        const RefreshToken = session.data.RefreshToken;

        dispatch(setToken(RefreshToken));
        dispatch(authLogin({ userData }));
        navigate("/profile");
      } else if (session.status === 204) {
        navigate("/register", { state: { account: accounts[0] } });
      }

      alert(`Connected account: ${accounts[0]}`);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert(`Error connecting to MetaMask: ${error.message}`);
    }
  } else if (navigator.userAgent.toLowerCase().includes("android")) {
    // MetaMask not detected, attempt to open the MetaMask app via deep link
    alert("MetaMask not detected in your browser. Opening MetaMask app...");
    window.open("https://metamask.app.link/dapp/https://nft-bazzar.vercel.app/", "_blank");
  } else {
    // MetaMask not detected on other platforms
    if (confirm("MetaMask is not detected. Would you like to install it?")) {
      window.open("https://metamask.io/download.html", "_blank", "noopener noreferrer");
    }
  }
};

export default ConnectWalletButton;
