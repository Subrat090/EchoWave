import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/user.context.jsx'
import axios from "../config/axios.js"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const createProject = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/project/create', { name: projectName })
      setIsModalOpen(false)
      setProjectName('')
      setProjects(prev => [...prev, res.data.project])
      navigate('/home')
    } catch (error) {
      console.error("Error creating project:", error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    axios.get('/project/all')
      .then((res) => {
        setProjects(Array.isArray(res.data.projects) ? res.data.projects : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching projects:", err)
        setLoading(false)
      })
  }, [])

  const getUserInitial = (email) => email?.[0]?.toUpperCase() || 'U'

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <header className="relative z-10 w-full bg-white/5 backdrop-blur-sm border-b border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CodeSync</h1>
            <div className="h-6 w-px bg-white/20"></div>
            <span className="text-gray-300">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <i className="ri-user-fill text-white text-sm"></i>
              </div>
              <span className="text-white font-medium">{user?.email || user?.name || 'User'}</span>
            </div>
            <button onClick={logout} className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-300 flex items-center gap-2">
              <i className="ri-logout-box-line"></i>Logout
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-grow px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome back, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{user?.name || 'Developer'}</span> 👋
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Ready to collaborate and build something amazing? Start a new project or continue working on your existing ones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <StatCard label="Total Projects" value={projects.length} gradient="from-blue-400 to-cyan-400" />
            <StatCard label="Collaborators" gradient="from-purple-400 to-pink-400" value={projects.reduce((acc, project) => acc + (project?.users?.length || 0), 0)} />
            <StatCard label="Active Teams" gradient="from-green-400 to-emerald-400" value={projects.filter(p => p?.users?.length > 1).length} />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Your Projects</h3>
              <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
                <i className="ri-add-line text-lg"></i>New Project
              </button>
            </div>

            {loading ? (
              <LoadingSkeleton count={6} />
            ) : projects.length === 0 ? (
              <EmptyState onCreate={() => setIsModalOpen(true)} />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.filter(Boolean).map((project) => (
                  <ProjectCard key={project._id} project={project} navigate={navigate} getUserInitial={getUserInitial} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <ProjectModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={createProject}
          projectName={projectName}
          setProjectName={setProjectName}
        />
      )}
    </div>
  )
}

const StatCard = ({ label, value, gradient }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
    <div className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>{value}</div>
    <div className="text-gray-300">{label}</div>
  </div>
)

const LoadingSkeleton = ({ count }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-pulse">
        <div className="h-6 bg-white/10 rounded mb-4"></div>
        <div className="h-4 bg-white/10 rounded w-3/4"></div>
      </div>
    ))}
  </div>
)

const EmptyState = ({ onCreate }) => (
  <div className="text-center py-16">
    <div className="text-6xl mb-4">📁</div>
    <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
    <p className="text-gray-400 mb-6">Create your first project to get started with collaborative coding</p>
    <button onClick={onCreate} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
      Create Your First Project
    </button>
  </div>
)

const ProjectCard = ({ project, navigate, getUserInitial }) => (
  <div onClick={() => navigate('/project', { state: { project } })} className="group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <i className="ri-folder-code-line text-white text-xl"></i>
        </div>
        <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
          {project?.name || 'Untitled'}
        </h4>
      </div>
      <i className="ri-arrow-right-line text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"></i>
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-300">
        <i className="ri-team-line text-blue-400"></i>
        <span className="text-sm">{project?.users?.length || 0} Collaborator{project?.users?.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-300">
        <i className="ri-time-line text-purple-400"></i>
        <span className="text-sm">Created {new Date(project?.createdAt || Date.now()).toLocaleDateString()}</span>
      </div>
      {project?.users?.length > 1 && (
        <div className="flex -space-x-2 mt-3">
          {project.users.slice(0, 3).map((user, index) => (
            <div key={index} className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">{getUserInitial(user.email)}</span>
            </div>
          ))}
          {project.users.length > 3 && (
            <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-gray-800 flex items-center justify-center">
              <span className="text-white text-xs">+{project.users.length - 3}</span>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
)

const ProjectModal = ({ onClose, onSubmit, projectName, setProjectName }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Create New Project</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
          <i className="ri-close-line text-2xl"></i>
        </button>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
          <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g. My Awesome App" required />
        </div>
        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-3 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-all duration-300">Cancel</button>
          <button type="submit" className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] font-semibold">Create Project</button>
        </div>
      </form>
    </div>
  </div>
)

export default Home