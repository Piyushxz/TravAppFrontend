import React, { useState } from "react";
import { HomeCard } from "./HomeCard";

export const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      link: "https://a0.muscache.com/im/pictures/miso/Hosting-1014506245981978233/original/bb677725-63e2-4aae-befa-a835264011aa.jpeg?im_w=720&im_format=avif",
      title: "Old House, Tennessee",
      rating: 4.3,
    },
    {
      link: "https://a0.muscache.com/im/pictures/miso/Hosting-1152177177875845044/original/c552d1ce-3e75-46e9-9a54-4e201dd3a2bf.jpeg?im_w=720&im_format=avif",
      title: "Home in Favelas, Brazil",
      rating: 4.6,
    },
    {
      link: "https://a0.muscache.com/im/pictures/miso/Hosting-971172991313485288/original/36fc6516-4006-4be4-b8a3-ae865fd42e86.jpeg?im_w=720&im_format=avif",
      title: "Treehouse, Texas",
      rating: 3.9,
    },
    {
      link: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA1MzQ2Mjc0MTk1ODU4Njg2Mw%3D%3D/original/53177020-9817-4078-9cb0-d36702ee60f3.jpeg?im_w=720&im_format=avif",
      title: "Resort, Alabama",
      rating: 5.0,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative w-full max-w-[80vw] mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <HomeCard
              link={slide.link}
              title={slide.title}
              rating={slide.rating}
            />
          </div>
        ))}
      </div>
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        &larr;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        &rarr;
      </button>
    </div>
  );
};
