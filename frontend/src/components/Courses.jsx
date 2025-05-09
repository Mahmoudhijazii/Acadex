import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import { ShopContext } from '../context/ShopContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// FontAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// add once (you could also move this into your App entrypoint)
library.add(faCircleInfo);

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // page-info modal state
  const [showPageInfo, setShowPageInfo] = useState(false);
  const openPageInfo = () => setShowPageInfo(true);
  const closePageInfo = () => setShowPageInfo(false);

  const { search } = useContext(ShopContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('https://student-x.onrender.com/api/courses/posts');
        setCourses(data);
      } catch {
        toast.error('Failed to fetch courses');
      }
    };
    fetchCourses();
    setIsAdmin(localStorage.getItem('role') === 'admin');
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        'https://student-x.onrender.com/api/courses/posts',
        { courseName, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourses(prev => [...prev, data]);
      setCourseName('');
      setDescription('');
      toast.success('Course posted successfully!');
    } catch {
      toast.error('Failed to post course');
    }
  };

  const handleDelete = async id => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://student-x.onrender.com/api/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch {
      toast.error('Failed to delete course');
    }
  };

  const filteredCourses = courses.filter(c =>
    c.course_name?.toLowerCase().includes(search?.toLowerCase() || '') ||
    c.users?.name?.toLowerCase().includes(search?.toLowerCase() || '')
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8 relative">
      {/* Page‐info Modal */}
      {showPageInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h2 className="text-2xl font-semibold mb-4">About This Page</h2>
            <p className="text-gray-600 text-lg mb-4">
              These course listings are created by students who are offering to tutor others.<br/> 
              Learn directly from peers who’ve already taken the course.<br/>
              Want to know exactly what’s covered? Click <strong>Contact Tutor</strong> to connect,  
              or <strong>Add a Course</strong> to share your own.
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

      {/* Top bar: description, title + info icon, Add-Course */}


      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">Student-X Courses</h1>
          <FontAwesomeIcon
            icon={faCircleInfo}
            bounce
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={openPageInfo}
          />
        </div>
        <button
          className="bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Add a Course
        </button>
      </div>

      

      <ToastContainer />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, i) => (
          <div
            key={i}
            className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold">{course.course_name}</h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <p className="text-gray-500 mt-2">
              Posted by: {course.users?.name || 'Unknown'}
            </p>
            <div className="flex gap-2 mt-4">
              <a
                href={`/chatpage?tutor=${course.user_id}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 transition-all duration-300 text-white py-2 px-4 rounded-lg"
              >
                Contact Tutor
              </a>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-2 px-4 rounded-lg"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add-Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Add a Course</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Course Name"
                className="w-full p-2 mb-4 border rounded"
                value={courseName}
                onChange={e => setCourseName(e.target.value)}
                required
              />
              <textarea
                placeholder="Course Description"
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
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
