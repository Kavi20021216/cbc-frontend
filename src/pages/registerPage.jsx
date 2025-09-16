// export default function RegisterPage(){
//     return(
//         <div>
//             <span>Register page</span>
//         </div>
//     )
// }
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function register() {
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
            firstName,
            lastName,
            email,
            phone,
            password
        }).then((response) => {
            console.log(response.data);
            toast.success("Registration successful");
            navigate("/login");
        }).catch((error) => {
            console.log(error);
            toast.error("Registration failed");
        });
    }

    return (
        <div className="w-full h-screen bg-[url(./registerbg.png)] bg-cover bg-center flex justify-center items-center">
            <div className="w-[500px] min-h-[550px] backdrop-blur-sm shadow-2xl rounded-[30px] relative gap-[20px] text-white flex flex-col items-center justify-center p-5">
                <h1 className="absolute top-[20px] text-2xl font-bold text-center">Register</h1>

                {/* First Name */}
                <div className="w-[350px] flex flex-col mt-5">
                    <span className="text-lg ">First Name</span>
                    <input
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-[350px] h-[40px] border border-white rounded-xl px-2 text-black"
                    />
                </div>

                {/* Last Name */}
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg ">Last Name</span>
                    <input
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-[350px] h-[40px] border border-white rounded-xl px-2 text-black"
                    />
                </div>

                {/* Email */}
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg ">Email</span>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[350px] h-[40px] border border-white rounded-xl px-2 text-black"
                    />
                </div>

                {/* Phone */}
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg ">Phone Number</span>
                    <input
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-[350px] h-[40px] border border-white rounded-xl px-2 text-black"
                    />
                </div>

                {/* Password */}
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg ">Password</span>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[350px] h-[40px] border border-white rounded-xl px-2 text-black"
                    />
                </div>

                <button
                    onClick={register}
                    className="w-[350px] h-[40px]  rounded-xl text-white text-lg mt-5 bg-accent hover:bg-blue-600 transition-all duration-300"
                >
                   Create
                </button>

                <p className="mt-2 text-secondary">Already have an account? <Link to="/login" className="text-accent">Login</Link></p>
            </div>
        </div>
    );
}
