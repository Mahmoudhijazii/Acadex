import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DormInfo = () => {
  const { id } = useParams();
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
        setError("Failed to load dorm details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDorm();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error || !dorm) return <h2>{error || "Dorm not found"}</h2>;

  const images = dorm.image_urls || [];

    return (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
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
                    className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${currentIndex === index ? "border-2 border-black" : ""}`}
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
            <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mt-5">
                ADD TO FAVOURITES
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>Sold by your University students.</p>
                <p>Cash in person or via whish.</p>
                <p>Easy return and exchange policy within 7 days.</p>
            </div>
            </div>
        </div>
    
        {/* Additional Information */}
        <div className="mt-20">
            <div className="flex">
            <b className="border px-5 py-3 text-sm">Dimensions</b>
            </div>
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>{dorm.dimensions}</p>
            </div>
        </div>
        </div>
    );
    
}  

export default DormInfo;
