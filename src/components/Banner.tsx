import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

const ASIAN_CUP_URL =
  "https://asiancup2023.qa/en?utm_source=GSEA&utm_medium=GOO&utm_campaign=AFC_PLA_KO_MDSDH_GOO_GSEA_AFC_RSA_Mix_AFCTIX_3P_DI-X-EN&gad_source=1&gclid=EAIaIQobChMIqZem8N7UgwMVQyV7Bx3PygsCEAAYASAAEgJZE_D_BwE";

const YOUTUBE_URL = `https://www.youtube.com/watch?v=r2zAyxG480c`;
const INSTAGRAM_URL = `https://www.instagram.com/hidoofc_hyuk/`;

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    lazyLoad: "progressive",
    appendDots: (dots) => (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: "10px",
          bottom: "10px",
          width: "200px",
          height: "50px",
          borderRadius: "10px",
        }}
      >
        <ul style={{ display: "flex", gap: "25px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "30px",
          color: i === currentSlide ? "tomato" : "white",
          border: "1px solid",
          display: "flex",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        {i + 1}
      </div>
    ),
  };
  return (
    <Slider
      afterChange={handleSlideChange}
      className=" h-72 rounded-lg relative"
      {...settings}
    >
      <a href={ASIAN_CUP_URL} target="_blank" rel="noopener noreferrer">
        <div className="bg-son w-full h-72 bg-contain bg-center rounded-lg relative">
          <div className="flex justify-center items-center text-white absolute bottom-0 top-0 left-3 my-auto sm:text-sm sm:w-1/2 lg:text-lg lg:w-1/3 xl:text-2xl  xl:w-1/5 ">
            아시안컵 일정 보러가기
          </div>
        </div>
      </a>

      <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
        <div className="bg-gamst w-full h-72 bg-contain bg-center rounded-lg relative">
          <div className="flex justify-center items-center text-white absolute bottom-0 top-0 left-3 my-auto sm:text-sm sm:w-1/2 lg:text-lg lg:w-1/3 xl:text-2xl  xl:w-1/5">
            감스트 리액션 보러가기
          </div>
        </div>
      </a>

      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
        <div className="bg-tackle w-full h-72 bg-contain bg-center rounded-lg relative">
          <div className="flex justify-center items-center text-white absolute bottom-0 top-0 left-3 my-auto sm:text-sm sm:w-1/2 lg:text-lg lg:w-1/3 xl:text-2xl  xl:w-1/5">
            풋살장 보러가기
          </div>
        </div>
      </a>
    </Slider>
  );
};

export default Banner;
