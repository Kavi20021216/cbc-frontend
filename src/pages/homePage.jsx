// import HomePageImageSlider from "../components/homePageImageSlider";

// export default function HomePage() {
//   return (
//     <div className="p-4">
     
//       <HomePageImageSlider />

//       {/* Additional content for the home page */}
//       <div className="mt-6">
//         <p className="text-2xl text-blue-500">Welcome to the Home Page!</p>
//         <p className="text-lg text-gray-700">
//           This is where you can find the latest updates and features.
//         </p>
//       </div>
//     </div>
//   );
// }

import HomePageImageSlider from "../components/homePageImageSlider";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col p-4 sm:p-6 md:p-10">
      <HomePageImageSlider />

      {/* Additional content for the home page */}
      <div className="mt-6 text-center px-2 sm:px-4">
        <p className="text-xl sm:text-2xl text-blue-500 font-semibold">
          Welcome to the Home Page!
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mt-2">
          This is where you can find the latest updates and features.
        </p>
      </div>
    </div>
  );
}
