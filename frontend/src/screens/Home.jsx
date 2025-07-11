import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/user.context.jsx'
import axios from "../config/axios"
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { user } = useContext(UserContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectName, setProjectName] = useState('')
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    function createProject(e) {
        e.preventDefault()
        axios.post('/project/create', { name: projectName })
            .then((res) => {
                setIsModalOpen(false)
                setProjectName('')
                setProjects(prev => [...prev, res.data.project])
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        axios.get('/project/all')
            .then((res) => {
                setProjects(res.data.projects)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-800 py-12 px-4 sm:px-6 lg:px-8">

            {/* Blurred background blobs */}
            <div className="absolute w-40 h-40 bg-purple-400 opacity-20 blur-2xl rounded-full top-10 left-10 animate-blob1" />
            <div className="absolute w-52 h-52 bg-pink-400 opacity-20 blur-2xl rounded-full top-40 right-20 animate-blob2" />
            <div className="absolute w-36 h-36 bg-blue-400 opacity-20 blur-2xl rounded-full bottom-20 left-32 animate-blob3" />
            <div className="absolute w-48 h-48 bg-yellow-400 opacity-20 blur-2xl rounded-full bottom-32 right-10 animate-blob4" />
            <div className="absolute w-32 h-32 bg-green-400 opacity-20 blur-2xl rounded-full top-20 right-[40%] animate-blob5" />
            <div className="absolute w-44 h-44 bg-fuchsia-400 opacity-20 blur-2xl rounded-full bottom-10 right-[35%] animate-blob6" />

            <div className="relative z-10 w-full max-w-5xl">
                <h1 className="text-4xl font-extrabold text-white text-center mb-10 animate-pulse">
                    Welcome, <span className="text-purple-300">{user?.name || 'User '}</span> 👋
                </h1>

                {/* Projects Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Create New Project Card */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/20 transition transform hover:scale-105"
                    >
                        <div className="text-xl font-semibold">+ New Project</div>
                        <p className="text-sm mt-2 text-purple-200">Start something fresh</p>
                    </button>

                    {/* List of Projects */}
                    {loading ? (
                        <div className="col-span-full text-center text-white">Loading projects...</div>
                    ) : (
                        projects.map((project) => (
                            <div
                                key={project._id}
                                onClick={() => navigate('/project', { state: { project } })}
                                className="cursor-pointer p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/20 transition transform hover:scale-105"
                            >
                                <h2 className="text-lg font-bold mb-2">{project.name}</h2>
                                <p className="text-sm text-purple-200 flex items-center gap-1">
                                    <i className="ri-user-line"></i> Collaborators: {project.users.length}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-center">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="e.g. Chat App"
                                required
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home
