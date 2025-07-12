import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate('/booking');
  };

  return (
    <section className="bg-[#5E7263] w-full py-8 md:py-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
        <div className="md:w-1/2 w-full flex flex-col gap-2 md:gap-4 py-4 md:py-0">
          <h1 className="text-3xl md:text-4xl font-bold text-[#D9A900] leading-tight">Little Lemon</h1>
          <h2 className="text-lg md:text-xl font-semibold text-white">Chicago</h2>
          <p className="text-white text-sm md:text-base mt-2 max-w-xs">
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </p>
          <button
            onClick={handleReserveClick}
            className="mt-4 w-max bg-[#FFD600] hover:bg-yellow-400 text-black font-semibold py-2 px-5 rounded transition-colors duration-200 text-sm md:text-base"
          >
            Reserve a Table
          </button>
        </div>
        <div className="md:w-1/2 w-full flex justify-center md:justify-end mt-6 md:mt-0">
          <img
            src={"../icons/restauranfood.jpg"}
            alt="Restaurant food"
            className="rounded-lg w-64 h-64 object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
