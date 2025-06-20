import axios from '../config/axios.js';
import React ,{useState,useContext} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { UserContext } from '../context/user.context.jsx';



const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const {setUser}=useContext(UserContext);


    function submitHandler(e){
        e.preventDefault();
axios.post('/users/login',{
    email,
    password
}).then((res)=>{
     localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
    console.log(res.data);
    navigate('/');
}).catch((err)=>{
console.log(err.response.data)
})
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
                <form
                    onSubmit={submitHandler}
                >
                    <div className="mb-4">
                        <label className="block text-purple-200 mb-2" htmlFor="email">Email</label>
                        <input
                        onChange={(e)=>setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-purple-200 mb-2" htmlFor="password">Password</label>
                        <input
                        onChange={(e)=>setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        Login
                    </button>
                </form>
                <p className="text-purple-200 mt-4 text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-purple-300 hover:underline font-semibold">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
