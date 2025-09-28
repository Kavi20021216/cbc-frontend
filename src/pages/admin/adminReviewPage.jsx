import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function load() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews/" + page + "/20",
        { headers: { Authorization: "Bearer " + token } }
      );
      setReviews(res.data.reviews || []);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews/" + id,
        { headers: { Authorization: "Bearer " + token } }
      );
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Failed to delete");
    }
  }

  useEffect(() => { load(); }, [page]);

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Reviews (Admin)</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Product ID</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Rating</th>
                <th className="p-2 border">Comment</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r._id} className="border-b">
                  <td className="p-2 border">{r.productId}</td>
                  <td className="p-2 border">{r.name} ({r.email})</td>
                  <td className="p-2 border">{r.rating}</td>
                  <td className="p-2 border">{r.comment}</td>
                  <td className="p-2 border">{new Date(r.date).toLocaleString()}</td>
                  <td className="p-2 border">
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      onClick={() => remove(r._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* pager */}
          <div className="mt-3 flex items-center gap-2">
            <button
              className="px-3 py-1 border rounded"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
