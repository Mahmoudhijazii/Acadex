const courses = [
  "DSA",
  "Programming 1",
  "Programming 2",
  "Programming 3",
  "Web Development",
  "OS",
  "Game Development",
  "Data Science",
];

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student-X Courses</h1>
        <button className="bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded-lg">
          Add a Course
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold">{course}</h2>
            <p className="text-gray-600 mt-2">Learn {course} from the top Students.</p>
            <button className="mt-4 bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded-lg">
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
