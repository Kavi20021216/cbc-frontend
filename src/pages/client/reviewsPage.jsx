// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import Header from "../../components/header";
// // import { BiSearch } from "react-icons/bi";

// // function Stars({ value, onChange }) {
// //   return (
// //     <div className="flex">
// //       {Array.from({ length: 5 }).map((_, i) => {
// //         const filled = i < value;
// //         return (
// //           <button
// //             key={i}
// //             type="button"
// //             className={"text-2xl mr-1 " + (filled ? "text-yellow-500" : "text-gray-300")}
// //             onClick={() => onChange && onChange(i + 1)}
// //             aria-label={`Rate ${i + 1} star${i + 1 > 1 ? "s" : ""}`}
// //             title={`Rate ${i + 1}`}
// //           >
// //             ★
// //           </button>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// // export default function ReviewPage() {
// //   const [productId, setProductId] = useState("");
// //   const [reviews, setReviews] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // add review form
// //   const [rating, setRating] = useState(5);
// //   const [comment, setComment] = useState("");

// //   async function fetchReviews(pid) {
// //     if (!pid) {
// //       setReviews([]);
// //       toast("Please enter a Product ID");
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(
// //         import.meta.env.VITE_BACKEND_URL + "/api/reviews/product/" + pid
// //       );
// //       setReviews(res.data || []);
// //       if (Array.isArray(res.data) && res.data.length > 0) {
// //         toast.success(`Found ${res.data.length} review(s)`);
// //       } else {
// //         toast("No reviews for this product");
// //       }
// //     } catch (e) {
// //       toast.error("Failed to load reviews");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   // try to load all reviews on page load (if your backend exposes GET /api/reviews)
// //   async function loadInitialReviews() {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
// //       if (Array.isArray(res.data)) {
// //         setReviews(res.data);
// //       }
// //       // no toast here to avoid noise on load
// //     } catch {
// //       // if the route doesn't exist, just ignore silently
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   async function addReview() {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       toast.error("Please login to add a review");
// //       return;
// //     }
// //     if (!productId) {
// //       toast.error("Enter a product ID first");
// //       return;
// //     }
// //     if (rating < 1 || rating > 5) {
// //       toast.error("Rating must be between 1 and 5");
// //       return;
// //     }
// //     try {
// //       await axios.post(
// //         import.meta.env.VITE_BACKEND_URL + "/api/reviews",
// //         { productId, rating, comment },
// //         { headers: { Authorization: "Bearer " + token } }
// //       );
// //       toast.success("Review added");
// //       // reset form
// //       setRating(5);
// //       setComment("");
// //       // refresh list for the current product
// //       await fetchReviews(productId);
// //     } catch (e) {
// //       toast.error(e?.response?.data?.message || "Failed to add review");
// //     }
// //   }

// //   function cancelReview() {
// //     setRating(5);
// //     setComment("");
// //   }

// //   // enter-to-search
// //   function handleKeyDown(e) {
// //     if (e.key === "Enter") {
// //       fetchReviews(productId);
// //     }
// //   }

// //   useEffect(() => {
// //     loadInitialReviews();
// //   }, []);

// //   return (
// //     <div className="w-full h-full flex flex-col">
// //       <Header />

// //       <div className="flex-1 p-4 flex flex-col items-center">
// //         <div className="w-full md:w-[800px] shadow-2xl p-4 rounded-lg">
// //           <h1 className="text-2xl font-bold mb-4">Reviews</h1>

// //           {/* search row */}
// //           <div className="flex items-center gap-2 mb-4">
// //             <input
// //               className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
// //               placeholder="Enter Product ID (e.g., PROD001)"
// //               value={productId}
// //               onChange={(e) => setProductId(e.target.value)}
// //               onKeyDown={handleKeyDown}
// //             />
// //             <button
// //               type="button"
// //               className="w-[48px] h-[40px] rounded-lg bg-accent text-white flex justify-center items-center"
// //               onClick={() => fetchReviews(productId)}
// //               title="Search"
// //               aria-label="Search"
// //             >
// //               <BiSearch className="text-2xl" />
// //             </button>
// //           </div>

// //           {/* add review (logged-in) */}
// //           <div className="border rounded-lg p-3 mb-4">
// //             <h2 className="font-semibold mb-2">Add a review</h2>

// //             {/* clickable stars */}
// //             <Stars value={rating} onChange={setRating} />

// //             {/* comment textarea under rating */}
// //             <textarea
// //               className="w-full h-[80px] border border-gray-300 rounded-lg p-2 mt-3"
// //               placeholder="Comment (optional)"
// //               value={comment}
// //               onChange={(e) => setComment(e.target.value)}
// //             ></textarea>

// //             {/* actions */}
// //             <div className="mt-3 flex gap-2 justify-end">
// //               <button
// //                 type="button"
// //                 className="w-[140px] h-[40px] rounded-lg bg-[#ffadab] cursor-pointer text-white" 
// //                 onClick={addReview}
// //               >
// //                 Submit
// //               </button>
// //               <button
// //                 type="button"
// //                 className="w-[140px] h-[40px] rounded-lg bg-white border border-[#ffadab]  cursor-pointer"
// //                 onClick={cancelReview}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>

// //           {/* list */}
// //           <div className="max-h-[55vh] overflow-y-auto">
// //             {loading ? (
// //               <p>Loading...</p>
// //             ) : reviews.length === 0 ? (
// //               <p className="text-gray-500">No reviews yet.</p>
// //             ) : (
// //               reviews.map((r) => (
// //                 <div key={r._id} className="border-b py-3">
// //                   <div className="flex justify-between">
// //                     <span className="font-semibold">{r.name}</span>
// //                     <span className="text-sm text-gray-500">
// //                       {new Date(r.date).toLocaleString()}
// //                     </span>
// //                   </div>
// //                   <Stars value={r.rating} />
// //                   {r.comment && <p className="mt-1">{r.comment}</p>}
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Header from "../../components/header";
// import { BiSearch } from "react-icons/bi";

// function Stars({ value, onChange }) {
//   return (
//     <div className="flex">
//       {Array.from({ length: 5 }).map((_, i) => {
//         const filled = i < value;
//         return (
//           <button
//             key={i}
//             type="button"
//             className={"text-2xl mr-1 " + (filled ? "text-yellow-500" : "text-gray-300")}
//             onClick={() => onChange && onChange(i + 1)}
//             aria-label={`Rate ${i + 1} star${i + 1 > 1 ? "s" : ""}`}
//             title={`Rate ${i + 1}`}
//           >
//             ★
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// export default function ReviewPage() {
//   const [productId, setProductId] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // add review form
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   async function fetchReviews(pid) {
//     if (!pid) {
//       setReviews([]);
//       toast("Please enter a Product ID");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         import.meta.env.VITE_BACKEND_URL + "/api/reviews/product/" + pid
//       );
//       setReviews(res.data || []);
//       if (Array.isArray(res.data) && res.data.length > 0) {
//         toast.success(`Found ${res.data.length} review(s)`);
//       } else {
//         toast("No reviews for this product");
//       }
//     } catch (e) {
//       toast.error("Failed to load reviews");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // try to load all reviews on page load (backend now exposes GET /api/reviews)
//   async function loadInitialReviews() {
//     setLoading(true);
//     try {
//       const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
//       if (Array.isArray(res.data)) {
//         setReviews(res.data);
//         toast.success(`Loaded ${res.data.length} review(s)`);
//       }
//       // no extra toast if not array
//     } catch {
//       // if the route doesn't exist, just ignore silently
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function addReview() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login to add a review");
//       return;
//     }
//     if (!productId) {
//       toast.error("Enter a product ID first");
//       return;
//     }
//     if (rating < 1 || rating > 5) {
//       toast.error("Rating must be between 1 and 5");
//       return;
//     }
//     try {
//       await axios.post(
//         import.meta.env.VITE_BACKEND_URL + "/api/reviews",
//         { productId, rating, comment },
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       toast.success("Review added");
//       // reset form
//       setRating(5);
//       setComment("");
//       // refresh list for the current product
//       await fetchReviews(productId);
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Failed to add review");
//     }
//   }

//   function cancelReview() {
//     setRating(5);
//     setComment("");
//   }

//   // enter-to-search
//   function handleKeyDown(e) {
//     if (e.key === "Enter") {
//       fetchReviews(productId);
//     }
//   }

//   useEffect(() => {
//     loadInitialReviews();
//   }, []);

//   return (
//     <div className="w-full h-full flex flex-col">
//       <Header />

//       <div className="flex-1 p-4 flex flex-col items-center">
//         <div className="w-full md:w-[800px] shadow-2xl p-4 rounded-lg">
//           <h1 className="text-2xl font-bold mb-4">Reviews</h1>

//           {/* search row */}
//           <div className="flex items-center gap-2 mb-4">
//             <input
//               className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
//               placeholder="Enter Product ID (e.g., PROD001)"
//               value={productId}
//               onChange={(e) => setProductId(e.target.value)}
//               onKeyDown={handleKeyDown}
//             />
//             <button
//               type="button"
//               className="w-[48px] h-[40px] rounded-lg bg-accent text-white flex justify-center items-center"
//               onClick={() => fetchReviews(productId)}
//               title="Search"
//               aria-label="Search"
//             >
//               <BiSearch className="text-2xl" />
//             </button>
//           </div>

//           {/* add review (logged-in) */}
//           <div className="border rounded-lg p-3 mb-4">
//             <h2 className="font-semibold mb-2">Add a review</h2>

//             {/* clickable stars */}
//             <Stars value={rating} onChange={setRating} />

//             {/* comment textarea under rating */}
//             <textarea
//               className="w-full h-[80px] border border-gray-300 rounded-lg p-2 mt-3"
//               placeholder="Comment (optional)"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             ></textarea>

//             {/* actions */}
//             <div className="mt-3 flex gap-2 justify-end">
//               <button
//                 type="button"
//                 className="w-[140px] h-[40px] rounded-lg bg-[#ffadab] cursor-pointer text-white" 
//                 onClick={addReview}
//               >
//                 Submit
//               </button>
//               <button
//                 type="button"
//                 className="w-[140px] h-[40px] rounded-lg bg-white border border-[#ffadab]  cursor-pointer"
//                 onClick={cancelReview}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>

//           {/* list */}
//           <div className="max-h-[55vh] overflow-y-auto">
//             {loading ? (
//               <p>Loading...</p>
//             ) : reviews.length === 0 ? (
//               <p className="text-gray-500">No reviews yet.</p>
//             ) : (
//               reviews.map((r) => (
//                 <div key={r._id} className="border-b py-3">
//                   <div className="flex justify-between">
//                     <span className="font-semibold">{r.name}</span>
//                     <span className="text-sm text-gray-500">
//                       {new Date(r.date).toLocaleString()}
//                     </span>
//                   </div>
//                   <Stars value={r.rating} />
//                   {r.comment && <p className="mt-1">{r.comment}</p>}
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Header from "../../components/header";
// import { BiSearch } from "react-icons/bi";

// function Stars({ value, onChange }) {
//   return (
//     <div className="flex">
//       {Array.from({ length: 5 }).map((_, i) => {
//         const filled = i < value;
//         return (
//           <button
//             key={i}
//             type="button"
//             className={"text-2xl mr-1 " + (filled ? "text-yellow-500" : "text-gray-300")}
//             onClick={() => onChange && onChange(i + 1)}
//             aria-label={`Rate ${i + 1} star${i + 1 > 1 ? "s" : ""}`}
//             title={`Rate ${i + 1}`}
//           >
//             ★
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// export default function ReviewPage() {
//   const [productId, setProductId] = useState("");
//   const [productName, setProductName] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [myReview, setMyReview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   async function fetchProduct(pid) {
//     try {
//       const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + pid);
//       setProductName(res.data?.name || "");
//     } catch {
//       setProductName("");
//     }
//   }

//   async function fetchPublicReviews(pid) {
//     const res = await axios.get(
//       import.meta.env.VITE_BACKEND_URL + "/api/reviews/product/" + pid
//     );
//     setReviews(res.data || []);
//   }

//   async function fetchMyReview(pid) {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setMyReview(null);
//       return;
//     }
//     try {
//       const res = await axios.get(
//         import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + pid,
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       setMyReview(res.data);
//       if (res.data) {
//         setRating(res.data.rating);
//         setComment(res.data.comment || "");
//       } else {
//         setRating(5);
//         setComment("");
//       }
//     } catch {
//       setMyReview(null);
//     }
//   }

//   async function fetchAllForProduct(pid) {
//     if (!pid) {
//       setReviews([]);
//       setMyReview(null);
//       setProductName("");
//       toast("Please enter a Product ID");
//       return;
//     }
//     setLoading(true);
//     try {
//       await fetchProduct(pid);
//       await fetchPublicReviews(pid);
//       await fetchMyReview(pid);
//       if (reviews.length > 0) {
//         toast.success(`Found ${reviews.length} review(s)`);
//       } else {
//         toast("No reviews for this product");
//       }
//     } catch {
//       toast.error("Failed to load reviews");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function loadInitialReviews() {
//     setLoading(true);
//     try {
//       const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
//       if (Array.isArray(res.data)) {
//         setReviews(res.data);
//       }
//     } catch {
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function addOrUpdateReview() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login to add a review");
//       return;
//     }
//     if (!productId) {
//       toast.error("Enter a product ID first");
//       return;
//     }
//     if (rating < 1 || rating > 5) {
//       toast.error("Rating must be between 1 and 5");
//       return;
//     }

//     try {
//       if (myReview) {
//         const res = await axios.put(
//           import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + productId,
//           { rating, comment },
//           { headers: { Authorization: "Bearer " + token } }
//         );
//         setMyReview(res.data.review);
//         toast.success("Review updated (pending approval)");
//       } else {
//         const res = await axios.post(
//           import.meta.env.VITE_BACKEND_URL + "/api/reviews",
//           { productId, rating, comment },
//           { headers: { Authorization: "Bearer " + token } }
//         );
//         setMyReview(res.data.review);
//         toast.success("Review added (pending approval)");
//       }
//       await fetchPublicReviews(productId);
//       await fetchProduct(productId);
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Failed to submit review");
//     }
//   }

//   async function deleteMine() {
//     const token = localStorage.getItem("token");
//     if (!token || !productId) return;
//     try {
//       await axios.delete(
//         import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + productId,
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       setMyReview(null);
//       toast.success("Review deleted");
//       await fetchPublicReviews(productId);
//     } catch {
//       toast.error("Failed to delete review");
//     }
//   }

//   function clearForm() {
//     setRating(5);
//     setComment("");
//   }

//   function handleKeyDown(e) {
//     if (e.key === "Enter") {
//       fetchAllForProduct(productId);
//     }
//   }

//   useEffect(() => {
//     loadInitialReviews();
//   }, []);

//   return (
//     <div className="w-full h-screen max-h-screen flex flex-col">
//       <Header />
//       {/* keep header visible; content below fills remaining height */}
//       <div className="w-full h-[calc(100%-100px)] overflow-y-auto">
//         <div className="w-full h-full flex flex-col items-center p-4">
//           <div className="w-full md:w-[800px] shadow-2xl p-4 rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">Reviews</h1>

//             {/* search row */}
//             <div className="flex items-center gap-2 mb-4">
//               <input
//                 className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
//                 placeholder="Enter Product ID (e.g., PROD001)"
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//                 onKeyDown={handleKeyDown}
//               />
//               <button
//                 type="button"
//                 className="w-[48px] h-[40px] rounded-lg bg-accent text-white flex justify-center items-center"
//                 onClick={() => fetchAllForProduct(productId)}
//                 title="Search"
//                 aria-label="Search"
//               >
//                 <BiSearch className="text-2xl" />
//               </button>
//             </div>

//             {/* product name (auto fill) */}
//             {productName && (
//               <div className="mb-3">
//                 <label className="text-sm font-semibold">Product Name</label>
//                 <input
//                   disabled
//                   value={productName}
//                   className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
//                 />
//               </div>
//             )}

//             {/* add / edit my review */}
//             <div className="border rounded-lg p-3 mb-4">
//               <h2 className="font-semibold mb-2">{myReview ? "Edit your review" : "Add a review"}</h2>

//               <Stars value={rating} onChange={setRating} />

//               <textarea
//                 className="w-full h-[80px] border border-gray-300 rounded-lg p-2 mt-3"
//                 placeholder="Comment (optional)"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               ></textarea>

//               {myReview && (
//                 <p className="text-sm mt-2">
//                   Status:{" "}
//                   <span className={"px-2 py-[2px] rounded " + (myReview.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
//                     {myReview.isApproved ? "Approved" : "Pending approval"}
//                   </span>
//                 </p>
//               )}

//               <div className="mt-3 flex gap-2 justify-end">
//                 {myReview && (
//                   <button
//                     type="button"
//                     className="w-[120px] h-[40px] rounded-lg bg-white border border-red-400 cursor-pointer"
//                     onClick={deleteMine}
//                   >
//                     Delete
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   className="w-[140px] h-[40px] rounded-lg bg-[#ffadab] cursor-pointer text-white"
//                   onClick={addOrUpdateReview}
//                 >
//                   {myReview ? "Update" : "Submit"}
//                 </button>
//                 <button
//                   type="button"
//                   className="w-[120px] h-[40px] rounded-lg bg-white border border-[#ffadab] cursor-pointer"
//                   onClick={clearForm}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>

//             {/* scroll segment for review list */}
//             <div className="border rounded-lg p-3">
//               <h2 className="font-semibold mb-2">All Reviews</h2>
//               <div className="h-[350px] overflow-y-auto">
//                 {loading ? (
//                   <p>Loading...</p>
//                 ) : reviews.length === 0 ? (
//                   <p className="text-gray-500">No reviews yet.</p>
//                 ) : (
//                   reviews.map((r) => (
//                     <div key={r._id} className="border-b py-3">
//                       <div className="flex justify-between">
//                         <span className="font-semibold">{r.name}</span>
//                         <span className="text-sm text-gray-500">
//                           {new Date(r.date).toLocaleString()}
//                         </span>
//                       </div>
//                       <Stars value={r.rating} />
//                       {r.comment && <p className="mt-1">{r.comment}</p>}
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Header from "../../components/header";
// import { BiSearch, BiEdit, BiTrash, BiSend, BiX } from "react-icons/bi";

// function Stars({ value, onChange }) {
//   return (
//     <div className="flex">
//       {Array.from({ length: 5 }).map((_, i) => {
//         const filled = i < value;
//         return (
//           <button
//             key={i}
//             type="button"
//             className={"text-2xl mr-1 " + (filled ? "text-yellow-500" : "text-gray-300")}
//             onClick={() => onChange && onChange(i + 1)}
//             aria-label={`Rate ${i + 1} star${i + 1 > 1 ? "s" : ""}`}
//             title={`Rate ${i + 1}`}
//           >
//             ★
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// export default function ReviewPage() {
//   const [productId, setProductId] = useState("");
//   const [productName, setProductName] = useState("");
//   const [reviews, setReviews] = useState([]);        // approved list (public)
//   const [myReview, setMyReview] = useState(null);    // current user review (can be pending)
//   const [loading, setLoading] = useState(false);

//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   // cache of product names for showing name on each review
//   const [productNames, setProductNames] = useState({});
//   const listTopRef = useRef(null);

//   function setProductNameInCache(pid, name) {
//     setProductNames((m) => ({ ...m, [pid]: name || "" }));
//   }

//   async function fetchProduct(pid) {
//     try {
//       const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + pid);
//       const name = res.data?.name || "";
//       setProductName(name);
//       setProductNameInCache(pid, name);
//     } catch {
//       setProductName("");
//       setProductNameInCache(pid, "");
//     }
//   }

//   async function fetchPublicReviews(pid) {
//     const res = await axios.get(
//       import.meta.env.VITE_BACKEND_URL + "/api/reviews/product/" + pid
//     );
//     setReviews(res.data || []);
//   }

//   async function fetchMyReview(pid) {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setMyReview(null);
//       return;
//     }
//     try {
//       const res = await axios.get(
//         import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + pid,
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       setMyReview(res.data);
//       if (res.data) {
//         setRating(res.data.rating);
//         setComment(res.data.comment || "");
//       } else {
//         setRating(5);
//         setComment("");
//       }
//     } catch {
//       setMyReview(null);
//     }
//   }

//   // combine approved reviews + my pending/approved review (so new review shows up immediately)
//   function getDisplayedReviews() {
//     if (!myReview) return reviews;

//     // replace if already present, or place mine at the top
//     const existsIndex = reviews.findIndex((r) => r._id === myReview._id);
//     if (existsIndex >= 0) {
//       const copy = [...reviews];
//       copy[existsIndex] = myReview; // keep latest
//       return copy;
//     }
//     // put my (pending) review at the top so it “falls into the list”
//     return [myReview, ...reviews];
//   }

//   async function fetchAllForProduct(pid) {
//     if (!pid) {
//       setReviews([]);
//       setMyReview(null);
//       setProductName("");
//       toast("Please enter a Product ID");
//       return;
//     }
//     setLoading(true);
//     try {
//       await fetchProduct(pid);
//       await fetchPublicReviews(pid);
//       await fetchMyReview(pid);
//       // scroll list to top after search
//       setTimeout(() => {
//         if (listTopRef.current) listTopRef.current.scrollIntoView({ behavior: "smooth" });
//       }, 0);
//     } catch {
//       toast.error("Failed to load reviews");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // initial: load some approved (optional)
//   async function loadInitialReviews() {
//     setLoading(true);
//     try {
//       const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
//       if (Array.isArray(res.data)) {
//         setReviews(res.data);
//         // opportunistic name caching (simple and safe)
//         const ids = Array.from(new Set(res.data.map((r) => r.productId)));
//         ids.forEach(async (pid) => {
//           if (!productNames[pid]) {
//             try {
//               const pr = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + pid);
//               setProductNameInCache(pid, pr.data?.name || "");
//             } catch {
//               setProductNameInCache(pid, "");
//             }
//           }
//         });
//       }
//     } catch {
//       // ignore if route not exists
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function addOrUpdateReview() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login to add a review");
//       return;
//     }
//     if (!productId) {
//       toast.error("Enter a product ID first");
//       return;
//     }
//     if (rating < 1 || rating > 5) {
//       toast.error("Rating must be between 1 and 5");
//       return;
//     }

//     try {
//       if (myReview) {
//         // update -> back to pending
//         const res = await axios.put(
//           import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + productId,
//           { rating, comment },
//           { headers: { Authorization: "Bearer " + token } }
//         );
//         setMyReview(res.data.review);
//         toast.success("Review updated (pending approval)");
//       } else {
//         // create -> pending
//         const res = await axios.post(
//           import.meta.env.VITE_BACKEND_URL + "/api/reviews",
//           { productId, rating, comment },
//           { headers: { Authorization: "Bearer " + token } }
//         );
//         setMyReview(res.data.review);
//         toast.success("Review added (pending approval)");
//       }

//       // refresh public list; my pending stays visible via getDisplayedReviews()
//       await fetchPublicReviews(productId);
//       await fetchProduct(productId);

//       // move view to the top of list so new/updated review is visible
//       setTimeout(() => {
//         if (listTopRef.current) listTopRef.current.scrollIntoView({ behavior: "smooth" });
//       }, 0);
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Failed to submit review");
//     }
//   }

//   async function deleteMine() {
//     const token = localStorage.getItem("token");
//     if (!token || !productId) return;
//     try {
//       await axios.delete(
//         import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + productId,
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       setMyReview(null);
//       toast.success("Review deleted");
//       await fetchPublicReviews(productId);
//     } catch {
//       toast.error("Failed to delete review");
//     }
//   }

//   function clearForm() {
//     setRating(5);
//     setComment("");
//   }

//   function handleKeyDown(e) {
//     if (e.key === "Enter") {
//       fetchAllForProduct(productId);
//     }
//   }

//   useEffect(() => {
//     loadInitialReviews();
//   }, []);

//   const displayedReviews = getDisplayedReviews();

//   return (
//     <div className="w-full h-screen max-h-screen flex flex-col">
//       <Header />
//       <div className="w-full h-[calc(100%-100px)] overflow-y-auto">
//         <div className="w-full h-full flex flex-col items-center p-4">
//           <div className="w-full md:w-[800px] shadow-2xl p-4 rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">Reviews</h1>

//             {/* search row */}
//             <div className="flex items-center gap-2 mb-4">
//               <input
//                 className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
//                 placeholder="Enter Product ID (e.g., PROD001)"
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//                 onKeyDown={handleKeyDown}
//               />
//               <button
//                 type="button"
//                 className="w-[48px] h-[40px] rounded-lg bg-accent text-white flex justify-center items-center"
//                 onClick={() => fetchAllForProduct(productId)}
//                 title="Search"
//                 aria-label="Search"
//               >
//                 <BiSearch className="text-2xl" />
//               </button>
//             </div>

//             {/* product name (auto fill) */}
//             {productName && (
//               <div className="mb-3">
//                 <label className="text-sm font-semibold">Product Name</label>
//                 <input
//                   disabled
//                   value={productName}
//                   className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
//                 />
//               </div>
//             )}

//             {/* add / edit my review */}
//             <div className="border rounded-lg p-3 mb-4">
//               <h2 className="font-semibold mb-2">{myReview ? "Edit your review" : "Add a review"}</h2>

//               <Stars value={rating} onChange={setRating} />

//               <textarea
//                 className="w-full h-[80px] border border-gray-300 rounded-lg p-2 mt-3"
//                 placeholder="Comment (optional)"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               ></textarea>

//               {myReview && (
//                 <p className="text-sm mt-2">
//                   Status:{" "}
//                   <span className={"px-2 py-[2px] rounded " + (myReview.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
//                     {myReview.isApproved ? "Approved" : "Pending approval"}
//                   </span>
//                 </p>
//               )}

//               <div className="mt-3 flex gap-2 justify-end">
//                 {myReview && (
//                   <button
//                     type="button"
//                     className="w-[120px] h-[40px] rounded-lg bg-white border border-red-400 cursor-pointer flex items-center justify-center gap-2"
//                     onClick={deleteMine}
//                     title="Delete"
//                   >
//                     <BiTrash /> Delete
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   className="w-[140px] h-[40px] rounded-lg bg-[#ffadab] cursor-pointer text-white flex items-center justify-center gap-2"
//                   onClick={addOrUpdateReview}
//                   title={myReview ? "Update" : "Submit"}
//                 >
//                   {myReview ? <><BiEdit /> Update</> : <><BiSend /> Submit</>}
//                 </button>
//                 <button
//                   type="button"
//                   className="w-[120px] h-[40px] rounded-lg bg-white border border-[#ffadab] cursor-pointer flex items-center justify-center gap-2"
//                   onClick={clearForm}
//                   title="Cancel"
//                 >
//                   <BiX /> Cancel
//                 </button>
//               </div>
//             </div>

//             {/* scroll segment for review list (shows product name on each review) */}
//             <div className="border rounded-lg p-3">
//               <h2 className="font-semibold mb-2">All Reviews</h2>
//               <div ref={listTopRef} />
//               <div className="h-[350px] overflow-y-auto">
//                 {loading ? (
//                   <p>Loading...</p>
//                 ) : displayedReviews.length === 0 ? (
//                   <p className="text-gray-500">No reviews yet.</p>
//                 ) : (
//                   displayedReviews.map((r) => {
//                     const isMine = myReview && r._id === myReview._id;
//                     const nameToShow =
//                       productId && r.productId === productId
//                         ? productName || r.productId
//                         : (productNames[r.productId] || r.productId);

//                     return (
//                       <div key={r._id} className="border-b py-3">
//                         <div className="flex justify-between items-center">
//                           <div className="flex flex-col">
//                             <span className="font-semibold">{r.name}</span>
//                             {/* show product name under user name */}
//                             <span className="text-xs text-gray-500">{nameToShow}</span>
//                           </div>
//                           <span className="text-sm text-gray-500">
//                             {new Date(r.date).toLocaleString()}
//                           </span>
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <Stars value={r.rating} />
//                           {isMine && (
//                             <div className="flex items-center gap-2">
//                               <button
//                                 className="px-3 py-1 bg-gray-100 border rounded flex items-center gap-1"
//                                 onClick={() => {
//                                   setRating(r.rating);
//                                   setComment(r.comment || "");
//                                   // scroll to form top
//                                   window.scrollTo({ top: 0, behavior: "smooth" });
//                                 }}
//                                 title="Edit"
//                               >
//                                 <BiEdit /> Edit
//                               </button>
//                               <button
//                                 className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1"
//                                 onClick={deleteMine}
//                                 title="Delete"
//                               >
//                                 <BiTrash /> Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>

//                         {r.comment && <p className="mt-1">{r.comment}</p>}

//                         {!r.isApproved && isMine && (
//                           <p className="text-xs mt-1">
//                             <span className="px-2 py-[2px] rounded bg-yellow-100 text-yellow-700">
//                               Pending approval
//                             </span>
//                           </p>
//                         )}
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Header from "../../components/header";
// import { BiSearch, BiEdit, BiTrash, BiSend, BiX } from "react-icons/bi";

// function Stars({ value, onChange }) {
//   return (
//     <div className="flex">
//       {Array.from({ length: 5 }).map((_, i) => {
//         const filled = i < value;
//         return (
//           <button
//             key={i}
//             type="button"
//             className={"text-2xl mr-1 " + (filled ? "text-yellow-500" : "text-gray-300")}
//             onClick={() => onChange && onChange(i + 1)}
//             aria-label={`Rate ${i + 1} star${i + 1 > 1 ? "s" : ""}`}
//             title={`Rate ${i + 1}`}
//           >
//             ★
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// export default function ReviewPage() {
//   const [productId, setProductId] = useState("");
//   const [productName, setProductName] = useState("");
//   const [reviews, setReviews] = useState([]);        // list shown on page
//   const [myReview, setMyReview] = useState(null);    // current user's review
//   const [loading, setLoading] = useState(false);

//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   // cache of product names for showing name on each review
//   const [productNames, setProductNames] = useState({});
//   const listTopRef = useRef(null);

//   function setProductNameInCache(pid, name) {
//     setProductNames((m) => ({ ...m, [pid]: name || "" }));
//   }

//   function upsertReviewInList(review) {
//     setReviews((prev) => {
//       const idx = prev.findIndex((r) => r._id === review._id);
//       if (idx >= 0) {
//         const copy = [...prev];
//         copy[idx] = review;
//         return copy;
//       }
//       return [review, ...prev]; // new review at top
//     });
//   }

//   function removeReviewFromList(id) {
//     setReviews((prev) => prev.filter((r) => r._id !== id));
//   }

//   async function fetchProduct(pid) {
//     try {
//       const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + pid);
//       const name = res.data?.name || "";
//       setProductName(name);
//       setProductNameInCache(pid, name);
//     } catch {
//       setProductName("");
//       setProductNameInCache(pid, "");
//     }
//   }

//   // NOTE: backend should return all reviews for product (no approval filter)
//   async function fetchProductReviews(pid) {
//     const res = await axios.get(
//       import.meta.env.VITE_BACKEND_URL + "/api/reviews/product/" + pid
//     );
//     setReviews(res.data || []);
//   }

//   async function fetchMyReview(pid) {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setMyReview(null);
//       return;
//     }
//     try {
//       const res = await axios.get(
//         import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + pid,
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       setMyReview(res.data);
//       if (res.data) {
//         setRating(res.data.rating);
//         setComment(res.data.comment || "");
//       } else {
//         setRating(5);
//         setComment("");
//       }
//     } catch {
//       setMyReview(null);
//     }
//   }

//   async function fetchAllForProduct(pid) {
//     if (!pid) {
//       setReviews([]);
//       setMyReview(null);
//       setProductName("");
//       toast("Please enter a Product ID");
//       return;
//     }
//     setLoading(true);
//     try {
//       await fetchProduct(pid);
//       await fetchProductReviews(pid);
//       await fetchMyReview(pid);
//       setTimeout(() => {
//         if (listTopRef.current) listTopRef.current.scrollIntoView({ behavior: "smooth" });
//       }, 0);
//     } catch {
//       toast.error("Failed to load reviews");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // initial: load some recent reviews (optional public feed)
//   async function loadInitialReviews() {
//     setLoading(true);
//     try {
//       const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
//       if (Array.isArray(res.data)) {
//         setReviews(res.data);
//         // cache product names
//         const ids = Array.from(new Set(res.data.map((r) => r.productId)));
//         ids.forEach(async (pid) => {
//           if (!productNames[pid]) {
//             try {
//               const pr = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + pid);
//               setProductNameInCache(pid, pr.data?.name || "");
//             } catch {
//               setProductNameInCache(pid, "");
//             }
//           }
//         });
//       }
//     } catch {
//       // ignore if route not exists
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function addOrUpdateReview() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login to add a review");
//       return;
//     }
//     if (!productId) {
//       toast.error("Enter a product ID first");
//       return;
//     }
//     if (rating < 1 || rating > 5) {
//       toast.error("Rating must be between 1 and 5");
//       return;
//     }

//     try {
//       if (myReview) {
//         // update
//         const res = await axios.put(
//           import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + productId,
//           { rating, comment },
//           { headers: { Authorization: "Bearer " + token } }
//         );
//         setMyReview(res.data.review);
//         upsertReviewInList(res.data.review);
//         toast.success("Review updated");
//       } else {
//         // create
//         const res = await axios.post(
//           import.meta.env.VITE_BACKEND_URL + "/api/reviews",
//           { productId, rating, comment },
//           { headers: { Authorization: "Bearer " + token } }
//         );
//         setMyReview(res.data.review);
//         upsertReviewInList(res.data.review);
//         toast.success("Review added");
//       }

//       // ensure product name is shown
//       if (!productName) {
//         await fetchProduct(productId);
//       }

//       // jump to top
//       setTimeout(() => {
//         if (listTopRef.current) listTopRef.current.scrollIntoView({ behavior: "smooth" });
//       }, 0);
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Failed to submit review");
//     }
//   }

//   async function deleteMine() {
//     const token = localStorage.getItem("token");
//     if (!token || !productId || !myReview) return;
//     try {
//       await axios.delete(
//         import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + productId,
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       removeReviewFromList(myReview._id);
//       setMyReview(null);
//       toast.success("Review deleted");
//     } catch {
//       toast.error("Failed to delete review");
//     }
//   }

//   function clearForm() {
//     setRating(5);
//     setComment("");
//   }

//   function handleKeyDown(e) {
//     if (e.key === "Enter") {
//       fetchAllForProduct(productId);
//     }
//   }

//   useEffect(() => {
//     loadInitialReviews();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="w-full h-screen max-h-screen flex flex-col">
//       <Header />
//       <div className="w-full h-[calc(100%-100px)] overflow-y-auto">
//         <div className="w-full h-full flex flex-col items-center p-4">
//           <div className="w-full md:w-[800px] shadow-2xl p-4 rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">Reviews</h1>

//             {/* search row */}
//             <div className="flex items-center gap-2 mb-4">
//               <input
//                 className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
//                 placeholder="Enter Product ID (e.g., PROD001)"
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//                 onKeyDown={handleKeyDown}
//               />
//               <button
//                 type="button"
//                 className="w-[48px] h-[40px] rounded-lg bg-accent text-white flex justify-center items-center"
//                 onClick={() => fetchAllForProduct(productId)}
//                 title="Search"
//                 aria-label="Search"
//               >
//                 <BiSearch className="text-2xl" />
//               </button>
//             </div>

//             {/* product name (auto fill) */}
//             {productName && (
//               <div className="mb-3">
//                 <label className="text-sm font-semibold">Product Name</label>
//                 <input
//                   disabled
//                   value={productName}
//                   className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
//                 />
//               </div>
//             )}

//             {/* add / edit my review */}
//             <div className="border rounded-lg p-3 mb-4">
//               <h2 className="font-semibold mb-2">{myReview ? "Edit your review" : "Add a review"}</h2>

//               <Stars value={rating} onChange={setRating} />

//               <textarea
//                 className="w-full h-[80px] border border-gray-300 rounded-lg p-2 mt-3"
//                 placeholder="Comment (optional)"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               ></textarea>

//               <div className="mt-3 flex gap-2 justify-end">
//                 {myReview && (
//                   <button
//                     type="button"
//                     className="w-[120px] h-[40px] rounded-lg bg-white border border-red-400 cursor-pointer flex items-center justify-center gap-2"
//                     onClick={deleteMine}
//                     title="Delete"
//                   >
//                     <BiTrash /> Delete
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   className="w-[140px] h-[40px] rounded-lg bg-[#ffadab] cursor-pointer text-white flex items-center justify-center gap-2"
//                   onClick={addOrUpdateReview}
//                   title={myReview ? "Update" : "Submit"}
//                 >
//                   {myReview ? <><BiEdit /> Update</> : <><BiSend /> Submit</>}
//                 </button>
//                 <button
//                   type="button"
//                   className="w-[120px] h-[40px] rounded-lg bg-white border border-[#ffadab] cursor-pointer flex items-center justify-center gap-2"
//                   onClick={clearForm}
//                   title="Cancel"
//                 >
//                   <BiX /> Cancel
//                 </button>
//               </div>
//             </div>

//             {/* scroll segment for review list (shows product name on each review) */}
//             <div className="border rounded-lg p-3">
//               <h2 className="font-semibold mb-2">All Reviews</h2>
//               <div ref={listTopRef} />
//               <div className="h-[350px] overflow-y-auto">
//                 {loading ? (
//                   <p>Loading...</p>
//                 ) : reviews.length === 0 ? (
//                   <p className="text-gray-500">No reviews yet.</p>
//                 ) : (
//                   reviews.map((r) => {
//                     const isMine = myReview && r._id === myReview._id;
//                     const nameToShow =
//                       productId && r.productId === productId
//                         ? productName || r.productId
//                         : (productNames[r.productId] || r.productId);

//                     return (
//                       <div key={r._id} className="border-b py-3">
//                         <div className="flex justify-between items-center">
//                           <div className="flex flex-col">
//                             <span className="font-semibold">{r.name}</span>
//                             <span className="text-xs text-gray-500">{nameToShow}</span>
//                           </div>
//                           <span className="text-sm text-gray-500">
//                             {new Date(r.date).toLocaleString()}
//                           </span>
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <Stars value={r.rating} />
//                           {isMine && (
//                             <div className="flex items-center gap-2">
//                               <button
//                                 className="px-3 py-1 bg-gray-100 border rounded flex items-center gap-1"
//                                 onClick={() => {
//                                   setRating(r.rating);
//                                   setComment(r.comment || "");
//                                   window.scrollTo({ top: 0, behavior: "smooth" });
//                                 }}
//                                 title="Edit"
//                               >
//                                 <BiEdit /> Edit
//                               </button>
//                               <button
//                                 className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1"
//                                 onClick={deleteMine}
//                                 title="Delete"
//                               >
//                                 <BiTrash /> Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>

//                         {r.comment && <p className="mt-1">{r.comment}</p>}
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Header from "../../components/header";
// import { BiSearch, BiEdit, BiTrash, BiSend, BiX } from "react-icons/bi";

// function Stars({ value, onChange }) {
//   return (
//     <div className="flex">
//       {Array.from({ length: 5 }).map((_, i) => {
//         const filled = i < value;
//         return (
//           <button
//             key={i}
//             type="button"
//             className={"text-2xl mr-1 " + (filled ? "text-yellow-500" : "text-gray-300")}
//             onClick={() => onChange && onChange(i + 1)}
//             aria-label={`Rate ${i + 1} star${i + 1 > 1 ? "s" : ""}`}
//             title={`Rate ${i + 1}`}
//           >
//             ★
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// export default function ReviewPage() {
//   const [productId, setProductId] = useState("");
//   const [productName, setProductName] = useState("");
//   const [reviews, setReviews] = useState([]);    // approved list
//   const [loading, setLoading] = useState(false);

//   // add form
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   // edit modal
//   const [editOpen, setEditOpen] = useState(false);
//   const [editReviewId, setEditReviewId] = useState(null);
//   const [editRating, setEditRating] = useState(5);
//   const [editComment, setEditComment] = useState("");

//   const [productNames, setProductNames] = useState({});
//   const listTopRef = useRef(null);

//   function setProductNameInCache(pid, name) {
//     setProductNames((m) => ({ ...m, [pid]: name || "" }));
//   }

//   function upsertReviewInList(review) {
//     setReviews((prev) => {
//       const idx = prev.findIndex((r) => r._id === review._id);
//       if (idx >= 0) {
//         const copy = [...prev];
//         copy[idx] = review;
//         return copy;
//       }
//       return [review, ...prev];
//     });
//   }

//   function removeReviewFromList(id) {
//     setReviews((prev) => prev.filter((r) => r._id !== id));
//   }

//   async function fetchProduct(pid) {
//     try {
//       const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + pid);
//       const name = res.data?.name || "";
//       setProductName(name);
//       setProductNameInCache(pid, name);
//     } catch {
//       setProductName("");
//       setProductNameInCache(pid, "");
//     }
//   }

//   async function fetchProductReviews(pid) {
//     const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews/product/" + pid);
//     setReviews(res.data || []);
//   }

//   async function fetchAllForProduct(pid) {
//     if (!pid) {
//       setReviews([]);
//       setProductName("");
//       toast("Please enter a Product ID");
//       return;
//     }
//     setLoading(true);
//     try {
//       await fetchProduct(pid);
//       await fetchProductReviews(pid);
//       setTimeout(() => {
//         if (listTopRef.current) listTopRef.current.scrollIntoView({ behavior: "smooth" });
//       }, 0);
//     } catch {
//       toast.error("Failed to load reviews");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function loadInitialReviews() {
//     setLoading(true);
//     try {
//       const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
//       if (Array.isArray(res.data)) {
//         setReviews(res.data);
//         const ids = Array.from(new Set(res.data.map((r) => r.productId)));
//         ids.forEach(async (pid) => {
//           if (!productNames[pid]) {
//             try {
//               const pr = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + pid);
//               setProductNameInCache(pid, pr.data?.name || "");
//             } catch {
//               setProductNameInCache(pid, "");
//             }
//           }
//         });
//       }
//     } catch {}
//     finally { setLoading(false); }
//   }

//   async function addReview() {
//     const token = localStorage.getItem("token");
//     if (!token) { toast.error("Please login to add a review"); return; }
//     if (!productId) { toast.error("Enter a product ID first"); return; }
//     if (rating < 1 || rating > 5) { toast.error("Rating must be between 1 and 5"); return; }

//     try {
//       const res = await axios.post(
//         import.meta.env.VITE_BACKEND_URL + "/api/reviews",
//         { productId, rating, comment },
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       upsertReviewInList(res.data.review);
//       toast.success("Review added");

//       // clear form (stay as add mode)
//       setRating(5);
//       setComment("");

//       if (!productName) { await fetchProduct(productId); }
//       setTimeout(() => { if (listTopRef.current) listTopRef.current.scrollIntoView({ behavior: "smooth" }); }, 0);
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Failed to submit review");
//     }
//   }

//   function openEditPopup(r) {
//     setEditReviewId(r._id);
//     setEditRating(r.rating);
//     setEditComment(r.comment || "");
//     setEditOpen(true);
//   }

//   async function saveEdit() {
//     const token = localStorage.getItem("token");
//     if (!token) { toast.error("Please login"); return; }
//     if (!productId) { toast.error("Enter a product ID first"); return; }
//     try {
//       const res = await axios.put(
//         import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + productId,
//         { rating: editRating, comment: editComment },
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       upsertReviewInList(res.data.review);
//       toast.success("Review updated");
//       setEditOpen(false);
//     } catch {
//       toast.error("Failed to update review");
//     }
//   }

//   async function deleteMine(r) {
//     const token = localStorage.getItem("token");
//     if (!token) { toast.error("Please login"); return; }
//     try {
//       await axios.delete(
//         import.meta.env.VITE_BACKEND_URL + "/api/reviews/my/" + r.productId,
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       removeReviewFromList(r._id);
//       toast.success("Review deleted");
//     } catch {
//       toast.error("Failed to delete review");
//     }
//   }

//   function handleKeyDown(e) {
//     if (e.key === "Enter") fetchAllForProduct(productId);
//   }

//   useEffect(() => { loadInitialReviews(); }, []);

//   return (
//     <div className="w-full h-screen max-h-screen flex flex-col">
//       <Header />
//       <div className="w-full h-[calc(100%-100px)] overflow-y-auto">
//         <div className="w-full h-full flex flex-col items-center p-4">
//           <div className="w-full md:w-[800px] shadow-2xl p-4 rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">Reviews</h1>

//             {/* search row */}
//             <div className="flex items-center gap-2 mb-4">
//               <input
//                 className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
//                 placeholder="Enter Product ID (e.g., PROD001)"
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//                 onKeyDown={handleKeyDown}
//               />
//               <button
//                 type="button"
//                 className="w-[48px] h-[40px] rounded-lg bg-accent text-white flex justify-center items-center"
//                 onClick={() => fetchAllForProduct(productId)}
//                 title="Search"
//                 aria-label="Search"
//               >
//                 <BiSearch className="text-2xl" />
//               </button>
//             </div>

//             {/* product name (auto fill) */}
//             {productName && (
//               <div className="mb-3">
//                 <label className="text-sm font-semibold">Product Name</label>
//                 <input
//                   disabled
//                   value={productName}
//                   className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
//                 />
//               </div>
//             )}

//             {/* add review (always add mode) */}
//             <div className="border rounded-lg p-3 mb-4">
//               <h2 className="font-semibold mb-2">Add a review</h2>
//               <Stars value={rating} onChange={setRating} />
//               <textarea
//                 className="w-full h-[80px] border border-gray-300 rounded-lg p-2 mt-3"
//                 placeholder="Comment (optional)"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               ></textarea>
//               <div className="mt-3 flex gap-2 justify-end">
//                 <button
//                   type="button"
//                   className="w-[140px] h-[40px] rounded-lg bg-[#ffadab] cursor-pointer text-white flex items-center justify-center gap-2"
//                   onClick={addReview}
//                   title="Submit"
//                 >
//                   <BiSend /> Submit
//                 </button>
//                 <button
//                   type="button"
//                   className="w-[120px] h-[40px] rounded-lg bg-white border border-[#ffadab] cursor-pointer flex items-center justify-center gap-2"
//                   onClick={() => { setRating(5); setComment(""); }}
//                   title="Cancel"
//                 >
//                   <BiX /> Cancel
//                 </button>
//               </div>
//             </div>

//             {/* list */}
//             <div className="border rounded-lg p-3">
//               <h2 className="font-semibold mb-2">All Reviews</h2>
//               <div ref={listTopRef} />
//               <div className="h-[350px] overflow-y-auto">
//                 {loading ? (
//                   <p>Loading...</p>
//                 ) : reviews.length === 0 ? (
//                   <p className="text-gray-500">No reviews yet.</p>
//                 ) : (
//                   reviews.map((r) => {
//                     const nameToShow =
//                       productId && r.productId === productId
//                         ? productName || r.productId
//                         : (productNames[r.productId] || r.productId);
//                     const isMine = (localStorage.getItem("token") && r.email) ? false : false; 
//                     // Note: We don't decode token here. For edit/delete visibility below,
//                     // we simply show buttons for items where user will try; backend will authorize.
//                     // If you want to show only for the user, add the decoded email to state.

//                     return (
//                       <div key={r._id} className="border-b py-3">
//                         <div className="flex justify-between items-center">
//                           <div className="flex flex-col">
//                             <span className="font-semibold">{r.name}</span>
//                             <span className="text-xs text-gray-500">{nameToShow}</span>
//                           </div>
//                           <span className="text-sm text-gray-500">
//                             {new Date(r.date).toLocaleString()}
//                           </span>
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <Stars value={r.rating} />
//                           {/* Show edit/delete for all; backend ensures ownership */}
//                           <div className="flex items-center gap-2">
//                             <button
//                               className="px-3 py-1 bg-gray-100 border rounded flex items-center gap-1"
//                               onClick={() => openEditPopup(r)}
//                               title="Edit"
//                             >
//                               <BiEdit /> Edit
//                             </button>
//                             <button
//                               className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1"
//                               onClick={() => deleteMine(r)}
//                               title="Delete"
//                             >
//                               <BiTrash /> Delete
//                             </button>
//                           </div>
//                         </div>

//                         {r.comment && <p className="mt-1">{r.comment}</p>}
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Edit popup */}
//       {editOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center z-50">
//           <div className="w-[95%] max-w-[500px] bg-white rounded-lg p-4">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="text-xl font-semibold">Edit Review</h3>
//               <button className="px-3 py-1 border rounded" onClick={() => setEditOpen(false)}>X</button>
//             </div>
//             <div className="mb-3">
//               <label className="text-sm font-semibold">Rating</label>
//               <div className="mt-1">
//                 <Stars value={editRating} onChange={setEditRating} />
//               </div>
//             </div>
//             <div className="mb-3">
//               <label className="text-sm font-semibold">Comment</label>
//               <textarea
//                 className="w-full h-[80px] border rounded p-2"
//                 value={editComment}
//                 onChange={(e) => setEditComment(e.target.value)}
//               />
//             </div>
//             <div className="flex justify-end gap-2">
//               <button className="px-4 py-2 bg-white border rounded" onClick={() => setEditOpen(false)}>Cancel</button>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={saveEdit}>Save</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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
