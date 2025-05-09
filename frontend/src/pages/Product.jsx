// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Product = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const res = await axios.get(`https://student-x.onrender.com/api/listings/${id}`);
//         setListing(res.data);
//         setCurrentIndex(0);
//       } catch (err) {
//         setError("Failed to load product details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const checkAdmin = () => {
//       const role = localStorage.getItem("role");
//       setIsAdmin(role === "admin");
//     };

//     fetchListing();
//     checkAdmin();
//   }, [id]);

//   const handleDelete = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       await axios.delete(`https://student-x.onrender.com/api/admin/listings/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       navigate("/collection");
//     } catch (err) {
//       setError("Failed to delete listing.");
//     }
//   };

//   if (loading) return <h2>Loading...</h2>;
//   if (error || !listing) return <h2>{error || "Product not found"}</h2>;

//   const images = listing.image_urls || [];

//   return (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/* Product Content */}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/* Images */}
//         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
//             {images.map((img, index) => (
//               <img
//                 onClick={() => setCurrentIndex(index)}
//                 src={img}
//                 key={index}
//                 className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
//                   currentIndex === index ? "border-2 border-black" : ""
//                 }`}
//                 alt={`Thumbnail ${index + 1}`}
//               />
//             ))}
//           </div>
//           <div className="w-full h-80 sm:h-auto">
//             {images.length > 0 ? (
//               <img
//                 src={images[currentIndex]}
//                 alt="Product"
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             ) : (
//               <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
//                 No Images Available
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Info */}
//         <div className="flex-1">
//           <h1 className="font-medium text-2xl mt-2">{listing.title}</h1>
//           <p className="mt-2 text-lg text-gray-700">
//             <strong>Price:</strong> ${listing.price}
//           </p>
//           <p className="mt-2 text-lg text-gray-700">
//             <strong>Description:</strong> {listing.description}
//           </p>
//           <p className="mt-2 text-lg text-gray-700">
//             <strong>Seller:</strong> {listing.users?.name || "Unknown"}
//           </p>
          
//           {isAdmin && (
//             <button
//               onClick={handleDelete}
//               className="ml-4 bg-red-600 text-white px-8 py-3 text-sm active:bg-red-700"
//             >
//               DELETE
//             </button>
//           )}
//           <hr className="mt-8 sm:w-4/5" />
//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>Sold by your University students.</p>
//           </div>
//         </div>
//       </div>

//       {/* Additional Info (if needed) */}
//       {/* {listing.dimensions && (
//         <div className="mt-20">
//           <div className="flex">
//             <b className="border px-5 py-3 text-sm">Dimensions</b>
//           </div>
//           <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
//             <p>{listing.dimensions}</p>
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default Product;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`https://student-x.onrender.com/api/listings/${id}`);
        setListing(res.data);
        setCurrentIndex(0);
      } catch (err) {
        setError("Oops! We couldn't load the product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const checkAdmin = () => {
      const role = localStorage.getItem("role");
      setIsAdmin(role === "admin");
    };

    fetchListing();
    checkAdmin();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://student-x.onrender.com/api/admin/listings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/collection");
    } catch (err) {
      setError("Failed to delete this product. Please try again.");
    }
  };

  if (loading) return <h2 className="text-center text-gray-600 text-lg mt-10">Loading product details...</h2>;

  if (error || !listing) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-red-600 font-semibold text-xl mb-2">
          {error || "Sorry, we couldn't find the product you're looking for."}
        </h2>
        <button
          onClick={() => navigate("/collection")}
          className="mt-3 flex items-center gap-1 text-blue-600 hover:underline"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Back to Collection</span>
        </button>
      </div>
    );
  }

  const images = listing.image_urls || [];

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/collection")}
        className="flex items-center gap-1 text-gray-700 hover:text-black transition ml-2 mb-6"
      >
        <ChevronLeftIcon className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Collection</span>
      </button>

      {/* Product Content */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Images */}
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
                alt="Product"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                No Images Available
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{listing.title}</h1>
          <p className="mt-2 text-lg text-gray-700">
            <strong>Price:</strong> ${listing.price}
          </p>
          <p className="mt-2 text-lg text-gray-700">
            <strong>Description:</strong> {listing.description}
          </p>
          <p className="mt-2 text-lg text-gray-700">
            <strong>Seller:</strong> {listing.users?.name || "Unknown"}
          </p>

          <div className="flex items-center gap-4 mt-6">
            <a
              href={`/chatpage?seller=${listing.user_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black hover:bg-gray-800 transition-all duration-300 text-white py-2 px-4 rounded-lg"
            >
              Contact Seller
            </a>

            {isAdmin && (
              <button
               onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
              >
                Delete
              </button>
            )}
          </div>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Sold by your University students.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

