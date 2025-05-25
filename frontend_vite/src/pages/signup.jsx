import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    VisitorName: "",
    ContactNo: "",
    ApartmentNo: "",
    VehicleType: "",
    VehicleNo: "",
    PurposeOfVisit: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post("http://visitor-entry-log-backend.onrender.com/entries/addentry", formData);
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.message || "Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Visitor Signup</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="VisitorName" className="block text-gray-700 mb-1 font-semibold">Visitor Name</label>
            <input
              id="VisitorName"
              name="VisitorName"
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Full Name"
              value={formData.VisitorName}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="ContactNo" className="block text-gray-700 mb-1 font-semibold">Contact Number</label>
            <input
              id="ContactNo"
              name="ContactNo"
              type="tel"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Phone Number"
              value={formData.ContactNo}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="ApartmentNo" className="block text-gray-700 mb-1 font-semibold">Apartment Number</label>
            <input
              id="ApartmentNo"
              name="ApartmentNo"
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Apartment #"
              value={formData.ApartmentNo}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="VehicleType" className="block text-gray-700 mb-1 font-semibold">Vehicle Type</label>
            <select
              id="VehicleType"
              name="VehicleType"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.VehicleType}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Bicycle">Bicycle</option>
              <option value="None">None</option>
            </select>
          </div>

          {formData.VehicleType && formData.VehicleType !== "None" && (
            <div>
              <label htmlFor="VehicleNo" className="block text-gray-700 mb-1 font-semibold">Vehicle Number</label>
              <input
                id="VehicleNo"
                name="VehicleNo"
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="License Plate"
                value={formData.VehicleNo}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          )}

          <div>
            <label htmlFor="PurposeOfVisit" className="block text-gray-700 mb-1 font-semibold">Purpose of Visit</label>
            <textarea
              id="PurposeOfVisit"
              name="PurposeOfVisit"
              rows="3"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="Reason for visiting"
              value={formData.PurposeOfVisit}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200
              ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
