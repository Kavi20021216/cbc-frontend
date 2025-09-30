// // src/components/HomePageImageSlider.jsx
// import { useState, useEffect } from "react";
// import Header from "./header";

// export default function HomePageImageSlider() {
//   const images = [
//     "/slider1.png",
//     "/slider2.png",
//     "/slider3.png",
//     "/slider4.png",
//   ];

//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   // Auto-slide every 5 seconds for testing (change to 180000 for 3 min)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div className="w-full flex flex-col">
//       {/* Header */}
//       <Header />

//       {/* Slider container */}
//       <div className="w-full max-w-7xl mx-auto mt-4">
//         <img
//           src={images[activeImageIndex]}
//           className="w-full h-[500px] md:h-[600px] object-contain rounded-lg "
//           alt={`Slide ${activeImageIndex + 1}`}
//         />
//       </div>
//     </div>
//   );
// }



// src/components/HomePageImageSlider.jsx
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; // Import arrows
import Header from "./header";

export default function HomePageImageSlider() {
  const images = [
    "/slider1.png",
    "/slider2.png",
    "/slider3.png",
    "/slider4.png",
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Auto-slide every 5 seconds (for testing)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Functions for manual navigation
  const prevSlide = () => {
    setActiveImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <Header />

      {/* Slider container */}
      <div className="w-full max-w-7xl mx-auto mt-4 relative">
        {/* Slider Image */}
        <img
          src={images[activeImageIndex]}
          className="w-full h-[500px] md:h-[600px] object-contain rounded-lg"
          alt={`Slide ${activeImageIndex + 1}`}
        />

        {/* Left Arrow */}
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-black/70"
          onClick={prevSlide}
        >
          <IoIosArrowBack size={30} />
        </button>

        {/* Right Arrow */}
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-black/70"
          onClick={nextSlide}
        >
          <IoIosArrowForward size={30} />
        </button>
      </div>
    </div>
  );
}
