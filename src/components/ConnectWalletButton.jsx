import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userService from "../dataGathering/userData";
import {login as authLogin, setToken} from "../store/authSlice"
import { IoWalletOutline } from "react-icons/io5";

const ConnectWalletButton = () => {

  
  const dispatch = useDispatch()
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth)
  useEffect(() => {
    console.log("user changed" ,user);
    
  },[user])
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts[0]);

        const session = await userService.login({MetaHash: accounts[0]})
        console.log(session.data.checkuser);
          if (session.status == 200) {
            const userData = session.data.checkuser[0]
            const RefreshToken = session.data.RefreshToken
              dispatch(setToken(RefreshToken))
              dispatch(authLogin({userData}));
              navigate("/profile");
            } else if (session.status == 204) {
              navigate("/register", {state: { account: accounts[0] }})
            } 
        alert("Connected account:", accounts[0]);
        // navigate("/profile", { state: { account: accounts[0] } }); // Redirect to profile page with state
      } catch (error) {
        console.log("error:", error);
        
        alert("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected");
    }
  };
  
  return (
    <div className="flex items-center">
      {user.userData ? (<Link to="/profile">
        <img src={user.userData.MainImage_URL} alt="" className=" h-10 w-10  border-2 rounded-full object-fill" />
      </Link>):
      (<button
        className=" h-10 w-10  items-center flex justify-center"
        onClick={connectWallet}
      >
        <IoWalletOutline className=" h-7 w-7 " />
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

export default ConnectWalletButton;
