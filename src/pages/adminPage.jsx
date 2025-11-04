import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProduct";
import OrdersPageAdmin from "./admin/ordersPageAdmin";
import { FaPhone } from "react-icons/fa6";
import AdminContactUs from "./admin/adminContactUs";
import { FaEnvelope } from "react-icons/fa";
import AdminReviewPage from "./admin/adminReviewPage";
import UsersAdminPage from "./admin/adminUser";
import UpdateUserPage from "./admin/updateUserAdmin";
import SettingsAdminPage from "./admin/settingsAdminPage";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";


export default function AdminPage(){
    const navigate = useNavigate();
    const [adminValidated , setAdminValidated] = useState(false);
    useEffect(
        ()=>{
            const token = localStorage.getItem("token");
            if(token == null){
                toast.error("You are not logged in");
                navigate("/login");
            }else{
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.data.role == "admin") {
                        setAdminValidated(true);
                    } else {
                        toast.error("You are not authorized");
                        navigate("/login");
                    }
                }).catch(() => {
                    toast.error("You are not authorized");
                    navigate("/login");
                });
            }
        }
    ,[]);
    return(
        <div className="w-full h-screen  flex">
           {adminValidated ? <>
            <div className="w-[300px] h-full flex flex-col items-center">
                <div className="flex justify-center items-center p-[20px] text-3xl w-[300px] h-[80px] bg-accent text-white font-bold mb-5">
                    <span>Admin Panel</span>
                </div>


                <Link className="flex flex-row h-[60px] w-full   border border-white shadow-2xl rounded-[15px] p-[20px] items-center text-xl  gap-[25px]" to="/admin"><FaBoxArchive /> Products</Link>
                <Link className="flex flex-row h-[60px] w-full border  border-white shadow-2xl rounded-[15px] p-[20px] items-center text-xl  gap-[25px] mt-2" to="/admin/orders"><GiShoppingBag /> Orders</Link>
                <Link className="flex flex-row h-[60px] w-full border border-white shadow-2xl rounded-[15px] p-[20px] items-center text-xl  gap-[25px] mt-2" to="/admin/reviews"><FaEnvelope />Reviews</Link>
                <Link className="flex flex-row h-[60px] w-full border border-white shadow-2xl rounded-[15px] p-[20px] items-center text-xl  gap-[25px] mt-2" to="/admin/contact-us"><FaPhone />Contact Us</Link>
                <Link className="flex flex-row h-[60px] w-full border  border-white shadow-2xl rounded-[15px] p-[20px] items-center text-xl  gap-[25px] mt-2" to="/admin/users"><IoPeople /> Users</Link>
                <Link className="flex flex-row h-[60px] w-full border border-white shadow-2xl rounded-[15px] p-[20px] items-center text-xl  gap-[25px] mt-2" to="/admin/settings"><IoSettings /> Settings</Link>
            </div>
            <div className="w-[calc(100%-300px)]  h-full">
                <Routes path="/*">
                    
                    <Route path="/" element={<ProductsAdminPage/>}/>
                    <Route path="/newProduct" element={<AddProductPage/>}/>
                    <Route path="/orders" element={<OrdersPageAdmin/>}/>
                    <Route path="/updateProduct" element={<UpdateProductPage/>}/>
                    <Route path="/reviews" element={<AdminReviewPage/>}/>
                    <Route path="/contact-us" element={<AdminContactUs/>}/>
                    <Route path="/users" element={<UsersAdminPage/>}/>
                    <Route path="/updateUser" element={<UpdateUserPage/>}/>
                    <Route path="/settings" element={<SettingsAdminPage/>}/>
                </Routes>
            </div>
           </> : <Loader/>}
        </div>
    )
}