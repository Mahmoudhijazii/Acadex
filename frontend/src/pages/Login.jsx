// frontend/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { signInWithCustomToken } from 'firebase/auth';
// import { auth } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState('Login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Clear flash messages after 3s
  useEffect(() => {
    if (!error && !success) return;
    const id = setTimeout(() => {
      setError('');
      setSuccess('');
    }, 3000);
    return () => clearTimeout(id);
  }, [error, success]);

  const onSubmitHandler = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 1) If we're verifying a new signup code:
    if (showVerification) {
      try {
        const { data } = await axios.post(
          'https://student-x.onrender.com/api/users/verify',
          { email: formData.email, verificationCode }
        );
        setSuccess(data.message);
        setShowVerification(false);
        setTimeout(() => navigate('/login'), 1000);
      } catch (err) {
        setError(err.response?.data?.error || 'Verification failed.');
      }
      return;
    }

    // 2) Sign-up flow
    if (currentState === 'Sign Up') {
      try {
        const { data } = await axios.post(
          'https://student-x.onrender.com/api/users/signup',
          formData
        );
        setSuccess(data.message);
        setShowVerification(true);
      } catch (err) {
        setError(err.response?.data?.error || 'Signup failed.');
      }
      setFormData({ name: '', email: '', password: '' });
      return;
    }

    // 3) Login flow
    let backendToken, firebaseToken, role;
    try {
      const { data } = await axios.post(
        'https://student-x.onrender.com/api/users/login',
        { email: formData.email, password: formData.password }
      );
      backendToken = data.token;
      firebaseToken = data.firebaseToken;
      role = data.role;

      console.log('🔥 backend JWT:', backendToken);
      // console.log('🔥 customToken:', firebaseToken);
      // console.log('🔥 firebase config apiKey:', auth.config.apiKey);

      localStorage.setItem('token', backendToken);
      localStorage.setItem('role', role);
    } catch (err) {
      console.error('❌ Backend login error:', err.response ?? err);
      setError(err.response?.data?.error || 'Login failed.');
      return;
    }

    // 4) Firebase sign-in with the custom token
    // try {
    //   await signInWithCustomToken(auth, firebaseToken);
    //   console.log('✅ Firebase sign-in successful');
    // } catch (firebaseErr) {
    //   // This will include the HTTP response payload under customData._tokenResponse
    //   console.error(
    //     '❌ Firebase signInWithCustomToken error:',
    //     firebaseErr.code,
    //     firebaseErr.message,
    //     firebaseErr.customData?._tokenResponse
    //   );
    //   setError(`Firebase Auth error: ${firebaseErr.message}`);
    //   return;
    // }

    setSuccess('Login successful.');
    setTimeout(() => navigate('/'), 1000);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-3 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {error && (
        <p className="bg-gray-900 text-gray-300 px-4 py-2 rounded-md">{error}</p>
      )}
      {success && (
        <p className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md">{success}</p>
      )}

      {!showVerification ? (
        <>
          {currentState === 'Sign Up' && (
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          )}
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Password"
            required
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />
        </>
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter Verification Code"
          required
          value={verificationCode}
          onChange={e => setVerificationCode(e.target.value)}
        />
      )}

      {!showVerification && (
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
              Login Here
            </p>
          )}
        </div>
      )}

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
