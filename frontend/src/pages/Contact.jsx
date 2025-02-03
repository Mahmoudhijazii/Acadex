const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center mb-6">Have questions? We'd love to hear from you.</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input 
              type="text" 
              placeholder="Enter your name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea 
              rows="4"
              placeholder="Write your message..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
