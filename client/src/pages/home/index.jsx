import React from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import hero1 from "../../assets/hero1.jpg"
import hero2 from "../../assets/hero2.jpg"


const HomeScreen = () => {
  
  return (
    <div className="flex flex-col w-full items-center bg-blue-gray-500">
      <div>

      <Carousel className=""
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-2 md:bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-4 md:w-8 bg-white" : "w-2 md:w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4 !hidden md:!block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4 !hidden md:!block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
      
      autoplay={true}
      autoplayDelay={5000}
      loop={true}
    >
        <img
          src={hero1}
          alt="hero_discount_1 "
          className="h-40 md:h-52 lg:h-72 xl:h-96 w-full object-cover"
        />
        <img
          src={hero2}
          alt="hero_discount_3"
          className="h-40 md:h-52 lg:h-72 xl:h-96 w-full object-cover"
        />
        <img
          src={hero1}
          alt="hero_discount_2"
          className="h-40 md:h-52 lg:h-72 xl:h-96 w-full object-cover"
        />
      </Carousel>
      </div>
    </div>
  );
};

export default HomeScreen;
