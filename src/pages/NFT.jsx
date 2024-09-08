import React, { useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container } from "../components"; // Assume Button is removed temporarily for testing
import fig from "../assets/working/3759390.jpg";
import { NFTBazzarContext } from "../../Context/NFTBazzarContext";

function NFT() {
  const { tokenId } = useParams();
  const location = useLocation();
  const { Name, Creator, Price, Image, description } = location.state || {};
  const { buyNFT, currentAccount } = useContext(NFTBazzarContext);

  useEffect(() => {
    console.log("Component mounted. CurrentAccount:", currentAccount);
    console.log("NFT Data:", {
      tokenId,
      Name,
      Creator,
      Price,
      Image,
      description,
    });
  }, [currentAccount, tokenId, Name, Creator, Price, Image, description]);

  const handleBuyNFT = async () => {
    console.log("Buy button clicked");
    try {
      const nftData = {
        tokenId: tokenId,
        price: Price.toString(), // Ensure price is a string
      };
      console.log("Attempting to buy NFT with data:", nftData);
      await buyNFT(nftData);
      console.log("NFT purchase completed");
    } catch (error) {
      console.error("Error buying NFT:", error);
    }
  };

  return (
    <div>
      <section className="text-slate-100 dark:text-slate-950 dark:bg-white">
        <Container>
          <div className="flex items-center flex-col md:flex-row">
            <img
              src={Image || fig}
              alt={Name}
              className="mt-4 mb-4 h-[600px] w-[600px] rounded-xl"
            />
            <div className="md:m-10 flex flex-col items-center gap-6">
              <div className="gap-4 flex flex-col">
                <h1 className="font-semibold">Creator: {Creator}</h1>
                <h1 className="text-4xl font-bold">{Name}</h1>
                <h1 className="text-xm font-bold">Price: {Price} ETH</h1>
                <p className="text-xm font-light">
                  Description for {Name} - {description}
                </p>
                <p>Token ID: {tokenId}</p>

                {currentAccount.toLowerCase() !== Creator.toLowerCase() && (
                  <button
                    className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7"
                    onClick={handleBuyNFT}
                  >
                    Buy Now
                  </button>
                )}

                {currentAccount.toLowerCase() === Creator.toLowerCase() && (
                  <div className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                    You Cannot Buy
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default NFT;
