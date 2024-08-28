import React from "react";
import aimg from "../../assets/card/dd.png";
import Button from "../Button";
function Bidcard() {
  return (
    <div className=" bg-[#28F0CC]/[0.15] overflow-hidden  relative flex justify-center items-center w-64 border-[3.5px] group/main h-80 rounded-2xl border-[#28F0CC] ">
      <img
        src={aimg}
        alt=""
        className=" w-full scale-100 group-hover/main:scale-125 duration-300  h-full object-cover rounded-lg"
      />

{/* group-hover/main:bg-gradient-to-t group-hover/main:from-[#000000f7] group-hover/main:via-[#000d] group-hover/main:to-transparent */}

      <div className="w-full h-full group-hover/main:bg-gradient-to-t group-hover/main:from-[#000000f7] group-hover/main:via-[#000d] group-hover/main:to-transparent group-hover/main:top-0 group-hover/main:pt-24 ease duration-500 absolute top-[80%]">
        <div className=" text-left flex flex-col rounded-md group ">
          <div className=" flex flex-col items-center text-center text-white">
            <div className=" pb-4 w-full bg-gradient-to-t from-[#000000b1] via-[#000000a4]  to-transparent group-hover/main:bg-none ">
              <h6 className=" text-[#28F0CC] text-lg opacity-0 group-hover/main:opacity-100 font-logofont">
                Dhruv Shah
              </h6>
              <h4 className="  text-xl cursor-default font-logofont tracking-wider">
                Monkey
              </h4>
            </div>
            <div className=" w-full border border-[#dadada]"></div>
            <div className="w-full ">
              <div className="   text-left flex justify-between px-3  bg-[#ffffff00] rounded-md group border-[#ffffff] m-3">
                <div className=" text-stone-300">
                  <h1>Price</h1>
                  <h1 className=" text-white font-bold">1.2 ETH</h1>
                </div>
                <div className="  text-stone-300">
                  <h1>Highest Bid</h1>
                  <h1 className=" text-white font-bold">8.5 ETH</h1>
                </div>
              </div>
            </div>
            <div className=" w-full mb-4 border border-white"></div>
            <Button>
              Place Bid
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bidcard;
