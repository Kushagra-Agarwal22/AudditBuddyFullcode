import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const API_URL = 'https://audditbuddyfullcode.onrender.com';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleFacebookAuth = () => {
    window.location.href = `${API_URL}/auth/facebook`;
  };

  const handleEmailRegister = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Add your email registration API call here
      alert('Email registration coming soon!');
      // After successful registration, redirect to login
      // navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#000000]">
      <div className="w-full max-w-md bg-white dark:bg-[#161616] rounded-lg p-8 shadow-sm">

        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6 tracking-[1.7px]">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="relative mb-6 mt-3.5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-2.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Register Button */}
        <button 
          onClick={handleEmailRegister}
          disabled={loading}
          className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Social Auth */}
        <div className="flex gap-4">
          {/* Google */}
          <button  
            onClick={handleGoogleAuth}
            className="flex items-center justify-center gap-2 w-1/2 border border-gray-400 dark:border-gray-600 rounded-lg py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <FcGoogle size={20} />
            <span className="text-gray-700 dark:text-gray-200 text-sm">
              Google
            </span>   
          </button>

          {/* Facebook */}
          <button  
            onClick={handleFacebookAuth}
            className="flex items-center justify-center gap-2 w-1/2 border border-gray-400 dark:border-gray-600 rounded-lg py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-gray-700 dark:text-gray-200 text-sm">
              Facebook
            </span>
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Sign In
          </button>
        </p>

      </div>
    </div>
  );
}
