import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null); // State to handle selected form

  // Fetch submissions when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/all");
        setSubmissions(response.data);
        console.log("Submissions:", response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    }
    fetchData();
  }, []);

  // Handle "View Details" button click
  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/submission/${id}`);
      setSelectedSubmission(response.data); // Store the full form data
    } catch (error) {
      console.error("Error fetching submission details:", error);
    }
  };

  // Close the details modal
  const closeDetails = () => {
    setSelectedSubmission(null);
  };

  // Render table rows
  const renderTableRows = () => {
    return submissions.map((submission) => {
      const { user, categoryName, averageWeightage, _id } = submission;
      const username = user?.username || "N/A";
      const email = user?.email || "N/A";
  
      return (
        <tr key={_id} className="border-b">
          <td className="p-2">{categoryName}</td>
          <td className="p-2">{username}</td>
          <td className="p-2">{email}</td>
          <td className="p-2">{averageWeightage || "N/A"}</td>
          <td className="p-2">
            <button
              onClick={() => handleViewDetails(_id)}
              className="text-blue-500 hover:underline"
            >
              View Details
            </button>
          </td>
        </tr>
      );
    });
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        {submissions.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">Organisation</th>
                <th className="p-2 border border-gray-300">User</th>
                <th className="p-2 border border-gray-300">Email</th>
                <th className="p-2 border border-gray-300">Avg Weight</th> {/* New Column */}
                <th className="p-2 border border-gray-300">Actions</th>
              </tr>
            </thead>

            <tbody>{renderTableRows()}</tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600 mt-4">No submissions available.</p>
        )}

        {/* Details Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Form Preview</h2>
              <div>
                <p>
                  <strong>Category Name:</strong> {selectedSubmission.categoryName}
                </p>
                <p>
                  <strong>User:</strong> {selectedSubmission.user?.username || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {selectedSubmission.user?.email || "N/A"}
                </p>
                <p>
                <strong>Avg Weightage:</strong> {selectedSubmission.averageWeightage || "N/A"}
                </p>
                <h3 className="font-bold mt-4">Ratings:</h3>
                <ul className="list-disc list-inside">
                  {selectedSubmission.ratings.map((rating, index) => (
                    <li key={index}>
                      <strong>Question:</strong> {rating.question} <br />
                      <strong>Rating:</strong> {rating.ratings}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={closeDetails}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
