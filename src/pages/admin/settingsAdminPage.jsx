import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

export default function SettingsAdminPage() {
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    image: "",
  });

  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((err) => {
        console.error("Failed to load admin data:", err);
        toast.error("Failed to fetch user data");
      });
  }, [navigate]);

 
  const handleSignOut = () => {
    localStorage.removeItem("token");
    toast.success("Signed out successfully");
    navigate("/login");
  };

  
  const handleUpdate = () => {
    navigate("/admin/updateUser", { state: admin });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="w-[500px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-10 flex flex-col items-center">

        
        {admin.image ? (
          <img
            src={admin.image}
            alt="Admin"
            className="w-[120px] h-[120px] rounded-full object-cover border-4 border-pink-400 shadow-lg"
          />
        ) : (
          <FaUserCircle className="text-[120px] text-pink-400 mb-2" />
        )}

        
        <h2 className="text-2xl font-bold mt-4">
          {admin.firstName} {admin.lastName}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          {admin.role || "Admin"}
        </p>

        <div className="w-full mt-6 border-t border-gray-300 dark:border-gray-600 pt-4 text-center">
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {admin.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Phone:</span> {admin.phone}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {admin.role}
          </p>
        </div>

        
        <div className="flex flex-row gap-4 mt-8 w-full justify-center">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Update Details
          </button>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
