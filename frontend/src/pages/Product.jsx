import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For fetching the id from the URL

const Product = () => {
  const { id } = useParams(); // Get the listing ID from the URL
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(`https://student-x.onrender.com/api/listings/listings/${id}`);
        setListing(response.data);
      } catch (err) {
        setError('Failed to fetch item details');
      }
    };

    fetchListingDetails();
  }, [id]);

  const handleContactSeller = () => {
    alert('Contacting the seller...');
    // Implement your contact seller logic here (e.g., show a contact form, etc.)
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      {listing ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold">{listing.title}</h2>
          <p className="text-gray-600 mt-2">${listing.price}</p>
          <p className="text-gray-600 mt-4">{listing.description}</p>
          <p className="text-gray-500 mt-2">Posted by: {listing.users?.name || 'Unknown'}</p>

          {/* Contact Seller Button */}
          <button
            className="bg-green-500 text-white p-2 rounded-lg mt-4"
            onClick={handleContactSeller}
          >
            Contact Seller
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Product;
