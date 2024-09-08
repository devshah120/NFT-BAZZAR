import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Button } from "../components";
import fig from "../assets/working/3759390.jpg";

function NFT() {
  const { tokenId } = useParams();
  const location = useLocation();
  const { Name, Creator, Price, Image, description } = location.state || {};

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
                <Button className="md:w-[400px] w-[200px] md:h-[50px] font-bold text-xl mb-7">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default NFT;