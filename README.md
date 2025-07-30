# EchoWave 🌊

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-orange.svg)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-blue.svg)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-EchoWave-green.svg)](https://echo-wave-theta.vercel.app/)

## 🚀 About EchoWave

EchoWave is a next-generation real-time collaborative coding platform that enables teams to work together seamlessly on coding projects. Built with modern web technologies, it provides an integrated development environment with AI-powered assistance, real-time chat, and live code preview capabilities.

**🌐 Live Demo:** [https://echo-wave-theta.vercel.app/](https://echo-wave-theta.vercel.app/)

### ✨ Key Features

- **🤖 AI-Powered Code Assistant**: Get intelligent code suggestions and project generation using `@ai` commands
- **💬 Real-time Chat**: Lightning-fast messaging with team members in real-time
- **🚀 Live Code Preview**: Run and preview projects instantly with WebContainer technology
- **👥 Team Collaboration**: Invite team members and collaborate on projects
- **📁 File Management**: Organized file tree structure with real-time updates
- **🎨 Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **🔐 Secure Authentication**: JWT-based authentication with user management
- **⚡ Real-time Updates**: Socket.io powered real-time communication

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication
- **WebContainer API** - Browser-based code execution
- **Framer Motion** - Smooth animations
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Google Generative AI** - AI-powered code assistance
- **Redis** - Caching and session management

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Redis** (optional, for caching)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Subrat090/EchoWave.git
cd EchoWave
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_AI_KEY=your_google_ai_api_key
REDIS_URL=your_redis_url (optional)
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Start Development Servers

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## 🎯 Usage

### Getting Started

1. **Register/Login**: Create an account or sign in to access the platform
2. **Create Project**: Start a new project or join an existing one
3. **Invite Team**: Add team members to collaborate
4. **Start Coding**: Use the integrated editor with real-time collaboration
5. **AI Assistance**: Use `@ai` commands for code suggestions and project generation
6. **Live Preview**: Run your code and see results instantly

### AI Commands

Use `@ai` followed by your request to get AI assistance:

```
@ai Create a React component for a todo list
@ai Generate an Express.js API with user authentication
@ai Help me debug this JavaScript function
```

## 📁 Project Structure

```
EchoWave/
├── backend/                 # Backend API server
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── middleware/        # Custom middleware
│   └── server.js          # Main server file
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── screens/       # Page components
│   │   ├── context/       # React context
│   │   ├── config/        # Configuration files
│   │   └── routes/        # Routing setup
│   └── public/            # Static assets
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/logout` - User logout

### Projects
- `POST /project/create` - Create new project
- `GET /project/all` - Get user's projects
- `GET /project/:id` - Get project by ID
- `PUT /project/add-user` - Add user to project
- `PUT /project/file-tree` - Update project file tree

### AI Service
- `POST /ai/generate` - Generate AI responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WebContainer](https://webcontainers.io/) for browser-based code execution
- [Socket.io](https://socket.io/) for real-time communication
- [Google Generative AI](https://ai.google.dev/) for AI-powered assistance
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful UI

## 👨‍💻 Developer

**Subrat Mahapatro** - Full-Stack Developer | React • Node.js • AI Enthusiast

- **GitHub:** [@Subrat090](https://github.com/Subrat090)
- **Portfolio:** [GitHub Profile](https://github.com/Subrat090)
- **Live Demo:** [EchoWave App](https://echo-wave-theta.vercel.app/)

## 📞 Support

If you have any questions or need support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ by [Subrat Mahapatro](https://github.com/Subrat090)** 