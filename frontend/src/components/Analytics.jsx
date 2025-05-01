import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import "./Analytics.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Analytics = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userRole = localStorage.getItem("role");

  // Fetch files
  const fetchFiles = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view analytics.");
      return;
    }

    setLoading(true);
    try {
      const url = userRole === "admin"
        ? "http://localhost:5000/api/protected/files"
        : "http://localhost:5000/api/protected/files";
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(response.data.files);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // File Type Distribution (Pie Chart)
  const fileTypeData = () => {
    const typeCounts = files.reduce((acc, file) => {
      const extension = file.filename.split(".").pop().toLowerCase();
      acc[extension] = (acc[extension] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(typeCounts),
      datasets: [
        {
          data: Object.values(typeCounts),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        },
      ],
    };
  };

  // Upload Trends (Line Chart)
  const uploadTrendData = () => {
    const uploadsByDate = files.reduce((acc, file) => {
      const date = new Date(file.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    const sortedDates = Object.keys(uploadsByDate).sort((a, b) => new Date(a) - new Date(b));
    return {
      labels: sortedDates,
      datasets: [
        {
          label: "Uploads Over Time",
          data: sortedDates.map(date => uploadsByDate[date]),
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "#36A2EB",
          tension: 0.4,
        },
      ],
    };
  };

  // File Size Distribution (Bar Chart)
  const fileSizeData = () => {
    const sizeCategories = {
      "Small (<1MB)": 0,
      "Medium (1-10MB)": 0,
      "Large (>10MB)": 0,
    };
    files.forEach(file => {
      const sizeMB = file.fileSize / (1024 * 1024);
      if (sizeMB < 1) sizeCategories["Small (<1MB)"]++;
      else if (sizeMB <= 10) sizeCategories["Medium (1-10MB)"]++;
      else sizeCategories["Large (>10MB)"]++;
    });
    return {
      labels: Object.keys(sizeCategories),
      datasets: [
        {
          label: "File Sizes",
          data: Object.values(sizeCategories),
          backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
        },
      ],
    };
  };

  const successRate = () => {
    const total = files.length;
    // Assume all files are successful if no status field exists
    return total > 0 ? 100.0 : 0;
  };

  // Top Uploaders (Admin Only)
  const topUploaders = () => {
    const uploaderCounts = files.reduce((acc, file) => {
      acc[file.email] = (acc[file.email] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(uploaderCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  };

  // Recent Uploads
  const recentUploads = files
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="analytics-container">
      <div className="analytics-header animate-glow">
        <h1>Data Analytics Dashboard</h1>
        <p className="analytics-description">
          Dive into futuristic insights with real-time file upload analytics.
        </p>
      </div>

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}

      <div className="analytics-content">
        <div className="analytics-grid">
          {/* File Type Distribution */}
          <div className="analytics-card animate-slide-in">
            <h2>File Type Distribution</h2>
            {files.length > 0 ? (
              <Pie
                data={fileTypeData()}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top", labels: { color: "#e0e0e0" } } },
                  animation: { duration: 1500, easing: "easeOutBounce" },
                }}
              />
            ) : (
              <p>No data available.</p>
            )}
          </div>

          {/* Upload Trends */}
          <div className="analytics-card animate-slide-in">
            <h2>Upload Trends</h2>
            {files.length > 0 ? (
              <Line
                data={uploadTrendData()}
                options={{
                  responsive: true,
                  scales: {
                    x: { title: { display: true, text: "Date", color: "#e0e0e0" }, ticks: { color: "#e0e0e0" } },
                    y: { title: { display: true, text: "Uploads", color: "#e0e0e0" }, ticks: { color: "#e0e0e0" } },
                  },
                  animation: { duration: 1500, easing: "easeOutQuad" },
                }}
              />
            ) : (
              <p>No data available.</p>
            )}
          </div>

          {/* File Size Distribution */}
          <div className="analytics-card animate-slide-in">
            <h2>File Size Distribution</h2>
            {files.length > 0 ? (
              <Bar
                data={fileSizeData()}
                options={{
                  responsive: true,
                  scales: {
                    y: { title: { display: true, text: "Count", color: "#e0e0e0" }, ticks: { color: "#e0e0e0" } },
                    x: { title: { display: true, text: "Size Category", color: "#e0e0e0" }, ticks: { color: "#e0e0e0" } },
                  },
                  animation: { duration: 1500, easing: "easeOutQuad" },
                }}
              />
            ) : (
              <p>No data available.</p>
            )}
          </div>

          {/* Success Rate */}
         {/* Success Rate */}
<div className="analytics-card animate-slide-in">
  <h2>Upload Success Rate</h2>
  <div
    className="radial-progress"
    style={{
      "--value": successRate(),
      "--size": "12rem",
      "--thickness": "2rem",
    }}
  >
    <span className="radial-progress-text">{successRate()}%</span>
  </div>
</div>

          {/* Recent Uploads */}
          <div className="analytics-card animate-slide-in span-2">
            <h2>Recent Uploads</h2>
            {recentUploads.length > 0 ? (
              <table className="uploads-table">
                <thead>
                  <tr>
                    <th>Filename</th>
                    <th>Uploader</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUploads.map(file => (
                    <tr key={file.id}>
                      <td>{file.filename}</td>
                      <td>{file.email || "N/A"}</td>
                      <td>{new Date(file.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No recent uploads.</p>
            )}
          </div>

          {/* Top Uploaders (Admin Only)
          {userRole === "admin" && (
            <div className="analytics-card animate-slide-in span-2">
              <h2>Top Uploaders</h2>
              {topUploaders().length > 0 ? (
                <table className="uploads-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Uploads</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topUploaders().map(([email, count]) => (
                      <tr key={email}>
                        <td>{email}</td>
                        <td>{count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No uploader data.</p>
              )}
            </div>
          )} */}
        </div>

        <button
          onClick={fetchFiles}
          className="refresh-btn"
        >
          Refresh Analytics
        </button>
      </div>
    </div>
  );
};

export default Analytics;