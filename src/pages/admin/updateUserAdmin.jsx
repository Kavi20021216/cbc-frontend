import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function UpdateUserPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.email) {
      toast.error("No user data provided");
      navigate("/admin/users");
    }
  }, [location.state, navigate]);

  // Prefill from navigation state
  const [firstName, setFirstName] = useState(location.state?.firstName || "");
  const [lastName, setLastName]   = useState(location.state?.lastName || "");
  const [email]                   = useState(location.state?.email || ""); // read-only
  const [phone, setPhone]         = useState(location.state?.phone || "");
  const [role, setRole]           = useState(location.state?.role || "user");
  const [isBlocked, setIsBlocked] = useState(
    typeof location.state?.isBlocked === "boolean" ? location.state.isBlocked : false
  );
  const [isEmailVerified, setIsEmailVerified] = useState(
    typeof location.state?.isEmailVerified === "boolean" ? location.state.isEmailVerified : false
  );
  const [image, setImage] = useState(location.state?.image || "");

  function handleSubmit() {
    const payload = {
      firstName,
      lastName,
      phone,
      role,
      isBlocked,
      isEmailVerified,
      image,
    };

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/users/${email}`, payload)
      .then((res) => {
        console.log("User updated:", res.data);
        toast.success("User updated successfully");
        navigate("/admin/users");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        toast.error(err?.response?.data?.message || "Failed to update user");
      });
  }

  return (
    <div className="w-full min-h-screen flex items-start justify-center py-10">
      <div className="w-[900px] border-[3px] rounded-[20px] p-10">
      
        <div className="w-full flex justify-center items-center mb-8">
          <h1 className="text-[32px] font-bold text-[#f59ca9]">Update User</h1>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border h-10 rounded-md px-3"
            />
          </div>

        
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border h-10 rounded-md px-3"
            />
          </div>

         
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold">Email</label>
            <input
              type="text"
              value={email}
              disabled
              className="w-full border h-10 rounded-md px-3 bg-gray-100"
            />
          </div>

         
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border h-10 rounded-md px-3"
            />
          </div>

          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border h-10 rounded-md px-3"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Is Blocked</label>
            <select
              value={isBlocked ? "true" : "false"}
              onChange={(e) => setIsBlocked(e.target.value === "true")}
              className="w-full border h-10 rounded-md px-3"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Email Verified</label>
            <select
              value={isEmailVerified ? "true" : "false"}
              onChange={(e) => setIsEmailVerified(e.target.value === "true")}
              className="w-full border h-10 rounded-md px-3"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

         
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold">Profile Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border h-10 rounded-md px-3"
              placeholder="https://..."
            />
          </div>
        </div>

       
        <div className="w-full flex justify-center gap-5 mt-8">
          <Link
            to="/admin/users"
            className="w-[200px] h-[50px] border-2 border-[#f59ca9] text-[#f59ca9] rounded-md flex items-center cursor-pointer justify-center"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="w-[200px] h-[50px] bg-[#f59ca9] border border-[#f59ca9] text-white rounded-md cursor-pointer"
          >
            Update User
          </button>
        </div>
      </div>
    </div>
  );
}
