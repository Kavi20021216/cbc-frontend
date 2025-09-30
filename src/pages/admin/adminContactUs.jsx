// src/pages/admin/adminContactUs.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../components/paginator";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";

export default function AdminContactUs() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);

  const [popupVisible, setPopupVisible] = useState(false);
  const [clickedMessage, setClickedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("");

  // Load pending messages
  useEffect(() => {
    if (loading) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/contact-us/${page}/${limit}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setMessages(res.data.massages);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load messages");
        });
    }
  }, [loading, page, limit]);

  // Delete message
  const handleDelete = async (msgId) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/contact-us/${msgId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Message deleted successfully");
      setLoading(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message");
    }
  };

  // Send reply
  const handleSendReply = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact-us/${clickedMessage._id}`,
        {
          email: clickedMessage.email,
          reMassage: replyMessage,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (messageStatus !== clickedMessage.status) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/contact-us/${clickedMessage._id}`,
          { status: messageStatus },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      }

      toast.success("Reply sent successfully");
      setPopupVisible(false);
      setLoading(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reply");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <table className="w-full border-[3px]">
        <thead>
          <tr>
            <th className="p-[10px]">Name</th>
            <th className="p-[10px]">Email</th>
            <th className="p-[10px]">Message</th>
            <th className="p-[10px]">Status</th>
            <th className="p-[10px]">Delete</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr
              key={msg._id}
              className="border-b-[1px] hover:bg-blue-600 hover:text-white cursor-pointer"
              onClick={() => {
                setClickedMessage(msg);
                setPopupVisible(true);
                setReplyMessage("");
                setMessageStatus(msg.status);
              }}
            >
              <td className="p-[10px]">{msg.name}</td>
              <td className="p-[10px]">{msg.email}</td>
              <td className="p-[10px]">{msg.massage}</td>
              <td className="p-[10px]">{msg.status}</td>
              <td className="p-[10px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(msg._id);
                  }}
                >
                  <BiTrash className="text-red-600 text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupVisible && clickedMessage && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center z-50">
          <div className="w-full max-w-2xl max-h-[600px] bg-white rounded-lg p-6 relative shadow-xl overflow-y-auto">
            {/* Manual close button */}
            <button
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg hover:bg-transparent hover:text-red-600"
              onClick={() => setPopupVisible(false)}
            >
              X
            </button>

            <h2 className="text-2xl font-semibold mb-4">Reply Message</h2>

            <div className="mb-4">
              <label className="font-semibold">Name:</label>
              <input
                type="text"
                value={clickedMessage.name}
                disabled
                className="w-full p-2 border rounded mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="font-semibold">Email:</label>
              <input
                type="email"
                value={clickedMessage.email}
                disabled
                className="w-full p-2 border rounded mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="font-semibold">Message:</label>
              <textarea
                value={clickedMessage.massage}
                disabled
                className="w-full p-2 border rounded mt-1 h-24"
              />
            </div>

            <div className="mb-4">
              <label className="font-semibold">Reply Message:</label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full p-2 border rounded mt-1 h-24"
              />
            </div>

            <div className="mb-4">
              <label className="font-semibold">Status:</label>
              <select
                value={messageStatus}
                onChange={(e) => setMessageStatus(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              >
                <option value="pending">Pending</option>
                <option value="replied">Replied</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={handleSendReply}
              >
                Send
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setPopupVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paginator */}
      <Paginator
        currentPage={page}
        totalPages={totalPages}
        setCurrentPage={setPage}
        limit={limit}
        setLimit={setLimit}
        setLoading={setLoading}
      />
    </div>
  );
}
