import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs with improved animations */}
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-3xl rounded-full -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-15 blur-3xl rounded-full top-1/4 -right-10 animate-bounce"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-3xl rounded-full bottom-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-15 blur-3xl rounded-full -bottom-20 right-1/3 animate-bounce"></div>
        {/* Geometric shapes */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-400/50 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-ping"></div>
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>
      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        {/* Hero section */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              {/* Logo/Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
                <i className="ri-sound-module-line text-2xl sm:text-3xl text-white"></i>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl opacity-20 blur-xl animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6 animate-in slide-in-from-top duration-1000 leading-tight">
            EchoWave
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent w-16 sm:w-24"></div>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light animate-in slide-in-from-bottom duration-1000 delay-300 whitespace-nowrap">
              Collaborate. Code. Create.
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent w-16 sm:w-24"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto animate-in fade-in duration-1500 delay-500 leading-relaxed">
            The next-generation platform for real-time collaborative coding. Work seamlessly with your team, 
            share code instantly, and build extraordinary projects with AI-powered assistance.
          </p>
        </div>
        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 animate-in slide-in-from-bottom duration-1000 delay-700">
          <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">⚡</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">Real-time Chat</h3>
            <p className="text-slate-400 group-hover:text-slate-300 transition-colors text-sm sm:text-base">Experience lightning-fast messaging with team members in real-time</p>
            <div className="mt-4 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">🤖</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">AI Code Assistant</h3>
            <p className="text-slate-400 group-hover:text-slate-300 transition-colors text-sm sm:text-base">Get intelligent code suggestions and project generation with @ai commands</p>
            <div className="mt-4 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl sm:col-span-2 lg:col-span-1">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">🚀</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Live Preview</h3>
            <p className="text-slate-400 group-hover:text-slate-300 transition-colors text-sm sm:text-base">Run and preview your projects instantly with WebContainer technology</p>
            <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 animate-in fade-in duration-1000 delay-1000">
          <button
            onClick={() => navigate('/register')}
            className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 text-sm sm:text-base"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center">
              <i className="ri-rocket-line mr-2 text-lg"></i>
              Start Building Free
            </div>
          </button>
          <button
            onClick={() => navigate('/login')}
            className="group px-8 py-4 sm:px-10 sm:py-5 bg-white/10 backdrop-blur-lg border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            <i className="ri-login-circle-line mr-2 text-lg group-hover:text-purple-300 transition-colors"></i>
            Sign In
          </button>
        </div>
        {/* Enhanced Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-20 animate-in slide-in-from-bottom duration-1000 delay-1200">
          <div className="text-left bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <i className="ri-team-line text-xl text-white"></i>
              </div>
              Team Collaboration
            </h3>
            <ul className="text-slate-300 space-y-3 sm:space-y-4">
              <li className="flex items-center group hover:text-white transition-colors">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-green-300"></div>
                Real-time messaging with team members
              </li>
              <li className="flex items-center group hover:text-white transition-colors">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-green-300"></div>
                Add collaborators to projects
              </li>
              <li className="flex items-center group hover:text-white transition-colors">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-green-300"></div>
                Secure user authentication
              </li>
              <li className="flex items-center group hover:text-white transition-colors">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-green-300"></div>
                Project-based team management
              </li>
            </ul>
          </div>
          <div className="text-left bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                <i className="ri-code-s-slash-line text-xl text-white"></i>
              </div>
              Code Editor
            </h3>
            <ul className="text-slate-300 space-y-3 sm:space-y-4">
              <li className="flex items-center group hover:text-white transition-colors">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 group-hover:bg-cyan-300"></div>
                Syntax highlighting with highlight.js
              </li>
              <li className="flex items-center group hover:text-white transition-colors">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 group-hover:bg-cyan-300"></div>
                Multi-file project structure
              </li>
              <li className="flex items-center group hover:text-white transition-colors">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 group-hover:bg-cyan-300"></div>
                File tree management
              </li>
              <li className="flex items-center group hover:text-white transition-colors">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 group-hover:bg-cyan-300"></div>
                Real-time code execution
              </li>
            </ul>
          </div>
        </div>
        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 animate-in slide-in-from-bottom duration-1000 delay-1400">
          <div className="text-center bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">Real-time</div>
            <div className="text-slate-400 group-hover:text-slate-300 transition-colors font-medium">Socket.io Chat</div>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">AI-Powered</div>
            <div className="text-slate-400 group-hover:text-slate-300 transition-colors font-medium">Gemini Integration</div>
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">WebContainer</div>
            <div className="text-slate-400 group-hover:text-slate-300 transition-colors font-medium">Live Execution</div>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        {/* Enhanced Footer */}
        <div className="pt-8 sm:pt-12 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10">
            <p className="text-slate-300 text-base sm:text-lg mb-4 font-medium">
              Ready to revolutionize your development workflow?
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              Join developers worldwide who are already building the future with EchoWave.
            </p>
            {/* Social proof badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2 text-xs sm:text-sm text-slate-300">
                <i className="ri-shield-check-line text-green-400 mr-2"></i>
                JWT Authentication
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2 text-xs sm:text-sm text-slate-300">
                <i className="ri-lock-line text-blue-400 mr-2"></i>
                MongoDB Security
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2 text-xs sm:text-sm text-slate-300">
                <i className="ri-global-line text-purple-400 mr-2"></i>
                Real-time Sync
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage