// export default function HomePage(){
//     return(
//         <div>
//             <span>Home page</span>
//             <p className="text-2xl text-blue-500">Welcome to the Home Page!</p>
//             <p className="text-lg text-gray-700">This is where you can find the latest updates and features.</p>
//         </div>
//     )
// }

// src/pages/HomePage.jsx

import HomePageImageSlider from "../components/homePageImageSlider";

export default function HomePage() {
  return (
    <div className="p-4">
      {/* Include your existing HomePage component */}
      <HomePageImageSlider />

      {/* Additional content for the home page */}
      <div className="mt-6">
        <p className="text-2xl text-blue-500">Welcome to the Home Page!</p>
        <p className="text-lg text-gray-700">
          This is where you can find the latest updates and features.
        </p>
      </div>
    </div>
  );
}
