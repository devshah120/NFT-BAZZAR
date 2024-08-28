import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConnectWalletButton = () => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log("Connected account:", accounts[0]);
        navigate("/profile", { state: { account: accounts[0] } }); // Redirect to profile page with state
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask not detected");
    }
  };

  return (
    <div>
      <button
        className="hidden md:block font-extrabold"
        onClick={connectWallet}
      >
        {account ? "Profile" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWalletButton;
