import React, { useEffect } from "react";
import HerosecSvg from "../assets/Home/herosecsvg.svg"
function MainImgAni() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = document.querySelector(".box");
      let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
      let yAxis = (window.innerHeight / 2 - e.pageY) / 20;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
      <img src={HerosecSvg}  className="box filter drop-shadow-3xl"/>
  );
}

export default MainImgAni;
