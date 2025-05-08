import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import { ShopContext } from '../context/ShopContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { search } = useContext(ShopContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://student-x.onrender.com/api/courses/posts');
        setCourses(response.data);
      } catch (err) {
        // setError('Failed to fetch courses');
        toast.error('Failed to fetch courses');
      }
    };

    const checkAdmin = () => {
      const role = localStorage.getItem('role'); // Retrieve role from localStorage
      setIsAdmin(role === 'admin'); // Set isAdmin based on role
    };

    fetchCourses();
    checkAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://student-x.onrender.com/api/courses/posts',
        { courseName, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCourse = {
        ...response.data,
        User: response.data.User || { name: 'Unknown' },
      };

      setCourses([...courses, newCourse]);
      setCourseName('');
      setDescription('');
      // setSuccess('Course posted successfully!');
      // setTimeout(() => {
      //   setSuccess(null);
      // }, 3000);
      toast.success('Course posted successfully!');
    } catch (err) {
      // console.error('Error posting course:', err.response?.data || err.message);
      // setError('Failed to post course');
      toast.error('Failed to post course');
    }
  };

  const handleDelete = async (courseId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://student-x.onrender.com/api/admin/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses((prev) => prev.filter((course) => course.id !== courseId));
    } catch (err) {
      // console.error('Failed to delete course:', err.response?.data || err.message);
      // alert('Failed to delete course');
      toast.error('Failed to delete course');
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.course_name?.toLowerCase().includes(search?.toLowerCase() || '') ||
    course.users?.name?.toLowerCase().includes(search?.toLowerCase() || '')
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <p className="text-gray-600 text-lg mt-2">
        These course listings are created by students who are offering to tutor others. You can reach out to them by clicking the <strong>"Contact Tutor"</strong> button. If you feel confident teaching a course, you’re welcome to share your own by clicking <strong>"Add a Course"</strong>.
      </p>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student-X Courses</h1>
        <button
          className="bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Add a Course
        </button>
      </div>

      {/* {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>} */}
      <ToastContainer />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold">{course.course_name}</h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <p className="text-gray-500 mt-2">Posted by: {course.users ? course.users.name : 'Unknown'}</p>

            <div className="flex gap-2 mt-4">
              {/* <button className="bg-black hover:bg-gray-800 transition-all duration-300 text-white py-2 px-4 rounded-lg">
                Contact Tutor
              </button> */}
              <a
                  href={`/chatpage?tutor=${course.user_id}`} // Pass the course's tutor ID in the URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-gray-800 transition-all duration-300 text-white py-2 px-4 rounded-lg"
                >
                  <p>Contact Tutor</p>
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
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
              <textarea
                placeholder="Course Description"
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
