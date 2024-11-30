import React from "react";
import "react-responsive-carousel/lib/styles/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CarouselComponent = () => {

  const onChange = ()=>{
    console.log("onChange");
  }

  return (
    <Carousel
      showArrows={true}
      onChange={onChange}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
    >
      <div>
        <img src="/carousel1.jpg" alt="Carousel"/>
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="/carousel2.jpg" alt="Carousel"/>
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="/carousel3.jpg" alt="Carousel"/>
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
