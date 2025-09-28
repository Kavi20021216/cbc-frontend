// ...existing imports
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";
import toast from "react-hot-toast";

// ⭐ add small stars helper
function Stars({ value }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={"text-lg " + (i < value ? "text-yellow-500" : "text-gray-300")}>★</span>
      ))}
    </div>
  );
}

export default function ProductOverViewPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); //loading, success, error

  // ⭐ reviews state
  const [reviews, setReviews] = useState([]);
  const [revLoading, setRevLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productId}`)
        .then((res) => {
          setProduct(res.data);
          setStatus("success");
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, [status]);

  // ⭐ load reviews for this product
  useEffect(() => {
    if (!params.productId) return;
    setRevLoading(true);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + `/api/reviews/product/${params.productId}`)
      .then((res) => setReviews(res.data))
      .catch(() => setReviews([]))
      .finally(() => setRevLoading(false));
  }, [params.productId]);

  async function submitReview() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add a review");
      return;
    }
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews",
        { productId: params.productId, rating, comment },
        { headers: { Authorization: "Bearer " + token } }
      );
      toast.success("Review added");
      setComment("");
      // refresh list
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + `/api/reviews/product/${params.productId}`
      );
      setReviews(res.data);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to add review");
    }
  }

  return (
    <div className="w-full h-full">
      {status == "loading" && <Loader />}
      {status == "success" && (
        <div className="w-full h-full flex flex-col md:flex-row ">
          {/* ...existing left/right blocks unchanged up to buttons */}

          {/* existing price + buttons remain... */}
          {/* buttons block already in your file */}

          {/* ⭐ REVIEWS SECTION */}
          <div className="w-full md:w-[49%] h-full flex flex-col items-center pt-[10px] pb-[40px]">
            <h2 className="text-xl font-bold mt-6 mb-2">Customer Reviews</h2>

            {/* add review form */}
            <div className="w-full max-w-[600px] border rounded-lg p-3 mb-3">
              <div className="flex flex-col md:flex-row gap-2">
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className="w-full md:w-[120px] h-[40px] border border-gray-300 rounded-lg p-2"
                >
                  <option value={5}>★★★★★ (5)</option>
                  <option value={4}>★★★★ (4)</option>
                  <option value={3}>★★★ (3)</option>
                  <option value={2}>★★ (2)</option>
                  <option value={1}>★ (1)</option>
                </select>
                <input
                  className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
                  placeholder="Comment (optional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={submitReview}
                  className="w-full md:w-[150px] h-[40px] rounded-lg bg-accent text-white"
                >
                  Add Review
                </button>
              </div>
            </div>

            {/* list */}
            <div className="w-full max-w-[600px] max-h-[250px] overflow-y-auto">
              {revLoading ? (
                <p>Loading...</p>
              ) : reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                reviews.map((r) => (
                  <div key={r._id} className="border-b py-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">{r.name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(r.date).toLocaleString()}
                      </span>
                    </div>
                    <Stars value={r.rating} />
                    {r.comment && <p className="mt-1">{r.comment}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      {status == "error" && <div>Error loading product</div>}
    </div>
  );
}
