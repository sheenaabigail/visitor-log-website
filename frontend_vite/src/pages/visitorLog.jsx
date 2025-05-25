import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VisitorLog() {
  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);
const [editEntry, setEditEntry] = useState(null);
const [editForm, setEditForm] = useState({
  VisitorName: '',
  ContactNo: '',
  ApartmentNo: '',
  VehicleType: '',
  VehicleNo: '',
  PurposeOfVisit: ''
});

const applyDateFilter = () => {
  let filteredList = [...entries];

  if (startDate) {
    filteredList = filteredList.filter(
      (e) => new Date(e.VisitTimestamp) >= new Date(startDate)
    );
  }
  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    filteredList = filteredList.filter(
      (e) => new Date(e.VisitTimestamp) <= end
    );
  }

  if (filterStatus === "completed") {
    filteredList = filteredList.filter((e) => e.visitStatus);
  } else if (filterStatus === "pending") {
    filteredList = filteredList.filter((e) => !e.visitStatus);
  }

  setFiltered(filteredList);
};


  const navigate = useNavigate();

  useEffect(() => {
    fetchVisitorLogData();
  }, [navigate]);

  const fetchVisitorLogData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to view visitor log");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://visitor-entry-log-backend.onrender.com/entries/showall", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await response.json();
      setEntries(data);
      setFiltered(data);
    } catch (err) {
      console.error("Error fetching log:", err);
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    if (status === "completed") {
      setFiltered(entries.filter((e) => e.visitStatus));
    } else if (status === "pending") {
      setFiltered(entries.filter((e) => !e.visitStatus));
    } else {
      setFiltered(entries);
    }
  setTimeout(() => {
    applyDateFilter();
  }, 0);
  };

  // DELETE API call
  const handleDelete = async (logId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      const response = await fetch(`http://visitor-entry-log-backend.onrender.com/entries/delete/${logId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Entry deleted successfully");
        fetchVisitorLogData(); // Refresh list after delete
      } else {
        const errData = await response.json();
        alert("Delete failed: " + (errData.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed due to network error");
    }
  };

 const handleFormChange = (e) => {
  const { name, value } = e.target;
  setEditForm((prev) => ({ ...prev, [name]: value }));
};
const handleEdit = (entry) => {
  setEditEntry(entry);
  setEditForm({
    VisitorName: entry.VisitorName || '',
    ContactNo: entry.ContactNo || '',
    ApartmentNo: entry.ApartmentNo || '',
    VehicleType: entry.VehicleType || '',
    VehicleNo: entry.VehicleNo || '',
    PurposeOfVisit: entry.PurposeOfVisit || '',
  });
  setEditModalOpen(true);
};

const submitEdit = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://visitor-entry-log-backend.onrender.com/entries/update/${editEntry.LogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm),
    });

    if (response.ok) {
      alert("Entry updated successfully");
      setEditModalOpen(false);
      fetchVisitorLogData();
    } else {
      const errData = await response.json();
      alert("Update failed: " + (errData.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Update error:", err);
    alert("Update failed due to network error");
  }
};


  return (
    <>{editModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
          <h2 className="text-xl font-bold mb-4">Edit Visitor Entry</h2>
          
          {Object.keys(editForm).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">{key}</label>
              <input
                type="text"
                name={key}
                value={editForm[key]}
                onChange={handleFormChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          ))}

          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={() => setEditModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={submitEdit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Visitor Log</h1>
<div className="flex flex-col md:flex-row justify-end items-center mb-4 space-y-2 md:space-y-0 md:space-x-4">
  <div>
    <label className="block text-sm font-medium">Start Date:</label>
    <input
      type="date"
      value={startDate}
      onChange={(e) => {
        setStartDate(e.target.value);
        applyDateFilter();
      }}
      className="border px-2 py-1 rounded"
    />
  </div>
  <div>
    <label className="block text-sm font-medium">End Date:</label>
    <input
      type="date"
      value={endDate}
      onChange={(e) => {
        setEndDate(e.target.value);
        applyDateFilter();
      }}
      className="border px-2 py-1 rounded"
    />
  </div>
</div>

      <div className="flex justify-end mb-4 space-x-2">
        <button
          onClick={() => handleFilterChange("all")}
          className={`px-4 py-2 rounded ${
            filterStatus === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("completed")}
          className={`px-4 py-2 rounded ${
            filterStatus === "completed" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => handleFilterChange("pending")}
          className={`px-4 py-2 rounded ${
            filterStatus === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Pending
        </button>
      </div>

      <div className="overflow-auto rounded shadow">
        <table className="min-w-full text-sm text-left bg-white border">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 border">Visitor ID</th>
              <th className="px-4 py-2 border">Log ID</th>
              <th className="px-4 py-2 border">Visitor Name</th>
              <th className="px-4 py-2 border">Apartment No</th>
              <th className="px-4 py-2 border">Vehicle Type</th>
              <th className="px-4 py-2 border">Vehicle No</th>
              <th className="px-4 py-2 border">Purpose</th>
              <th className="px-4 py-2 border">In Time</th>
              <th className="px-4 py-2 border">Out Time</th>
              <th className="px-4 py-2 border">Visit Timestamp</th>
              <th className="px-4 py-2 border">Duration</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <tr
                key={entry.LogId}
                className="hover:bg-gray-100 transition duration-150"
              >
                <td className="px-4 py-2 border">{entry.VisitorId}</td>
                <td className="px-4 py-2 border">{entry.LogId}</td>
                                <td className="px-4 py-2 border">{entry.VisitorName}</td>

                <td className="px-4 py-2 border">{entry.ApartmentNo}</td>
                <td className="px-4 py-2 border">{entry.VehicleType}</td>
                <td className="px-4 py-2 border">{entry.VehicleNo}</td>
                <td className="px-4 py-2 border">{entry.PurposeOfVisit}</td>
                <td className="px-4 py-2 border">{entry.InTime}</td>
                <td className="px-4 py-2 border">{entry.OutTime}</td>
                <td className="px-4 py-2 border">{entry.VisitTimestamp}</td>
                <td className="px-4 py-2 border">{entry.DurationOfVisit}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      entry.visitStatus
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {entry.visitStatus ? "Completed" : "Pending"}
                  </span>
                </td>
                <td className="px-4 py-2 border text-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(entry.LogId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="12" className="text-center py-6 text-gray-500">
                  No entries found for selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>  </>
  );
}

export default VisitorLog;
