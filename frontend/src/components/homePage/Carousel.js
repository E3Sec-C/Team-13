import React from "react";
import { Carousel } from "react-responsive-carousel";

const CarouselComponent = () => {

  const onChange = ()=>{
    console.log("onChange");
  }

  return (
    <Carousel
      showArrows={true}
      onChange={onChange}
    >
      <div>
        <img src="/carousel1.jpg" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="/carousel2.jpg" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="/carousel3.jpg" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
