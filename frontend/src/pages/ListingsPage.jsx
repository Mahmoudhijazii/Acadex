import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Use `useNavigate` for navigation
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newListing, setNewListing] = useState({ title: '', price: '', description: '' });
  const { search, userRole } = useContext(ShopContext); // Assuming user role is stored in context
  const navigate = useNavigate(); // Use navigate hook

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('https://student-x.onrender.com/api/listings/listings');
        setListings(response.data);
      } catch (err) {
        setError('Failed to fetch listings');
      }
    };

    fetchListings();
  }, []);

  const handleCardClick = (id) => {
    // Navigate to the item details page when the card is clicked
    navigate(`/listing/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://student-x.onrender.com/api/listings/${id}`);
      setListings(listings.filter(listing => listing.id !== id));
    } catch (err) {
      setError('Failed to delete listing');
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleCreateListing = async () => {
    try {
      const response = await axios.post('https://student-x.onrender.com/api/listings/listings', newListing);
      setListings([...listings, response.data]);
      setShowModal(false); // Close the modal
      setNewListing({ title: '', price: '', description: '' }); // Reset form
    } catch (err) {
      setError('Failed to create listing');
    }
  };

  const handleInputChange = (e) => {
    setNewListing({ ...newListing, [e.target.name]: e.target.value });
  };

  const filteredListings = listings.filter((listing) =>
    listing.title?.toLowerCase().includes(search?.toLowerCase() || '') ||
    listing.users?.name?.toLowerCase().includes(search?.toLowerCase() || '')
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Available Listings</h1>
      {error && <p className="text-red-600">{error}</p>}

      {/* Button to open modal for posting a new listing */}
      <button 
        className="bg-blue-500 text-white p-2 rounded-lg mb-6"
        onClick={handleModalToggle}>
        Post New Listing
      </button>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => handleCardClick(listing.id)} // Navigate to item detail page
          >
            <h2 className="text-xl font-semibold">{listing.title}</h2>
            <p className="text-gray-600 mt-2">${listing.price}</p>

            {/* Contact Seller Button */}
            <button className="bg-green-500 text-white p-2 rounded-lg mt-4">Contact Seller</button>

            {/* Delete Button (only for admin users) */}
            {userRole === 'admin' && (
              <button
                className="bg-red-500 text-white p-2 rounded-lg mt-4"
                onClick={(e) => { e.stopPropagation(); handleDelete(listing.id); }}
              >
                Delete Listing
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Posting a New Listing */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Post a New Listing</h2>
            <input
              type="text"
              name="title"
              value={newListing.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="number"
              name="price"
              value={newListing.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full p-2 mb-4 border rounded"
            />
            <textarea
              name="description"
              value={newListing.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-lg w-full"
              onClick={handleCreateListing}
            >
              Create Listing
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded-lg w-full mt-4"
              onClick={handleModalToggle}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;
