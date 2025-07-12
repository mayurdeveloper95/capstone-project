import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate('/booking');
  };

  return (
    <section className="relative bg-[#5E7263] w-full py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
        <div className="md:w-1/2 w-full py-2 md:py-0">
          <h1 className="text-3xl md:text-5xl font-bold text-[#D9A900] leading-tight mb-2">Little Lemon</h1>
          <h2 className="text-lg md:text-2xl font-semibold text-white mb-2 md:mb-4">Chicago</h2>
          <p className="text-white text-sm md:text-lg mt-2 max-w-xs md:max-w-md mb-4">
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </p>
          <button
            onClick={handleReserveClick}
            className="mt-4 w-max bg-[#FFD600] hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded transition-colors duration-200 text-sm md:text-lg shadow-md"
          >
            Reserve a Table
          </button>
        </div>
        <div className="md:w-1/2 w-full flex justify-center md:justify-end mt-8 md:mt-0 relative">
          <div className="static md:absolute md:bottom-[-6rem] md:right-0 md:translate-y-1/3 md:z-10">
            <img
              src={"../icons/restauranfood.jpg"}
              alt="Restaurant food"
              className="rounded-lg w-full h-full md:w-80 md:h-80 object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
