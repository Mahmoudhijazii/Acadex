// import React, { useEffect, useState } from "react";
// import { assets } from '../assets/assets';
// import axios from "axios";
// import supabase from "../supabaseClient";

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [activeTab, setActiveTab] = useState("courses"); // Tabs: 'courses' | 'listings'
//     const [editing, setEditing] = useState(false);
//     const [newName, setNewName] = useState("");
//     const [newBio, setNewBio] = useState("");
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     setError("No token found. Please log in.");
//                     return;
//                 }

//                 const response = await axios.get("https://student-x.onrender.com/api/users/profile", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 console.log("User Data:", response.data);
//                 setUser(response.data);
//                 setNewName(response.data.name);
//                 setNewBio(response.data.bio);
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//                 setError("Failed to load profile.");
//             }
//         };

//         fetchProfile();
//     }, []);

//     const handleUpdateProfile = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             await axios.put("https://student-x.onrender.com/api/users/profile/update", 
//                 { name: newName, bio: newBio }, 
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             setSuccess("Profile updated successfully!");
//             setEditing(false);
//             setTimeout(() => setSuccess(null), 3000);
//             window.location.reload();
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             setError("Failed to update profile.");
//         }
//     };

//     const handleProfilePictureUpload = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;
    
//         const fileExt = file.name.split('.').pop();
//         const fileName = `${Date.now()}.${fileExt}`;
//         const filePath = `profile-pictures/${fileName}`;
    
//         try {
//             // Step 1: Upload image to Supabase Storage
//             const { data, error } = await supabase.storage
//                 .from('images') // 👈 replace with your Supabase bucket name
//                 .upload(filePath, file);
    
//             if (error) throw error;
    
//             // Step 2: Get the public URL
//             const { data: publicUrlData } = supabase
//                 .storage
//                 .from('images')
//                 .getPublicUrl(filePath);
    
//             const publicUrl = publicUrlData.publicUrl;
    
//             // Step 3: Send to your backend to update user profile picture
//             const token = localStorage.getItem("token");
    
//             await axios.put("https://student-x.onrender.com/api/users/profile/picture",
//                 { profile_picture: publicUrl },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
    
//             // Step 4: Update frontend state
//             setUser((prevUser) => ({ ...prevUser, profile_picture: publicUrl }));
    
//         } catch (err) {
//             console.error("Upload error:", err.message);
//             setError("Failed to upload profile picture.");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
//             {error && <p className="text-red-600">{error}</p>}
//             {success && <p className="text-green-600">{success}</p>}

//             {user ? (
//                 <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//                     <div className="flex flex-col items-center">
//                         <img 
//                             src= {user?.profile_picture || assets.defaultPic}
//                             alt="Profile" 
//                             className="w-32 h-32 rounded-full onject-cover shadow-lg mb-4"
//                         />
//                         <input type="file" onChange={handleProfilePictureUpload} className="mt-2" />
//                         <h2 className="text-2xl font-semibold">{editing ? 
//                             <input className="border p-2 rounded" value={newName} onChange={e => setNewName(e.target.value)} /> 
//                             : user.name}
//                         </h2>
//                         <p className="text-gray-600">{user.email}</p>
//                         {editing ? 
//                             <textarea className="border p-2 rounded w-full mt-2" value={newBio} onChange={e => setNewBio(e.target.value)} /> 
//                             : <p className="mt-2 text-gray-700">{user.bio || "No bio added."}</p>
//                         }
//                         <div className="mt-4">
//                             {editing ? (
//                                 <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={handleUpdateProfile}>
//                                     Save
//                                 </button>
//                             ) : (
//                                 <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800" onClick={() => setEditing(true)}>
//                                     Edit Profile
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     <div className="mt-6 border-t pt-4">
//                         <div className="flex justify-around mb-4">
//                             <button 
//                                 className={`px-4 py-2 rounded-lg ${activeTab === "courses" ? "bg-black text-white" : "bg-gray-300 text-gray-700"}`} 
//                                 onClick={() => setActiveTab("courses")}
//                             >
//                                 My Courses
//                             </button>
//                             <button 
//                                 className={`px-4 py-2 rounded-lg ${activeTab === "listings" ? "bg-black text-white" : "bg-gray-300 text-gray-700"}`} 
//                                 onClick={() => setActiveTab("listings")}
//                             >
//                                 My Listings
//                             </button>
//                         </div>

//                         {activeTab === "courses" ? (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                                 {user?.tutor_courses?.map(course => (
//                                     <div key={course.course_name} className="bg-gray-100 p-4 rounded-lg shadow">
//                                         <p className="font-semibold">{course.course_name}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                                 {user?.listings?.map(item => (
//                                     <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow">
//                                         <p className="font-semibold">{item.title}</p>
//                                         <p className="text-gray-600">${item.price}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-500">Loading...</p>
//             )}
//         </div>
//     );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { assets } from '../assets/assets';
import axios from "axios";
import supabase from "../supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("courses");
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [newBio, setNewBio] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("No token found. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("https://student-x.onrender.com/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
                setNewName(response.data.name);
                setNewBio(response.data.bio);
            } catch (error) {
                console.error("Error fetching profile:", error);
                toast.error("Failed to load profile.");
            } finally {
                setLoading(false);
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

            toast.success("Profile updated successfully!");
            setEditing(false);
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        }
    };

    const handleProfilePictureUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `profile-pictures/${fileName}`;

        try {
            const { data, error } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (error) throw error;

            const { data: publicUrlData } = supabase
                .storage
                .from('images')
                .getPublicUrl(filePath);

            const publicUrl = publicUrlData.publicUrl;

            const token = localStorage.getItem("token");

            await axios.put("https://student-x.onrender.com/api/users/profile/picture",
                { profile_picture: publicUrl },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUser((prevUser) => ({ ...prevUser, profile_picture: publicUrl }));
            toast.success("Profile picture updated!");
        } catch (err) {
            console.error("Upload error:", err.message);
            toast.error("Failed to upload profile picture.");
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://student-x.onrender.com/api/users/deleteCourse/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Course deleted");
            setUser((prev) => ({
                ...prev,
                tutor_courses: prev.tutor_courses.filter(c => c.id !== courseId),
            }));
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete course");
        }
    };
    
    const handleDeleteListing = async (listingId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://student-x.onrender.com/api/users/deleteListing/${listingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Listing deleted");
            setUser((prev) => ({
                ...prev,
                listings: prev.listings.filter(l => l.id !== listingId),
            }));
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete listing");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
            <ToastContainer position="top-center" />

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : user ? (
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <img 
                            src={user?.profile_picture}
                            alt="Profile" 
                            className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
                        />
                        
                        {/* Styled File Upload */}
                        <label className="mt-2 mb-4">
                            <input 
                                type="file" 
                                className="hidden" 
                                onChange={handleProfilePictureUpload} 
                            />
                            <div className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800 text-center">
                                Edit Profile Picture
                            </div>
                        </label>

                        <h2 className="text-2xl font-semibold">
                            {editing ? 
                                <input className="border p-2 rounded" value={newName} onChange={e => setNewName(e.target.value)} /> 
                                : user.name
                            }
                        </h2>
                        <p className="text-gray-600">{user.email}</p>
                        {editing ? 
                            <textarea className="border p-2 rounded w-full mt-2" value={newBio} onChange={e => setNewBio(e.target.value)} /> 
                            : <p className="mt-2 text-gray-700">{user.bio || "No bio added."}</p>
                        }

                        <div className="mt-4">
                            {editing ? (
                                <button 
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" 
                                    onClick={handleUpdateProfile}
                                >
                                    Save
                                </button>
                            ) : (
                                <button 
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800" 
                                    onClick={() => setEditing(true)}
                                >
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
                                    <div key={course.id} className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{course.course_name}</p>
                                            <p className="text-sm text-gray-600">{course.description}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteCourse(course.id)}
                                            className="text-red-600 hover:underline ml-4"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {user?.listings?.map(item => (
                                    <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{item.title}</p>
                                            <p className="text-gray-600">${item.price}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteListing(item.id)}
                                            className="text-red-600 hover:underline ml-4"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">No user found.</p>
            )}
        </div>
    );
};

export default Profile;
