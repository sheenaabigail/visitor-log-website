import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VisitorList() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/visitors/showall')
      .then(response => {
        setVisitors(response.data);
      })
      .catch(error => {
        console.error('Error fetching visitors:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">Past Visitors</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length > 0 ? (
                visitors.map(visitor => (
                  <tr key={visitor.VisitorId} className="text-center hover:bg-gray-50">
                    <td className="px-4 py-2 border">{visitor.VisitorId}</td>
                    <td className="px-4 py-2 border">{visitor.VisitorName}</td>
                    <td className="px-4 py-2 border">{visitor.ContactNo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-2 border text-center text-gray-500">
                    No visitors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VisitorList;
