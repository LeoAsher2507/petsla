import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./HomeBanner.scss";
import Slider from "react-slick";
import { ERouterPath } from "src/navigation/route";

const HomeBanner = () => {
  const slider = useRef(null);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "0px",
    autoplaySpeed: 3000,
    autoplay: true,
    appendDots: (dots: any) => <ul>{dots}</ul>,
    customPaging: () => (
      <div className="slick__dots--custom">
        <div className="dots-center" />
      </div>
    ),
  };

  return (
    <div>
      <div className="home-banner">
        {/* <Slider ref={slider} {...settings}>
          <div className="banner-item">
            <Link to={ERouterPath.PRODUCT_LIST}>
              <img src="./img/banner/banner1.png" alt="" />
            </Link>
          </div>

          <div className="banner-item">
            <Link to={ERouterPath.PRODUCT_LIST}>
              <img src="./img/banner/banner2.png" alt="" />
            </Link>
          </div>
        </Slider> */}

        <div className="banner-item">
          <Link to={ERouterPath.PRODUCT_LIST}>
            <img src="./img/banner/banner2.png" alt="" />
          </Link>
        </div>

        {/* <div className="btn-wrap">
          <button
            className="arrow arrow-prev"
            // onClick={() => slider?.current?.slickPrev()}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="arrow arrow-next"
            // onClick={() => slider?.current?.slickNext()}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default HomeBanner;
