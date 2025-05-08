// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const DormInfo = () => {
//   const { id } = useParams();
//   const [dorm, setDorm] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const fetchDorm = async () => {
//       try {
//         const response = await axios.get(`https://student-x.onrender.com/api/dorms/${id}`);
//         setDorm(response.data);
//         setCurrentIndex(0);
//       } catch (err) {
//         setError("Failed to load dorm details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDorm();
//   }, [id]);

//   if (loading) return <h2>Loading...</h2>;
//   if (error || !dorm) return <h2>{error || "Dorm not found"}</h2>;

//   const images = dorm.image_urls || [];

//     return (
//         <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//         {/* Dorm Data */}
//         <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//             {/* Dorm Images */}
//             <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//             <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
//                 {images.map((img, index) => (
//                 <img
//                     onClick={() => setCurrentIndex(index)}
//                     src={img}
//                     key={index}
//                     className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${currentIndex === index ? "border-2 border-black" : ""}`}
//                     alt={`Thumbnail ${index + 1}`}
//                 />
//                 ))}
//             </div>
//             <div className="w-full h-80 sm:h-auto">
//                 {images.length > 0 ? (
//                 <img
//                     src={images[currentIndex]}
//                     alt="Dorm"
//                     className="w-full h-full object-cover rounded-lg"
//                 />
//                 ) : (
//                 <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
//                     No Images Available
//                 </div>
//                 )}
//             </div>
//             </div>
    
//             {/* Dorm Info */}
//             <div className="flex-1">
//             <h1 className="font-medium text-2xl mt-2">{dorm.title}</h1>
//             <p className="mt-2 text-lg text-gray-700">
//                 <strong>Location:</strong> {dorm.location}
//             </p>
//             <p className="mt-2 text-lg text-gray-700">
//                 <strong>Price:</strong> ${dorm.price} / month
//             </p>
//             <p className="mt-2 text-lg text-gray-700">
//                 <strong>Description:</strong> {dorm.description}
//             </p>
            
//             </div>
//         </div>
    
//         </div>
//     );
    
// }  

// export default DormInfo;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const DormInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dorm, setDorm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDorm = async () => {
      try {
        const response = await axios.get(`https://student-x.onrender.com/api/dorms/${id}`);
        setDorm(response.data);
        setCurrentIndex(0);
      } catch (err) {
        setError("Oops! We couldn't load the dorm details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDorm();
  }, [id]);

  if (loading) {
    return <h2 className="text-center text-gray-600 text-lg mt-10">Loading dorm details...</h2>;
  }

  if (error || !dorm) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-red-600 font-semibold text-xl mb-2">
          {error || "Sorry, we couldn't find the dorm you're looking for."}
        </h2>
        <button
          onClick={() => navigate("/dorms")}
          className="mt-3 flex items-center gap-1 text-blue-600 hover:underline"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Back to Dorms</span>
        </button>
      </div>
    );
  }

  const images = dorm.image_urls || [];

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dorms")}
        className="flex items-center gap-1 text-gray-700 hover:text-black transition ml-2 mb-6"
      >
        <ChevronLeftIcon className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Dorms</span>
      </button>

      {/* Dorm Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Dorm Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {images.map((img, index) => (
              <img
                onClick={() => setCurrentIndex(index)}
                src={img}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                  currentIndex === index ? "border-2 border-black" : ""
                }`}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full h-80 sm:h-auto">
            {images.length > 0 ? (
              <img
                src={images[currentIndex]}
                alt="Dorm"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                No Images Available
              </div>
            )}
          </div>
        </div>

        {/* Dorm Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{dorm.title}</h1>
          <p className="mt-2 text-lg text-gray-700">
            <strong>Location:</strong> {dorm.location}
          </p>
          <p className="mt-2 text-lg text-gray-700">
            <strong>Price:</strong> ${dorm.price} / month
          </p>
          <p className="mt-2 text-lg text-gray-700">
            <strong>Description:</strong> {dorm.description}
          </p>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>This dorm listing was added by a student.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DormInfo;
