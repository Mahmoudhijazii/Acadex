import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("courses"); // Tabs: 'courses' | 'listings'
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [newBio, setNewBio] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found. Please log in.");
                    return;
                }

                const response = await axios.get("https://student-x.onrender.com/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("User Data:", response.data);
                setUser(response.data);
                setNewName(response.data.name);
                setNewBio(response.data.bio);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Failed to load profile.");
            }
        };

        fetchProfile();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put("https://student-x.onrender.com/api/users/profile/update", 
                { name: newName, bio: newBio }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess("Profile updated successfully!");
            setEditing(false);
            setTimeout(() => setSuccess(null), 3000);
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile.");
        }
    };

    const handleProfilePictureUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append("profile_picture", file);
    
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put("https://student-x.onrender.com/api/users/profile/update-profile", 
                formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
            );
    
            setUser((prevUser) => ({ ...prevUser, profile_picture: response.data.profile_picture }));
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            setError("Failed to upload profile picture.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            {user ? (
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <img 
                             src={user.profile_picture || "assets/default-profile.png"}
                            alt="Profile" 
                            className="w-32 h-32 rounded-full shadow-lg mb-4"
                        />
                        <input type="file" onChange={handleProfilePictureUpload} className="mt-2" />
                        <h2 className="text-2xl font-semibold">{editing ? 
                            <input className="border p-2 rounded" value={newName} onChange={e => setNewName(e.target.value)} /> 
                            : user.name}
                        </h2>
                        <p className="text-gray-600">{user.email}</p>
                        {editing ? 
                            <textarea className="border p-2 rounded w-full mt-2" value={newBio} onChange={e => setNewBio(e.target.value)} /> 
                            : <p className="mt-2 text-gray-700">{user.bio || "No bio added."}</p>
                        }
                        <div className="mt-4">
                            {editing ? (
                                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={handleUpdateProfile}>
                                    Save
                                </button>
                            ) : (
                                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800" onClick={() => setEditing(true)}>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-around mb-4">
                            <button 
                                className={`px-4 py-2 rounded-lg ${activeTab === "courses" ? "bg-black text-white" : "bg-gray-300 text-gray-700"}`} 
                                onClick={() => setActiveTab("courses")}
                            >
                                My Courses
                            </button>
                            <button 
                                className={`px-4 py-2 rounded-lg ${activeTab === "listings" ? "bg-black text-white" : "bg-gray-300 text-gray-700"}`} 
                                onClick={() => setActiveTab("listings")}
                            >
                                My Listings
                            </button>
                        </div>

                        {activeTab === "courses" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {user?.tutor_courses?.map(course => (
                                    <div key={course.course_name} className="bg-gray-100 p-4 rounded-lg shadow">
                                        <p className="font-semibold">{course.course_name}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {user?.listings?.map(item => (
                                    <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-gray-600">${item.price}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}
        </div>
    );
};

export default Profile;
