import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Welcome to the Apartment Visitor Log</h1>
      <p className="text-lg text-gray-700 mb-10">Please select your role to continue</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        <button
          onClick={() => navigate('/visitor-login')}
          className="bg-white text-blue-700 border border-blue-600 font-medium py-3 px-6 rounded-lg shadow hover:bg-blue-50 transition"
        >
          Visitor Login (Checkout)
        </button>

        <button
          onClick={() => navigate('/signup')}
          className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Visitor Signup (To Visit)
        </button>

        <button
          onClick={() => navigate('/login')}
          className="bg-gray-800 text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-gray-900 transition"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
