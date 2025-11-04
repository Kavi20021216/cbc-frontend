import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit,  BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import Paginator from "../../components/paginator";

export default function UsersAdminPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(5);
    // const [a,setA] = useState(0);
    useEffect(() => {
                 if (isLoading) {
                axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/getusers/${page}/${limit}`)
                .then((res) => {
                    setUsers(res.data.users || []);
                    setTotalPages(res.data.totalPages || 1);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to load users");
                })
                .finally(() => setIsLoading(false));
            }
       }, [isLoading,page, limit]);


    const navigate = useNavigate();

    return (
        <div className="w-full h-full p-4 flex flex-col justify-between ">
          <div>	
            <h1 className="text-2xl font-bold mb-4">Users (Admin)</h1>

            {isLoading ? (
                <Loader/>
            ) : (
                <div className="overflow-auto">
                <table  className="w-full border-[3px]">
                    <thead>
                        <tr className="bg-[#ff9999]">
                            
                            <th className="p-[10px] border">Name</th>
                            <th className="p-[10px] border">Phone</th>
                            <th className="p-[10px] border">Role</th>
                            <th className="p-[10px] border">Actions</th>
                        </tr>
                    </thead>

                    <tbody >
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td className="p-[10px] border">{user.firstName} {user.lastName} </td>
                                    <td className="p-[10px] border">{user.phone}</td>
                                    <td className="p-[10px] border">{user. role}</td>
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
                                                         `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.email}` , 
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                    )
                                                    .then((res) => {
                                                        console.log("User deleted successfully");
                                                        console.log(res.data);
                                                        toast.success("User deleted successfully");
                                                        setIsLoading(!isLoading);
                                                    })
                                                    .catch((error) => {
                                                        console.error("Error deleting User:", error);
                                                        toast.error("Failed to delete User");
                                                    });
                                            }}
                                        />

                                      
                                        <BiEdit
                                            onClick={() => {
                                                navigate("/admin/updateUser", { state: user });
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
