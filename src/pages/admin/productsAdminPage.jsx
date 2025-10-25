import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function ProductsAdminPage() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// const [a,setA] = useState(0);
	useEffect(() => {
		if (isLoading) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
				.then((res) => {
					setProducts(res.data);
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	const navigate = useNavigate();

	return (
		<div className="w-full h-full p-4 flex flex-col justify-between ">
		  <div>	
			<h1 className="text-2xl font-bold mb-4">Products (Admin)</h1>

			{isLoading ? (
				<Loader/>
			) : (
				<div className="overflow-auto">
				<table  className="w-full border-[3px]">
					<thead>
						<tr className="bg-[#ff9999]">
							<th className="p-[10px] border">Image</th>
							<th className="p-[10px] border">Product ID</th>
							<th className="p-[10px] border">Name</th>
							<th className="p-[10px] border">Price</th>
							<th className="p-[10px] border">Labelled Price</th>
							<th className="p-[10px] border">Category</th>
							<th className="p-[10px] border">Stock</th>
							<th className="p-[10px] border">Actions</th>
						</tr>
					</thead>

					<tbody >
						{products.map((product, index) => {
							return (
								<tr key={index}>
									<td className="p-[10px] border">
										<img
											src={product.images[0]}
											alt={product.name}
											className="w-[40px] h-[40px] "
										/>
									</td>
									<td className="p-[10px] border">{product.productId}</td>
									<td className="p-[10px] border">{product.name}</td>
									<td className="p-[10px] border">{product.price}</td>
									<td className="p-[10px] border">{product.labelledPrice}</td>
									<td className="p-[10px] border">{product.category}</td>
									<td className="p-[10px] border">{product.stock}</td>
									<td className="p-[15px] border flex flex-row justify-center items-center ">
										<BiTrash
											className="bg-red-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer"
											onClick={() => {
												const token = localStorage.getItem("token");
												if (token == null) {
													navigate("/login");
													return;
												}
												axios
													.delete(
														import.meta.env.VITE_BACKEND_URL +
															"/api/products/" +
															product.productId,
														{
															headers: {
																Authorization: `Bearer ${token}`,
															},
														}
													)
													.then((res) => {
														console.log("Product deleted successfully");
														console.log(res.data);
														toast.success("Product deleted successfully");
														setIsLoading(!isLoading);
													})
													.catch((error) => {
														console.error("Error deleting product:", error);
														toast.error("Failed to delete product");
													});
											}}
										/>

										<BiEdit
											onClick={() => {
												navigate("/admin/updateProduct", {
													state: product,
												});
											}}
											className="bg-blue-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer ml-[10px]"
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				</div>
			)}
			
			<Link className="fixed flex bottom-6 right-6 flex-row h-[60px] w-[300px]   border border-white shadow-2xl rounded-[30px] p-[20px] items-center text-xl  gap-[25px]" to="/admin/newProduct">Add New Product<BiPlus className="text-3xl" /></Link>
			</div>
		</div>
	);
}
