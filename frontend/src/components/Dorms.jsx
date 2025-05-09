import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DormCard from '../components/DormCard';
import supabase from "../supabaseClient";
import SearchBar from '../components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from '../context/ShopContext';

// FontAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// add once (move to your app root if you prefer)
library.add(faCircleInfo);

const Dorm = () => {
  const navigate = useNavigate();
  const { search } = useContext(ShopContext);

  const [dorm, setDorm] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPageInfo, setShowPageInfo] = useState(false);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // handlers for the info modal
  const openPageInfo = () => setShowPageInfo(true);
  const closePageInfo = () => setShowPageInfo(false);

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const { data } = await axios.get('https://student-x.onrender.com/api/dorms/posts');
        setDorm(data);
      } catch {
        toast.error('Failed to fetch dorms');
      }
    };

    fetchDorms();
    setIsAdmin(localStorage.getItem('role') === 'admin');
  }, []);

  const handleDelete = async dormId => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://student-x.onrender.com/api/admin/dorms/delete/${dormId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDorm(prev => prev.filter(d => d.id !== dormId));
    } catch {
      toast.error('Failed to delete dorm');
    }
  };

  const uploadImagesToSupabase = async () => {
    const urls = [];
    for (const file of images) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('images')
        .upload(`dorm-images/${fileName}`, file);
      if (error) throw error;
      const publicUrl = supabase.storage
        .from('images')
        .getPublicUrl(`dorm-images/${fileName}`)
        .data.publicUrl;
      urls.push(publicUrl);
    }
    return urls;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (images.length < 2 || images.length > 3) {
      toast.error('Please upload between 2 and 3 images.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const uploadedUrls = await uploadImagesToSupabase();
      const { data } = await axios.post(
        'https://student-x.onrender.com/api/admin/dorms/add',
        { title, description, location, price, image_urls: uploadedUrls },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDorm(prev => [...prev, { ...data, image_urls: uploadedUrls }]);
      setTitle('');
      setLocation('');
      setPrice('');
      setDescription('');
      setImages([]);
      toast.success('Dorm added successfully!');
      setIsModalOpen(false);
    } catch {
      toast.error('Failed to add dorm');
    }
  };

  // filter by location OR price substring
  const filteredDorms = dorm.filter(d =>
    d.location.toLowerCase().includes(search.toLowerCase()) ||
    d.price.toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8 relative">
      {/* Page Info Modal */}
      {showPageInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h2 className="text-2xl font-semibold mb-4">About This Page</h2>
            <p className="text-gray-700 mb-4 text-lg">
            <p className="text-gray-700 mb-6 text-lg">
              Find the best dorms near campus all in one place.<br/>
              Have questions or need more details? Click <strong>Contact Admin</strong> to get full info on any dorm.
            </p>

            </p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={closePageInfo}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">Find Your Perfect Dorm</h1>
          <FontAwesomeIcon
            icon={faCircleInfo}
            bounce
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={openPageInfo}
          />
        </div>
        {isAdmin && (
          <button
            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Upload a Dorm
          </button>
        )}
      </div>


      <ToastContainer />

      {/* Dorm Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDorms.map((dormItem, idx) => (
          <DormCard
            key={idx}
            image={dormItem.image_urls?.[0]}
            title={dormItem.title}
            location={dormItem.location}
            price={dormItem.price}
            onClick={() => navigate(`/dorms/${dormItem.id}`)}
            isAdmin={isAdmin}
            onDelete={() => handleDelete(dormItem.id)}
          />
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Upload a Dorm</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                multiple
                className="w-full p-2 mb-4 border rounded"
                onChange={e => setImages([...e.target.files])}
                required
              />
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 mb-4 border rounded"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 mb-4 border rounded"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price per month"
                className="w-full p-2 mb-4 border rounded"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 mb-4 border rounded"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dorm;
