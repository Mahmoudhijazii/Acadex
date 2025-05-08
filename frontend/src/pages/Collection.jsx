import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import supabase from "../supabaseClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Collection = () => {
  const [listings, setListings] = useState([]);
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newListing, setNewListing] = useState({ title: '', price: '', description: '', image_urls: [] });
  const [images, setImages] = useState([]); // NEW
  const [isAdmin, setIsAdmin] = useState(false);

  const { search } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('https://student-x.onrender.com/api/listings/listings');
        setListings(response.data);
      } catch (err) {
        // setError('Failed to fetch listings');
        toast.error('Failed to fetch listings');
      }
    };

    const checkAdmin = () => {
      const role = localStorage.getItem('role');
      setIsAdmin(role === 'admin');
    };

    fetchListings();
    checkAdmin();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://student-x.onrender.com/api/admin/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings((prev) => prev.filter((listing) => listing.id !== id));
    } catch (err) {
      // setError('Failed to delete listing');
      toast.error('Failed to delete listing');
    }
  };

  const uploadImagesToSupabase = async () => {
    const urls = [];
  
    for (const file of images) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`collection-images/${fileName}`, file);
  
      if (error) throw error;
  
      const publicUrl = supabase.storage
        .from('images')
        .getPublicUrl(`collection-images/${fileName}`).data.publicUrl;
      urls.push(publicUrl);
    }
  
    return urls;
  };  

  const handleCreateListing = async (e) => {
    e.preventDefault();
  
    if (images.length < 2 || images.length > 3) {
      // setError('Please upload between 2 and 3 images.');
      toast.error('Please upload between 2 and 3 images.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const uploadedUrls = await uploadImagesToSupabase();
  
      const response = await axios.post(
        'https://student-x.onrender.com/api/listings/listings',
        {
          ...newListing,
          image_urls: uploadedUrls,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const newItem = {
        ...response.data,
        image_urls: uploadedUrls,
      };
  
      setListings([...listings, newItem]);
      setNewListing({
        name: '',
        description: '',
        price: '',
        location: '',
        image_urls: [],
      });
      setImages([]);
      // setSuccess('Listing added successfully!');
      // setTimeout(() => setSuccess(null), 3000);
      toast.success('Listing added successfully!');
      setShowModal(false);
    } catch (err) {
      console.error(err);
      // setError('Failed to add listing');
      toast.error('Failed to add listing');
    }
  };
  

  const handleInputChange = (e) => {
    setNewListing({ ...newListing, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const filteredListings = listings.filter((listing) =>
    listing.title?.toLowerCase().includes(search?.toLowerCase() || '') ||
    listing.users?.name?.toLowerCase().includes(search?.toLowerCase() || '')
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <p className="text-gray-700 mb-6 text-lg">
        Browse through items posted for sale by fellow students at your university. From books and gadgets to fashion and more, these listings are shared by your peers. Want to get in touch with a seller? Just click on the <strong>Contact Seller</strong> button. Have something to sell yourself? Hit the <strong>Add an Item</strong> button and share your listing with the community!
      </p>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student-X Listings</h1>
        <button
          className="bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Add an Item
        </button>
      </div>

      {/* {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>} */}
      <ToastContainer />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => handleCardClick(listing.id)}
          >
            {listing.image_urls?.length > 0 && (
              <img
                src={listing.image_urls[0]}
                alt="Listing"
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-xl font-semibold">{listing.title}</h2>
            <p className="text-gray-600 mt-2">${listing.price}</p>
            <p className="text-gray-500 mt-2">Seller: {listing.users?.name || 'Unknown'}</p>

            <div className="flex gap-2 mt-4">
              {/* <button className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg">
                Contact Seller
              </button> */}
              <a
                  href={`/chatpage?seller=${listing.user_id}`} // Pass the losting's seller ID in the URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-gray-800 transition-all duration-300 text-white py-2 px-4 rounded-lg"
                >
                  <p>Contact Seller</p>
              </a>
              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(listing.id);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Post a New Listing</h2>
            <form onSubmit={handleCreateListing}>
              <input
                type="text"
                name="title"
                value={newListing.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={newListing.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                name="description"
                value={newListing.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="file"
                // accept="image/*"
                multiple
                onChange={(e) => setImages(Array.from(e.target.files))}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;