import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CoursesPage = () => {

  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try{
        const response =  await axios.get('http://localhost:3001/api/courses/posts');
        setCourses(response.data);
      } catch(err){
        setError('Failed to fetch courses');
      }
    }
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3001/api/courses/posts', 
        { courseName, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Response:', response.data); // Debugging log
  
      // Ensure user data is included
      const newCourse = {
        ...response.data,
        User: response.data.User || { name: 'Unknown' }, // Fallback if User is missing
      };
  
      setCourses([...courses, newCourse]); // Update UI immediately
      setCourseName('');
      setDescription('');
      setSuccess('Course posted successfully!');
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error posting course:', err.response?.data || err.message);
      setError('Failed to post course');
    }
  };
  

  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student-X Courses</h1>
        <button
          className="bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Add a Course
        </button>
      </div>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold">{course.course_name}</h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <p className="text-gray-500 mt-2">Posted by: {course.User ? course.User.name : 'Unknown'}</p>
            <button className="mt-4 bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded-lg">
              Contact Tutor
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
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
