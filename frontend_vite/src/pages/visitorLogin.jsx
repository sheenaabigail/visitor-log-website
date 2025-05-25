import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function VisitorLogin() {
  const [VisitorName, setVisitorName] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://visitor-entry-log-backend.onrender.com/visitors/visitorlogin", { VisitorName, ContactNo });
      alert(res.data.message);
      // localStorage.setItem("visitorToken", res.data.token); 
      navigate("/visitorlog"); // Redirect to visitor log page
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Visitor Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="VisitorName" className="sr-only">Visitor Name</label>
              <input
                id="VisitorName"
                name="VisitorName"
                type="text"
                required
                placeholder="Full Name"
                value={VisitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="ContactNo" className="sr-only">Phone Number</label>
              <input
                id="ContactNo"
                name="ContactNo"
                type="tel"
                required
                placeholder="Phone Number"
                value={ContactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Checkout Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VisitorLogin;
