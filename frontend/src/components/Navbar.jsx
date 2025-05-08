// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { Link, NavLink } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext'

// const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = "/";
// }

// const handleProfile = () => {
//     window.location.href = "/profile";
// }

// const Navbar = () => {
//   const [visible, setVisible] = useState(false);
//   const {setShowSearch} = useContext(ShopContext);

//   return (
//     <div className='flex items-center justify-between py-5 font-medium'>
//         <Link to = "/">
//         <img src={assets.logo} className='w-24 h-auto' alt="Logo" />
//         </Link>         
//         <ul className='hidden sm:flex gap-5 text-sm text-grey-700'>
//             <NavLink to='/' className='flex flex-col items-center gap-1 '>
//                 <p>HOME</p>
//                 <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//             </NavLink>
//             <NavLink to='/collection' className='flex flex-col items-center gap-1'>
//                 <p>COLLECTION</p>
//                 <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//             </NavLink>
//             <NavLink to='/courses' className='flex flex-col items-center gap-1'>
//                 <p>COURSES</p>
//                 <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//             </NavLink>
//             <NavLink to='/dorms' className='flex flex-col items-center gap-1'>
//                 <p>DORMS</p>
//                 <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//             </NavLink>
//             <NavLink to='/about' className='flex flex-col items-center gap-1'>
//                 <p>ABOUT</p>
//                 <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//             </NavLink>
//             {/* <NavLink to='/chatpage' className='flex flex-col items-center gap-1'>
//                  <p>STUDENT-CHAT</p>
//                  <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//              </NavLink> */}
//             <a
//                 href="/chatpage"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex flex-col items-center gap-1"
//                 >
//                 <p>STUDENT-CHAT</p>
//                 <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//             </a>
//         </ul>
//         <div className='flex items-center gap-6'>
//             <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" />
//             <div className='group relative'>
//                 <Link to = '/login'><img className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile" /> </Link>
//                 <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
//                     <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
//                         <a onClick={handleProfile} className='cursor-pointer hover:text-black'>My Profile</a>
//                         <a onClick={handleLogout} className='cursor-pointer hover:text-black'>Logout</a>
//                     </div>
//                 </div>
//             </div>
//             <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
//         </div>

//         <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
//             <div className='flex flex-col text-gray-600'>
//                 <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
//                     <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
//                     <p>Back</p>
//                 </div>
//                 <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
//                 <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
//                 <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/courses'>COURSES</NavLink>
//                 <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/dorms'>DORMS</NavLink>
//                 <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
//                 <a
//                     href="/chatpage"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex flex-col items-center gap-1"
//                     >
//                     <p>STUDENT-CHAT</p>
//                     <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//                 </a>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Navbar

// import React, { useContext, useState } from 'react';
// import { assets } from '../assets/assets';
// import { Link, NavLink } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { FaRegComments } from 'react-icons/fa'; // Message icon

// const handleLogout = () => {
//   localStorage.removeItem('token');
//   window.location.href = "/";
// };

// const handleProfile = () => {
//   window.location.href = "/profile";
// };

// const Navbar = () => {
//   const [visible, setVisible] = useState(false);
//   const { setShowSearch } = useContext(ShopContext);
//   const token = localStorage.getItem('token'); // check login

//   return (
//     <div className='flex items-center justify-between py-5 font-medium'>
//       <Link to="/">
//         <img src={assets.logo} className='w-24 h-auto' alt="Logo" />
//       </Link>

//       <ul className='hidden sm:flex gap-5 text-sm text-grey-700'>
//         <NavLink to='/' className='flex flex-col items-center gap-1'>
//           <p>HOME</p>
//           <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//         </NavLink>
//         <NavLink to='/collection' className='flex flex-col items-center gap-1'>
//           <p>COLLECTION</p>
//           <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//         </NavLink>
//         <NavLink to='/courses' className='flex flex-col items-center gap-1'>
//           <p>COURSES</p>
//           <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//         </NavLink>
//         <NavLink to='/dorms' className='flex flex-col items-center gap-1'>
//           <p>DORMS</p>
//           <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//         </NavLink>
//         <NavLink to='/about' className='flex flex-col items-center gap-1'>
//           <p>ABOUT</p>
//           <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//         </NavLink>
//         <a
//           href="/chatpage"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex flex-col items-center gap-1"
//         >
//           <p>STUDENT-CHAT</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </a>
//       </ul>

//       <div className='flex items-center gap-6'>
//         {/* Replace Search with Message Icon */}
//         <a href="/chatpage">
//           <FaRegComments size={20} className='cursor-pointer text-gray-700 hover:text-black' />
//         </a>

//         {token ? (
//           <div className='group relative'>
//             <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile" />
//             <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
//               <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
//                 <a onClick={handleProfile} className='cursor-pointer hover:text-black'>My Profile</a>
//                 <a onClick={handleLogout} className='cursor-pointer hover:text-black'>Logout</a>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <Link to='/login' className='text-sm text-gray-700 hover:underline'>Login / Signup</Link>
//         )}

//         <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
//       </div>

//       <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
//         <div className='flex flex-col text-gray-600'>
//           <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
//             <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
//             <p>Back</p>
//           </div>
//           <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
//           <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
//           <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/courses'>COURSES</NavLink>
//           <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/dorms'>DORMS</NavLink>
//           <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
//           <a
//             href="/chatpage"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="py-2 pl-6 border"
//           >
//             STUDENT-CHAT
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaRegComments } from 'react-icons/fa';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const { setShowSearch } = useContext(ShopContext);

  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem('token'));
    };
  
    // Listen to custom event when token is manually changed in app
    window.addEventListener('token-changed', syncToken);
  
    // Also listen to 'storage' event for cross-tab logout/login
    window.addEventListener('storage', syncToken);
  
    return () => {
      window.removeEventListener('token-changed', syncToken);
      window.removeEventListener('storage', syncToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.dispatchEvent(new Event('token-changed')); // 🔔 Notify other components
    setToken(null);
    window.location.href = '/';
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <img src={assets.logo} className='w-24 h-auto' alt='Logo' />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'><p>HOME</p></NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'><p>COLLECTION</p></NavLink>
        <NavLink to='/courses' className='flex flex-col items-center gap-1'><p>COURSES</p></NavLink>
        <NavLink to='/dorms' className='flex flex-col items-center gap-1'><p>DORMS</p></NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'><p>ABOUT</p></NavLink>
        
          <a href='/chatpage' target='_blank' rel='noopener noreferrer' className='flex flex-col items-center gap-1'>
            <p>STUDENT-CHAT</p>
          </a>
        
      </ul>

      <div className='flex items-center gap-6'>
        {token && (
          <a href='/chatpage' target='_blank' rel='noopener noreferrer'>
            <FaRegComments size={20} className='cursor-pointer text-gray-700 hover:text-black' />
          </a>
        )}

        {token ? (
          <div className='relative group'>
            <img className='w-5 cursor-pointer' src={assets.profile_icon} alt='Profile' />
            <div className='absolute right-0 top-7 hidden group-hover:block bg-slate-100 text-gray-500 rounded shadow-md py-2 w-36'>
              <button onClick={() => window.location.href = '/profile'} className='block w-full px-5 py-2 text-left hover:text-black'>
                My Profile
              </button>
              <button onClick={handleLogout} className='block w-full px-5 py-2 text-left hover:text-black'>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to='/login' className='text-sm text-gray-700 hover:underline'>Login / Signup</Link>
        )}

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='Menu' />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-md z-50 transition-all duration-300 ${visible ? 'w-[80%]' : 'w-0 overflow-hidden'}`}>
        <div className='flex flex-col text-gray-600 h-full'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-4 border-b cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='Back' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} to='/' className='py-3 pl-6 border-b'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/collection' className='py-3 pl-6 border-b'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/courses' className='py-3 pl-6 border-b'>COURSES</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/dorms' className='py-3 pl-6 border-b'>DORMS</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/about' className='py-3 pl-6 border-b'>ABOUT</NavLink>
          
            <a
              href='/chatpage'
              target='_blank'
              rel='noopener noreferrer'
              className='py-3 pl-6 border-b'
            >
              STUDENT-CHAT
            </a>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
