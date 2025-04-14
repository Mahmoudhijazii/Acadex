import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DormCard from '../components/DormCard';


const Dorm = () => {
  const navigate = useNavigate();

  const [dorm, setDorm] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState('');
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
        const dorm = await axios.get('http://localhost:3001/api/dorms/posts');
        setDorm(dorm.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch dorms');
      }
    };

    const checkAdmin = () => {
      const role = localStorage.getItem('role');
      if(role==='admin')
      setIsAdmin(true);
      if(role==='user')
      setIsAdmin(false);
    };

    fetchDorms();
    checkAdmin();
  }, []);

  const handleDelete = async (dormId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3001/api/admin/dorms/delete/${dormId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setDorm((prev) => prev.filter((d) => d.id !== dormId));
    } catch (err) {
      console.error('Failed to delete dorm:', err);
      alert('Failed to delete dorm');
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3001/api/admin/dorms/add',
        { title, description, location, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDorm([...dorm, response.data]);
      // setImage('');
      setTitle('');
      setLocation('');
      setPrice('');
      setDescription('');
      setSuccess('Dorm added successfully!');
      setTimeout(() => setSuccess(null), 3000);
      setIsModalOpen(false);
    } catch (err) {
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
          // image={dormItem.images && dormItem.images.length > 0 ? dormItem.images[0] : 'default-image-url'}
          title={dormItem.title}
          location={dormItem.location}
          price={dormItem.price}
          onClick={() => navigate(`/dorms/${dormItem.id}`)}
          isAdmin={isAdmin}
          onDelete={() => handleDelete(dormItem.id)}
        />
      ))}


      </div>

      {/* Modal for adding a dorm */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Upload a Dorm</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Image URL"
                className="w-full p-2 mb-4 border rounded"
                value={image}
                onChange={(e) => setImage(e.target.value)}
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

export default Dorm;
