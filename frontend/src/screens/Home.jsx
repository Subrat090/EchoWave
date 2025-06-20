import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/user.context.jsx'
import axios from "../config/axios"
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const { user } = useContext(UserContext)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
   const [projectName, setProjectName] = useState('')



    const navigate = useNavigate()

    function createProject(e) {
        e.preventDefault()
        console.log({ projectName })

        axios.post('/project/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res)
                setIsModalOpen(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

   

    return (
        <main className='p-4'>
            <div className="projects flex flex-wrap gap-3">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 border border-slate-300 rounded-md">
                    New Project
                    <i className="ri-link ml-2"></i>
                </button>

               

            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                        <h2 className="text-xl mb-4">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                                <input
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName}
                                    type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </main>
    )
}

export default Home



/*
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../context/user.context.jsx'

const Home = () => {
  const { user } = useContext(userContext);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-800">

      
      <div className="absolute w-40 h-40 bg-purple-400 opacity-20 blur-2xl rounded-full top-10 left-10 animate-blob1" />
      <div className="absolute w-52 h-52 bg-pink-400 opacity-20 blur-2xl rounded-full top-40 right-20 animate-blob2" />
      <div className="absolute w-36 h-36 bg-blue-400 opacity-20 blur-2xl rounded-full bottom-20 left-32 animate-blob3" />
      <div className="absolute w-48 h-48 bg-yellow-400 opacity-20 blur-2xl rounded-full bottom-32 right-10 animate-blob4" />
      <div className="absolute w-32 h-32 bg-green-400 opacity-20 blur-2xl rounded-full top-20 right-[40%] animate-blob5" />
      <div className="absolute w-44 h-44 bg-fuchsia-400 opacity-20 blur-2xl rounded-full bottom-10 right-[35%] animate-blob6" />

   
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight animate-pulse">
          Welcome to <span className="text-purple-300">EchoWave</span>
        </h1>
        <p className="text-purple-200 text-lg md:text-xl mb-8">
          Real-time messaging meets smart AI. Connect, chat, and collaborate — instantly.
        </p>

       
        <div className="text-sm text-white mb-4 bg-black/30 p-2 rounded-md">
          {JSON.stringify(user)}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-purple-800 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Register
          </Link>
        </div>
        <p className="mt-10 text-purple-300 text-sm">
          ✨ AI-powered chat designed for modern conversations
        </p>
      </div>
    </div>
  )
}

export default Home  this was our ui*/ 