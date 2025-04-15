import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DormCard from '../components/DormCard';
import supabase from "../supabaseClient";

const Dorm = () => {
  const navigate = useNavigate();

  const [dorm, setDorm] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const dorm = await axios.get('https://student-x.onrender.com/api/dorms/posts');
        // Parse image_urls from JSON string to array
        const updatedDorms = dorm.data.map((d) => ({
          ...d,
          image_urls: d.image_urls ,
        }));
        setDorm(updatedDorms);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch dorms');
      }
    };

    const checkAdmin = () => {
      const role = localStorage.getItem('role');
      setIsAdmin(role === 'admin');
    };

    fetchDorms();
    checkAdmin();
  }, []);

  const handleDelete = async (dormId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://student-x.onrender.com/api/admin/dorms/delete/${dormId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDorm((prev) => prev.filter((d) => d.id !== dormId));
    } catch (err) {
      console.error('Failed to delete dorm:', err);
      alert('Failed to delete dorm');
    }
  };

  const uploadImagesToSupabase = async () => {
    const urls = [];

    for (const file of images) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`dorm-images/${fileName}`, file);

      if (error) throw error;

      const publicUrl = supabase.storage.from('images').getPublicUrl(`dorm-images/${fileName}`).data.publicUrl;
      urls.push(publicUrl);
    }

    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 2 || images.length > 3) {
      setError('Please upload between 2 and 3 images.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const uploadedUrls = await uploadImagesToSupabase();

      console.log('Request Payload:', { title, description, location, price, image_urls: uploadedUrls });
      const response = await axios.post(
        'https://student-x.onrender.com/api/admin/dorms/add',
        {
          title,
          description,
          location,
          price,
          image_urls: uploadedUrls,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newDorm = {
        ...response.data,
        image_urls: uploadedUrls,
      };

      setDorm([...dorm, newDorm]);
      setTitle('');
      setLocation('');
      setPrice('');
      setDescription('');
      setImages([]);
      setSuccess('Dorm added successfully!');
      setTimeout(() => setSuccess(null), 3000);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setError('Failed to add dorm');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Find Your Perfect Dorm</h1>
        {isAdmin && (
          <button
            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Upload a Dorm
          </button>
        )}
      </div>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dorm.map((dormItem, index) => (
          <DormCard
            key={index}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Upload a Dorm</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                multiple
                // accept="image/*"
                className="w-full p-2 mb-4 border rounded"
                onChange={(e) => setImages([...e.target.files])}
                required
              />
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 mb-4 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 mb-4 border rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price per month"
                className="w-full p-2 mb-4 border rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 mb-4 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
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
