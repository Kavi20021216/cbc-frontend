// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Paginator from "../../components/paginator"; 
// import Loader from "../../components/loader";
// import { BiTrash } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";

// export default function AdminReviewPage() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(20); 
//   const navigate = useNavigate();

//   // async function load() {
//   //   setLoading(true);
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     const res = await axios.get(
//   //       import.meta.env.VITE_BACKEND_URL + "/api/reviews/" + page + "/" + limit,
//   //       { headers: { Authorization: "Bearer " + token } }
//   //     );
//   //     setReviews(res.data.reviews || []);
//   //     setTotalPages(res.data.totalPages || 1);
//   //   } catch {
//   //     toast.error("Failed to load reviews");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }

//   // async function remove(id) {
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     await axios.delete(
//   //       import.meta.env.VITE_BACKEND_URL + "/api/reviews/" + id,
//   //       { headers: { Authorization: "Bearer " + token } }
//   //     );
//   //     toast.success("Deleted");
//   //     load();
//   //   } catch {
//   //     toast.error("Failed to delete");
//   //   }
//   // }

//   useEffect(() => {
//     load();
//   }, [page, limit]); 

//   return (
//     <div className="w-full h-full p-4 flex flex-col justify-between">
//       <div>
//         <h1 className="text-2xl font-bold mb-4">Reviews (Admin)</h1>

//         {loading ? (
//           <Loader/>
//         ) : (
//           <div className="overflow-auto">
//             <table className="w-full border">
//               <thead>
//                 <tr className="bg-[#ff9999]">
//                   <th className="p-2 border">Product ID</th>
//                   <th className="p-2 border">User</th>
//                   <th className="p-2 border">Rating</th>
//                   <th className="p-2 border">Comment</th>
//                   <th className="p-2 border">Date</th>
//                   <th className="p-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reviews.map((r) => (
//                   <tr key={r._id} className="border-b">
//                     <td className="p-2 border">{r.productId}</td>
//                     <td className="p-2 border">
//                       {r.name} ({r.email})
//                     </td>
//                     <td className="p-2 border">{r.rating}</td>
//                     <td className="p-2 border">{r.comment}</td>
//                     <td className="p-2 border">
//                       {new Date(r.date).toLocaleString()}
//                     </td>
//                     <td className="p-2 border">
//                       {/* <button
//                         className="px-3 py-1 bg-red-600 text-white rounded"
//                         onClick={() => remove(r._id)}
//                       >
//                         Delete
//                       </button> */}
//                       <BiTrash
// 											className="bg-red-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer"
// 											onClick={() => {
// 												const token = localStorage.getItem("token");
// 												if (token == null) {
// 													navigate("/login");
// 													return;
// 												}
// 												axios
// 													.delete(
// 														import.meta.env.VITE_BACKEND_URL +
// 															"/api/reviews" +
// 															r._id,
// 														{
// 															headers: {
// 																Authorization: `Bearer ${token}`,
// 															},
// 														}
// 													)
// 													.then((res) => {
// 														console.log("Review deleted successfully");
// 														console.log(res.data);
// 														toast.success("Review deleted successfully");
// 														setLoading(!loading);
// 													})
// 													.catch((error) => {
// 														console.error("Error deleting Review:", error);
// 														toast.error("Failed to delete Review");
// 													});
// 											}}
// 										/>

//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/*  Added paginator at bottom center */}
//       <div className="flex justify-center mt-6">
//         <Paginator
//           currentPage={page}
//           totalPages={totalPages}
//           setCurrentPage={setPage}
//           limit={limit}
//           setLimit={setLimit}
//           setLoading={setLoading}
//         />
//       </div>
//     </div>
//   );
// }


// AdminReviewPage.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Paginator from "../../components/paginator";
import Loader from "../../components/loader";

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(20);
  const navigate = useNavigate();

  // fetch on first load & whenever page/limit change or after a delete
  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${page}/${limit}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setReviews(res.data.reviews || []);
          setTotalPages(res.data.totalPages || 1);
        })
        .catch(() => toast.error("Failed to load reviews"))
        .finally(() => setIsLoading(false));
    }
  }, [isLoading, page, limit]);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-4">Reviews (Admin)</h1>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-[#ff9999]">
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
                    <td className="p-2 border">
                      {r.name} ({r.email})
                    </td>
                    <td className="p-2 border">{r.rating}</td>
                    <td className="p-2 border">{r.comment}</td>
                    <td className="p-2 border">
                      {r.date ? new Date(r.date).toLocaleString() : "-"}
                    </td>
                    <td className="p-2 border flex justify-center items-center">
                      <BiTrash
                        title="Delete review"
                        className="bg-red-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer"
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          if (!token) {
                            navigate("/login");
                            return;
                          }
                          axios
                            .delete(
                              
                              `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${r._id}`,
                              { headers: { Authorization: `Bearer ${token}` } }
                            )
                            .then(() => {
                              toast.success("Review deleted successfully");
                             
                              setIsLoading(true);
                            })
                            .catch((error) => {
                              console.error("Error deleting review:", error);
                              toast.error("Failed to delete review");
                            });
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <Paginator
          currentPage={page}
          totalPages={totalPages}
          setCurrentPage={setPage}
          limit={limit}
          setLimit={setLimit}
          setLoading={setIsLoading} 
        />
      </div>
    </div>
  );
}
