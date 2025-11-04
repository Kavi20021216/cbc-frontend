// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Loader from "../../components/loader";
// import ImageSlider from "../../components/imageSlider";
// import { addToCart, getCart } from "../../utils/cart";
// import toast from "react-hot-toast";

// export default function ProductOverViewPage() {
// 	const params = useParams();
// 	const [product, setProduct] = useState(null);
// 	const navigate = useNavigate();
// 	const [status, setStatus] = useState("loading"); //loading, success, error
// 	useEffect(() => {
// 		if (status === "loading") {
// 			axios
// 				.get(
// 					import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productId}`
// 				)
// 				.then((res) => {
// 					setProduct(res.data);
// 					setStatus("success");
// 				})
// 				.catch(() => {
// 					setStatus("error");
// 				});
// 		}
// 	}, [status]);

// 	return (
// 		<div className="w-full h-full">
// 			{status == "loading" && <Loader />}
// 			{status == "success" && (
// 				<div className="w-full h-full flex flex-col md:flex-row ">
// 					<h1 className="text-2xl my-4 text-center font-bold md:hidden">
// 						{product.name}{" "}
// 						<span className="font-light">{product.altNames.join(" | ")}</span>
// 					</h1>

// 					<div className="w-full md:w-[49%] h-full flex flex-col justify-center items-center ">
// 						<ImageSlider images={product.images} />
// 					</div>
// 					<div className="w-full md:w-[49%] h-full flex flex-col items-center pt-[50px] ">
// 						<h1 className="text-2xl font-bold hidden md:block">
// 							{product.name}{" "}
// 							<span className="font-light">{product.altNames.join(" | ")}</span>
// 						</h1>
// 						<p className="text-lg p-2">{product.description}</p>
// 						<div className="w-full flex flex-col items-center mt-[20px]">
// 							{product.labelledPrice > product.price ? (
// 								<div>
// 									<span className="text-2xl font-semibold  line-through mr-[20px]">
// 										{product.labelledPrice.toLocaleString("en-US", {
// 											minimumFractionDigits: 2,
// 											maximumFractionDigits: 2,
// 										})}
// 									</span>
// 									<span className="text-3xl font-bold ">
// 										{product.price.toLocaleString("en-US", {
// 											minimumFractionDigits: 2,
// 											maximumFractionDigits: 2,
// 										})}
// 									</span>
// 								</div>
// 							) : (
// 								<div>
// 									<span className="text-3xl font-bold ">
// 										{product.price.toLocaleString("en-US", {
// 											minimumFractionDigits: 2,
// 											maximumFractionDigits: 2,
// 										})}
// 									</span>
// 								</div>
// 							)}
// 						</div>
// 						<div className="w-full flex flex-row justify-center items-center mt-[20px]  gap-[10px]">
// 							<button
// 								onClick={() => {
// 									navigate("/checkout", {
// 										state: {
// 											items: [
// 												{
// 													productId: product.productId,
// 													quantity: 1,
// 													name: product.name,
// 													image: product.images[0],
// 													price: product.price,
// 												},
// 											],
// 										},
// 									});
// 								}}
// 								className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-900 border-[3px] border-blue-900 hover:bg-white hover:text-blue-900"
// 							>
// 								Buy Now
// 							</button>
// 							<button
// 								className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-600 border-[3px] border-blue-600 hover:bg-white hover:text-blue-600"
// 								onClick={() => {
// 									addToCart(product, 1);
// 									toast.success("Product added to cart");
// 									console.log(getCart());
// 								}}
// 							>
// 								Add to Cart
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 			{status == "error" && <div>Error loading product</div>}
// 		</div>
// 	);
// }

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Loader from "../../components/loader";
// import ImageSlider from "../../components/imageSlider";
// import { addToCart, getCart } from "../../utils/cart";
// import toast from "react-hot-toast";

// export default function ProductOverViewPage() {
// 	const params = useParams();
// 	const [product, setProduct] = useState(null);
// 	const navigate = useNavigate();
// 	const [status, setStatus] = useState("loading"); //loading, success, error

// 	// --- added: reviews state for this product ---
// 	const [reviews, setReviews] = useState([]);
// 	const [reviewsLoading, setReviewsLoading] = useState(false);

// 	// --- added: simple read-only stars renderer ---
// 	function Stars({ value }) {
// 		return (
// 			<div className="flex">
// 				{Array.from({ length: 5 }).map((_, i) => (
// 					<span
// 						key={i}
// 						className={"text-xl " + (i < value ? "text-yellow-500" : "text-gray-300")}
// 					>
// 						★
// 					</span>
// 				))}
// 			</div>
// 		);
// 	}

// 	useEffect(() => {
// 		if (status === "loading") {
// 			axios
// 				.get(import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productId}`)
// 				.then((res) => {
// 					setProduct(res.data);
// 					setStatus("success");
// 				})
// 				.catch(() => {
// 					setStatus("error");
// 				});
// 		}
// 	}, [status]);

// 	// --- added: fetch approved reviews for this product once product is loaded ---
// 	useEffect(() => {
// 		async function fetchReviews(pid) {
// 			setReviewsLoading(true);
// 			try {
// 				const res = await axios.get(
// 					import.meta.env.VITE_BACKEND_URL + `/api/reviews/product/${pid}`
// 				);
// 				setReviews(res.data || []);
// 			} catch {
// 				// keep it quiet here, just show empty state below
// 			} finally {
// 				setReviewsLoading(false);
// 			}
// 		}

// 		if (status === "success" && product?.productId) {
// 			fetchReviews(product.productId);
// 		}
// 	}, [status, product?.productId]);

// 	return (
// 		<div className="w-full h-full">
// 			{status == "loading" && <Loader />}
// 			{status == "success" && (
// 				<div className="w-full h-full flex flex-col md:flex-row ">
// 					<h1 className="text-2xl my-4 text-center font-bold md:hidden">
// 						{product.name}{" "}
// 						<span className="font-light">{product.altNames.join(" | ")}</span>
// 					</h1>

// 					<div className="w-full md:w-[49%] h-full flex flex-col justify-center items-center ">
// 						<ImageSlider images={product.images} />
// 					</div>
// 					<div className="w-full md:w/[49%] h-full flex flex-col items-center pt-[50px] ">
// 						<h1 className="text-2xl font-bold hidden md:block">
// 							{product.name}{" "}
// 							<span className="font-light">{product.altNames.join(" | ")}</span>
// 						</h1>
// 						<p className="text-lg p-2">{product.description}</p>
// 						<div className="w-full flex flex-col items-center mt-[20px]">
// 							{product.labelledPrice > product.price ? (
// 								<div>
// 									<span className="text-2xl font-semibold  line-through mr-[20px]">
// 										{product.labelledPrice.toLocaleString("en-US", {
// 											minimumFractionDigits: 2,
// 											maximumFractionDigits: 2,
// 										})}
// 									</span>
// 									<span className="text-3xl font-bold ">
// 										{product.price.toLocaleString("en-US", {
// 											minimumFractionDigits: 2,
// 											maximumFractionDigits: 2,
// 										})}
// 									</span>
// 								</div>
// 							) : (
// 								<div>
// 									<span className="text-3xl font-bold ">
// 										{product.price.toLocaleString("en-US", {
// 											minimumFractionDigits: 2,
// 											maximumFractionDigits: 2,
// 										})}
// 									</span>
// 								</div>
// 							)}
// 						</div>
// 						<div className="w-full flex flex-row justify-center items-center mt-[20px]  gap-[10px]">
// 							<button
// 								onClick={() => {
// 									navigate("/checkout", {
// 										state: {
// 											items: [
// 												{
// 													productId: product.productId,
// 													quantity: 1,
// 													name: product.name,
// 													image: product.images[0],
// 													price: product.price,
// 												},
// 											],
// 										},
// 									});
// 								}}
// 								className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-900 border-[3px] border-blue-900 hover:bg-white hover:text-blue-900"
// 							>
// 								Buy Now
// 							</button>
// 							<button
// 								className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-600 border-[3px] border-blue-600 hover:bg-white hover:text-blue-600"
// 								onClick={() => {
// 									addToCart(product, 1);
// 									toast.success("Product added to cart");
// 									console.log(getCart());
// 								}}
// 							>
// 								Add to Cart
// 							</button>
// 						</div>

// 						{/* --- added: reviews segment for this product --- */}
// 						<div className="w-full max-w-[800px] mt-6 border rounded-lg p-4">
// 							<h2 className="text-xl font-semibold mb-2">Reviews</h2>
// 							<div className="h-[300px] overflow-y-auto">
// 								{reviewsLoading ? (
// 									<p>Loading...</p>
// 								) : reviews.length === 0 ? (
// 									<p className="text-gray-500">No reviews yet.</p>
// 								) : (
// 									reviews.map((r) => (
// 										<div key={r._id} className="border-b py-3">
// 											<div className="flex justify-between">
// 												<span className="font-semibold">{r.name}</span>
// 												<span className="text-sm text-gray-500">
// 													{new Date(r.date).toLocaleString()}
// 												</span>
// 											</div>
// 											<Stars value={r.rating} />
// 											{r.comment && <p className="mt-1">{r.comment}</p>}
// 										</div>
// 									))
// 								)}
// 							</div>
// 						</div>
// 						{/* --- end reviews segment --- */}

// 					</div>
// 				</div>
// 			)}
// 			{status == "error" && <div>Error loading product</div>}
// 		</div>
// 	);
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverViewPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); //loading, success, error

  // --- reviews state for this product ---
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // simple read-only stars renderer
  function Stars({ value }) {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={"text-xl " + (i < value ? "text-yellow-500" : "text-gray-300")}
          >
            ★
          </span>
        ))}
      </div>
    );
  }

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

  // fetch approved reviews for this product once product is loaded
  useEffect(() => {
    async function fetchReviews(pid) {
      setReviewsLoading(true);
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/api/reviews/product/${pid}`
        );
        setReviews(res.data || []);
      } catch {
        // silent
      } finally {
        setReviewsLoading(false);
      }
    }

    if (status === "success" && product?.productId) {
      fetchReviews(product.productId);
    }
  }, [status, product?.productId]);

  return (
    <div className="w-full h-full">
      {status == "loading" && <Loader />}
      {status == "success" && (
        <div className="w-full h-full flex flex-col md:flex-row ">
          <h1 className="text-2xl my-4 text-center font-bold md:hidden">
            {product.name}{" "}
            <span className="font-light">{product.altNames.join(" | ")}</span>
          </h1>

          <div className="w-full md:w-[49%] h-full flex flex-col justify-center items-center ">
            <ImageSlider images={product.images} />
          </div>
          <div className="w-full md:w/[49%] h-full flex flex-col items-center pt-[50px] ">
            <h1 className="text-2xl font-bold hidden md:block">
              {product.name}{" "}
              <span className="font-light">{product.altNames.join(" | ")}</span>
            </h1>
            <p className="text-lg p-2">{product.description}</p>
            <div className="w-full flex flex-col items-center mt-[20px]">
              {product.labelledPrice > product.price ? (
                <div>
                  <span className="text-2xl font-semibold  line-through mr-[20px]">
                    {product.labelledPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className="text-3xl font-bold ">
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-3xl font-bold ">
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              )}
            </div>
            <div className="w-full flex flex-row justify-center items-center mt-[20px]  gap-[10px]">
              <button
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      items: [
                        {
                          productId: product.productId,
                          quantity: 1,
                          name: product.name,
                          image: product.images[0],
                          price: product.price,
                        },
                      ],
                    },
                  });
                }}
                className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-[#f6b0b0] border-[3px] border-[#f6b0b0] hover:bg-white hover:text-[#f6b0b0]"
              >
                Buy Now
              </button>
              <button
                className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-accent border-[3px] border-accent hover:bg-white hover:text-accent"
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Product added to cart");
                  console.log(getCart());
                }}
              >
                Add to Cart
              </button>
            </div>

            {/* Reviews segment — ONLY this area scrolls */}
            <div className="w-full max-w-[800px] mt-6 border rounded-lg p-4 overflow-hidden">
              <h2 className="text-xl font-semibold mb-2">Reviews</h2>
              <div className="h-[300px] overflow-y-auto pr-2">
                {reviewsLoading ? (
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
            {/* end reviews segment */}
          </div>
        </div>
      )}
      {status == "error" && <div>Error loading product</div>}
    </div>
  );
}
