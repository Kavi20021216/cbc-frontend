import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/header";
import { BiSearch, BiEdit, BiTrash, BiSend, BiX } from "react-icons/bi";

function Stars({ value, onChange }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <button
            key={i}
            type="button"
            className={"text-2xl mr-1 " + (filled ? "text-yellow-500" : "text-gray-300")}
            onClick={() => onChange && onChange(i + 1)}
            aria-label={`Rate ${i + 1} star${i + 1 > 1 ? "s" : ""}`}
            title={`Rate ${i + 1}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

export default function ReviewPage() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // add form
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");

  // 🚫 not-allowed modal
  const [notAllowedOpen, setNotAllowedOpen] = useState(false);

  // current user (for ownership checks)
  const [currentEmail, setCurrentEmail] = useState("");

  const [productNames, setProductNames] = useState({});
  const listTopRef = useRef(null);

  function setProductNameInCache(pid, name) {
    setProductNames((m) => ({ ...m, [pid]: name || "" }));
  }

  function upsertReviewInList(review) {
    setReviews((prev) => {
      const idx = prev.findIndex((r) => r._id === review._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = review;
        return copy;
      }
      return [review, ...prev];
    });
  }

  function removeReviewFromList(id) {
    setReviews((prev) => prev.filter((r) => r._id !== id));
  }

  async function fetchProduct(pid) {
    try {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + pid);
      const name = res.data?.name || "";
      setProductName(name);
      setProductNameInCache(pid, name);
    } catch {
      setProductName("");
      setProductNameInCache(pid, "");
    }
  }

  async function fetchProductReviews(pid) {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews/product/" + pid);
    setReviews(res.data || []);
  }

  async function fetchAllForProduct(pid) {
    if (!pid) {
      setReviews([]);
      setProductName("");
      toast("Please enter a Product ID");
      return;
    }
    setLoading(true);
    try {
      await fetchProduct(pid);
      await fetchProductReviews(pid);
      setTimeout(() => {
        if (listTopRef.current) listTopRef.current.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }

  async function loadInitialReviews() {
    setLoading(true);
    try {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
      if (Array.isArray(res.data)) {
        setReviews(res.data);
        const ids = Array.from(new Set(res.data.map((r) => r.productId)));
        ids.forEach(async (pid) => {
          if (!productNames[pid]) {
            try {
              const pr = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + pid);
              setProductNameInCache(pid, pr.data?.name || "");
            } catch {
              setProductNameInCache(pid, "");
            }
          }
        });
      }
    } catch {}
    finally { setLoading(false); }
  }

  async function addReview() {
    const token = localStorage.getItem("token");
    if (!token) { toast.error("Please login to add a review"); return; }
    if (!productId) { toast.error("Enter a product ID first"); return; }
    if (rating < 1 || rating > 5) { toast.error("Rating must be between 1 and 5"); return; }

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews",
        { productId, rating, comment },
        { headers: { Authorization: "Bearer " + token } }
      );
      upsertReviewInList(res.data.review);
      toast.success("Review added");
      setRating(5);
      setComment("");
      if (!productName) { await fetchProduct(productId); }
      setTimeout(() => { if (listTopRef.current) listTopRef.current.scrollIntoView({ behavior: "smooth" }); }, 0);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to submit review");
    }
  }

  // ⬇️ only allow edit for owner
  function openEditPopup(r) {
    if (!currentEmail || r.email !== currentEmail) {
      setNotAllowedOpen(true);
      return;
    }
    setEditReviewId(r._id);
    setEditRating(r.rating);
    setEditComment(r.comment || "");
    setEditOpen(true);
  }

  async function saveEdit() {
    const token = localStorage.getItem("token");
    if (!token) { toast.error("Please login"); return; }
    if (!productId) { toast.error("Enter a product ID first"); return; }
    try {
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + productId,
        { rating: editRating, comment: editComment },
        { headers: { Authorization: "Bearer " + token } }
      );
      upsertReviewInList(res.data.review);
      toast.success("Review updated");
      setEditOpen(false);
    } catch {
      toast.error("Failed to update review");
    }
  }

  // ⬇️ only allow delete for owner
  async function deleteMine(r) {
    if (!currentEmail || r.email !== currentEmail) {
      setNotAllowedOpen(true);
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) { toast.error("Please login"); return; }
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + r.productId,
        { headers: { Authorization: "Bearer " + token } }
      );
      removeReviewFromList(r._id);
      toast.success("Review deleted");
    } catch {
      toast.error("Failed to delete review");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") fetchAllForProduct(productId);
  }

  // 🔐 get current user email (simple)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
      headers: { Authorization: "Bearer " + token }
    }).then((res) => {
      setCurrentEmail(res.data?.email || "");
    }).catch(() => {
      setCurrentEmail("");
    });
  }, []);

  useEffect(() => { loadInitialReviews(); }, []);

  return (
    <div className="w-full h-screen max-h-screen flex flex-col">
      <Header />
      <div className="w-full h-[calc(100%-100px)] overflow-y-auto">
        <div className="w-full h-full flex flex-col items-center p-4">
          <div className="w-full md:w-[800px] shadow-2xl p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Reviews</h1>

            {/* search row */}
            <div className="flex items-center gap-2 mb-4">
              <input
                className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
                placeholder="Enter Product ID (e.g., PROD001)"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="w-[48px] h-[40px] rounded-lg bg-accent text-white flex justify-center items-center"
                onClick={() => fetchAllForProduct(productId)}
                title="Search"
                aria-label="Search"
              >
                <BiSearch className="text-2xl" />
              </button>
            </div>

            {/* product name (auto fill) */}
            {productName && (
              <div className="mb-3">
                <label className="text-sm font-semibold">Product Name</label>
                <input
                  disabled
                  value={productName}
                  className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
                />
              </div>
            )}

            {/* add review (always add mode) */}
            <div className="border rounded-lg p-3 mb-4">
              <h2 className="font-semibold mb-2">Add a review</h2>
              <Stars value={rating} onChange={setRating} />
              <textarea
                className="w-full h-[80px] border border-gray-300 rounded-lg p-2 mt-3"
                placeholder="Comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div className="mt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  className="w-[140px] h-[40px] rounded-lg bg-[#ffadab] cursor-pointer text-white flex items-center justify-center gap-2"
                  onClick={addReview}
                  title="Submit"
                >
                  <BiSend /> Submit
                </button>
                <button
                  type="button"
                  className="w-[120px] h-[40px] rounded-lg bg-white border border-[#ffadab] cursor-pointer flex items-center justify-center gap-2"
                  onClick={() => { setRating(5); setComment(""); }}
                  title="Cancel"
                >
                  <BiX /> Cancel
                </button>
              </div>
            </div>

            {/* list */}
            <div className="border rounded-lg p-3">
              <h2 className="font-semibold mb-2">All Reviews</h2>
              <div ref={listTopRef} />
              <div className="h-[350px] overflow-y-auto">
                {loading ? (
                  <p>Loading...</p>
                ) : reviews.length === 0 ? (
                  <p className="text-gray-500">No reviews yet.</p>
                ) : (
                  reviews.map((r) => {
                    const nameToShow =
                      productId && r.productId === productId
                        ? productName || r.productId
                        : (productNames[r.productId] || r.productId);

                    const isOwner = !!currentEmail && r.email === currentEmail;

                    return (
                      <div key={r._id} className="border-b py-3">
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="font-semibold">{r.name}</span>
                            <span className="text-xs text-gray-500">{nameToShow}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(r.date).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <Stars value={r.rating} />
                          <div className="flex items-center gap-2">
                            {isOwner ? (
                              <>
                                <button
                                  className="px-3 py-1 bg-gray-100 border rounded flex items-center gap-1"
                                  onClick={() => openEditPopup(r)}
                                  title="Edit"
                                >
                                  <BiEdit /> Edit
                                </button>
                                <button
                                  className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1"
                                  onClick={() => deleteMine(r)}
                                  title="Delete"
                                >
                                  <BiTrash /> Delete
                                </button>
                              </>
                            ) : null}
                          </div>
                        </div>

                        {r.comment && <p className="mt-1">{r.comment}</p>}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Edit popup */}
      {editOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center z-50">
          <div className="w-[95%] max-w-[500px] bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">Edit Review</h3>
              <button className="px-3 py-1 border rounded" onClick={() => setEditOpen(false)}>
                <BiX />
              </button>
            </div>
            <div className="mb-3">
              <label className="text-sm font-semibold">Rating</label>
              <div className="mt-1">
                <Stars value={editRating} onChange={setEditRating} />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-sm font-semibold">Comment</label>
              <textarea
                className="w-full h-[80px] border rounded p-2"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2  border border-[#ffabad] rounded" onClick={() => setEditOpen(false)}>Cancel</button>
              <button className="px-4 py-2 bg-accent text-white rounded" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Not allowed popup */}
      {notAllowedOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center z-50">
          <div className="w-[95%] max-w-[420px] bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Action not allowed</h3>
              <button className="px-3 py-1 border rounded" onClick={() => setNotAllowedOpen(false)}>
                <BiX />
              </button>
            </div>
            <p className="mb-3">You can not edit or delete this review.</p>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-accent text-white rounded" onClick={() => setNotAllowedOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
