import { useState } from "react";
import { login } from "../services/apiServices";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [loginData, setLoginData] = useState({
        email : "",
        password : ""
    });
    const navigate = useNavigate();

    const handleInput = (e)=>{
        const { id, value } = e.target;
        setLoginData(prev=>({
            ...prev,
            [id] : value
        }))
    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        if(loginData.email==="" || loginData.password===""){
            setError("All fields are required .")
            setTimeout(() => {
                setError("");
            }, 1000);
            return;
        }
        setIsSubmitting(true);
        try{
            const response = await login(loginData);
            if(response.error){
                setError(response.error);
                return;
            }
            localStorage.setItem("protfoliotoken", response.token);
            setLoginData({
                email : "",
                password : ""
            });
            navigate("/admin");
        }catch(e){
            setError("Invalid Credentials");
        }finally{
            setIsSubmitting(false);
            setTimeout(() => {
                setError("");
            }, 1000);
        }
    }

  return (
    <>
        <p className="text-center h-20 p-5 bg-green-800 text-3xl text-cyan-500">{error}</p>
        <div className='h-[89vh] flex justify-center items-center bg-gradient-to-b from-green-800 via-green-950 to-gray-800'>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="./logo.png" alt="JoySarkar" className="mx-auto h-20 rounded-2xl w-auto" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
                            <div className="mt-2">
                            <input id="email" type="email" name="email" onChange={handleInput} value={loginData.email} required autoComplete="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
                            <div className="mt-2">
                            <input id="password" type="password" name="password" onChange={handleInput} value={loginData.password} required autoComplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={isSubmitting} onClick={handleLogin} className="flex w-full cursor-pointer justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                {
                                    isSubmitting ? "Signing In..." : "Sign in"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginPage