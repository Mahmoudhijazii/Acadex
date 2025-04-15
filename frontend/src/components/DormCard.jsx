import React from "react";

const DormCard = ({ image, title, location, price, onClick, isAdmin, onDelete }) => {
  return (
    <div onClick={onClick} className="cursor-pointer flex flex-col bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 h-full">
      <div className="flex-grow">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <h2 className="text-lg font-semibold mt-2">{title}</h2>
        <p className="text-gray-600 mt-1">{location}</p>
        <p className="text-gray-800 font-bold mt-2">${price} / month</p>
      </div>
      {isAdmin && (
        <button
          className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-900 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation(); // prevents click event bubbling to parent
            onDelete();
          }}
        >
          DELETE
        </button>
      )}
    </div>
  );
};


export default DormCard;
