# EchoWave 🌊

<div align="center">

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-EchoWave-FF6B6B?style=for-the-badge)](https://echo-wave-theta.vercel.app/)

</div>

---

## 🚀 About EchoWave

**EchoWave** is a next-generation real-time collaborative coding platform that enables teams to work together seamlessly on coding projects. Built with modern web technologies, it provides an integrated development environment with AI-powered assistance, real-time chat, and live code preview capabilities.

> **🌐 Live Demo:** **[https://echo-wave-theta.vercel.app/](https://echo-wave-theta.vercel.app/)**

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🤖 **AI-Powered Code Assistant**
Get intelligent code suggestions and project generation using `@ai` commands

### 💬 **Real-time Chat** 
Lightning-fast messaging with team members in real-time

### 🚀 **Live Code Preview**
Run and preview projects instantly with WebContainer technology

### 👥 **Team Collaboration**
Invite team members and collaborate on projects

</td>
<td width="50%">

### 📁 **File Management**
Organized file tree structure with real-time updates

### 🎨 **Modern UI**
Beautiful, responsive interface built with Tailwind CSS

### 🔐 **Secure Authentication**
JWT-based authentication with user management

### ⚡ **Real-time Updates**
Socket.io powered real-time communication

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### **Frontend**
```
🔹 React 18.3.1          - Modern UI framework
🔹 Vite                  - Fast build tool and dev server
🔹 Tailwind CSS          - Utility-first CSS framework
🔹 Socket.io Client      - Real-time communication
🔹 WebContainer API      - Browser-based code execution
🔹 Framer Motion         - Smooth animations
🔹 React Router DOM      - Client-side routing
```

### **Backend**
```
🔸 Node.js               - JavaScript runtime
🔸 Express.js            - Web application framework
🔸 Socket.io             - Real-time bidirectional communication
🔸 MongoDB               - NoSQL database
🔸 Mongoose              - MongoDB object modeling
🔸 JWT                   - JSON Web Token authentication
🔸 Google Generative AI  - AI-powered code assistance
🔸 Redis                 - Caching and session management
```

---

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

| Requirement | Version | Description |
|-------------|---------|-------------|
| **Node.js** | v16+ | JavaScript runtime environment |
| **npm/yarn** | Latest | Package manager |
| **MongoDB** | Latest | Database (local or cloud) |
| **Redis** | Latest | Caching (optional) |

---

## 🚀 Quick Start

### **1. Clone the Repository**

```bash
git clone https://github.com/Subrat090/EchoWave.git
cd EchoWave
```

### **2. Backend Setup**

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
REDIS_URL=your_redis_url # (optional)
```

### **3. Frontend Setup**

```bash
cd ../frontend
npm install
```

### **4. Start Development Servers**

#### **Backend:**
```bash
cd backend
npm run dev
```

#### **Frontend:**
```bash
cd frontend
npm run dev
```

🌐 **Access the application:**
- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:3000`

---

## 🎯 Usage

### **Getting Started**

| Step | Action | Description |
|------|--------|-------------|
| **1** | **Register/Login** | Create an account or sign in to access the platform |
| **2** | **Create Project** | Start a new project or join an existing one |
| **3** | **Invite Team** | Add team members to collaborate |
| **4** | **Start Coding** | Use the integrated editor with real-time collaboration |
| **5** | **AI Assistance** | Use `@ai` commands for code suggestions and project generation |
| **6** | **Live Preview** | Run your code and see results instantly |

### **AI Commands**

Use `@ai` followed by your request to get AI assistance:

```javascript
@ai Create a React component for a todo list
@ai Generate an Express.js API with user authentication
@ai Help me debug this JavaScript function
```

---

## 📁 Project Structure

```
EchoWave/
├── 🗂️ backend/                 # Backend API server
│   ├── 📋 controllers/        # Route controllers
│   ├── 🗃️ models/            # MongoDB schemas
│   ├── 🛣️ routes/            # API routes
│   ├── ⚙️ services/          # Business logic
│   ├── 🛡️ middleware/        # Custom middleware
│   └── 🖥️ server.js          # Main server file
├── 🎨 frontend/              # React frontend
│   ├── 📦 src/
│   │   ├── 🧩 components/    # React components
│   │   ├── 📄 screens/       # Page components
│   │   ├── 🌐 context/       # React context
│   │   ├── ⚙️ config/        # Configuration files
│   │   └── 🛣️ routes/        # Routing setup
│   └── 📁 public/            # Static assets
└── 📖 README.md
```

---

## 🔧 API Endpoints

### **Authentication**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | User registration |
| `POST` | `/auth/login` | User login |
| `GET` | `/auth/logout` | User logout |

### **Projects**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/project/create` | Create new project |
| `GET` | `/project/all` | Get user's projects |
| `GET` | `/project/:id` | Get project by ID |
| `PUT` | `/project/add-user` | Add user to project |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Special thanks to the following technologies and services that made EchoWave possible:

- 🌐 **[WebContainer](https://webcontainers.io/)** - Browser-based code execution
- ⚡ **[Socket.io](https://socket.io/)** - Real-time communication
- 🤖 **[Google Generative AI](https://ai.google.dev/)** - AI-powered assistance
- 🎨 **[Tailwind CSS](https://tailwindcss.com/)** - Beautiful UI framework

---

## 👨‍💻 Developer

<div align="center">

### **Subrat Mahapatro**
*Full-Stack Developer | React • Node.js • AI Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-@Subrat090-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Subrat090)
[![Portfolio](https://img.shields.io/badge/Portfolio-GitHub_Profile-FF6B6B?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Subrat090)
[![Live Demo](https://img.shields.io/badge/Live_Demo-EchoWave_App-4CAF50?style=for-the-badge&logo=vercel&logoColor=white)](https://echo-wave-theta.vercel.app/)

</div>

---

## 📞 Support

If you have any questions or need support, please:

- 🐛 **Open an issue** on GitHub
- 💬 **Contact** the development team
- 📧 **Reach out** for technical assistance

---

<div align="center">

**Built with ❤️ by [Subrat Mahapatro](https://github.com/Subrat090)**

*Empowering developers to collaborate seamlessly*

</div>