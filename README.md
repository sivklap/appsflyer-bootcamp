# QueenB - Full Stack Task Management Application

A modern full-stack web application built with Node.js, Express, React, and Material UI for task and user management.

## 🚀 Features

- **Modern UI**: Beautiful, responsive interface built with Material UI
- **RESTful API**: Well-structured backend API with Express.js
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Nodemon** - Development auto-restart

### Frontend

- **React 18** - UI library
- **Material UI (MUI)** - Component library
- **Axios** - HTTP client
- **React Scripts** - Build tools

## 📦 Project Structure

```
QueenB/
├── server/                 # Backend application
│   ├── routes/            # API route handlers
│   │   ├── users.js       # User CRUD operations
│   │   └── tasks.js       # Task CRUD operations
│   ├── index.js           # Server entry point
│   ├── package.json       # Server dependencies
│   └── .env.example       # Environment variables template
├── client/                # Frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── UserManagement.js
│   │   │   └── TaskManagement.js
│   │   ├── services/      # API services
│   │   │   └── api.js     # Axios configuration
│   │   ├── App.js         # Main application component
│   │   └── index.js       # React entry point
│   └── package.json       # Client dependencies
├── package.json           # Root package.json with scripts
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Fork the template repository to your own user**
If you are orking as a team, you can choose one member to fork the template repository to their own user, 
and then share the repository with the rest of the team.


2. **Clone or navigate to the project directory**

   ```bash
   git clone **copied git url**
   ```

   ```bash
   cd QueenB
   ```

2. **Install root dependencies**

   ```bash
   npm install
   ```

3. **Install server and client dependencies**

   ```bash
   npm run install-all
   ```

   OR:

   - open terminal and run:

   ```bash
   cd server
   npm install
   ```

   - open another terminal

   ```bash
   cd client
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env file with your configuration if needed
   cd ..
   ```

### Running the Application

#### Development Mode (Recommended)

#### Running Separately

**Start the backend server:**

```bash
npm run server
```

**Start the frontend client (in a new terminal):**

```bash
npm run client
```

#### Running Concurrently

Run both client and server concurrently:

```bash
npm run dev
```

This will start:

- Backend server on http://localhost:5000
- Frontend client on http://localhost:3000 - you can access the application in your browser at this URL.

### Building for Production

1. **Build the React client:**

   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## 📚 API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Tasks

- `GET /api/tasks` - Get all tasks (supports status and priority query filters)
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Health Check

- `GET /api/health` - Server health check

### 🎨 Template Application Features

#### Dashboard

- Overview statistics of users and tasks
- Quick view of recent tasks and team members
- Color-coded status and priority indicators

#### User Management

- View all users in a data table
- Add new users with name, email, and role
- Edit existing user information
- Delete users with confirmation
- Role-based user types (admin/user)

#### Task Management

- View tasks in an organized card layout
- Filter tasks by status (All, Pending, In Progress, Completed)
- Create new tasks with title, description, status, and priority
- Edit existing tasks
- Delete tasks with confirmation
- Visual priority and status indicators

## 🔧 Development

### Available Scripts

- `npm run dev` - Run both client and server in development mode
- `npm run server` - Run only the backend server
- `npm run client` - Run only the frontend client
- `npm run install-all` - Install dependencies for both client and server
- `npm run build` - Build the React client for production
- `npm start` - Start the production server

### Key Features

- **Responsive Design**: The application works on all device sizes
- **Modern UI**: Material UI components provide a professional look
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Loading States**: User-friendly loading indicators
- **Form Validation**: Client and server-side validation
- **Success Feedback**: Clear success and error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**: If ports 3000 or 5000 are in use, you can change them in the package.json scripts or .env file

2. **Installation issues**: Delete `node_modules` folders and run `npm run install-all` again

3. **API connection issues**: Ensure the backend server is running on port 5000 and the proxy is configured correctly in the client package.json

### Support

If you encounter any issues, please check the console logs for detailed error messages or create an issue in the repository.

---

Built with ❤️ using React, Material UI, and Node.js
