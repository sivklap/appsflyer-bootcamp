# QueenB - Full Stack Task Management Application
A template for building a full-stack web application using modern technologies - fork this repository to get started quickly.

Built with Node.js, Express, React, and Material UI.

## 🚀 Features

- **Modern UI**: Beautiful, responsive interface built with Material UI
- **RESTful API**: Well-structured backend API with Express.js
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
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
│   ├── index.js           # Server entry point
│   ├── package.json       # Server dependencies
│   └── .env.example       # Environment variables template
├── client/                # Frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
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
If you are working as a team, you can choose one member to fork the template repository to their own user, 
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

- Backend server on http://localhost:5005
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



### Health Check

- `GET /api/health` - Server health check


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
