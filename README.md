# React + Express CRUD Application

A full-stack CRUD (Create, Read, Update, Delete) application built with React frontend and Express.js backend, featuring MongoDB for data storage and Axios for API communication.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Add Items**: Create new items with name, description, price, and quantity
- **View Items**: Display all items in a clean, responsive list
- **Real-time Updates**: Items list refreshes automatically after adding new items
- **Form Validation**: Client-side validation with user-friendly error messages
- **Responsive Design**: Works on desktop and mobile devices
- **RESTful API**: Well-structured Express.js API with MongoDB integration
- **CORS Support**: Cross-origin resource sharing configured
- **Development Server**: Hot reload for both frontend and backend

## 🔧 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB (if installed locally)
mongod --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd react-express-crud
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend/my-react-app

# Install dependencies
npm install
```

## ⚙️ Configuration

### Backend Configuration (.env)

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database-name
NODE_ENV=development
```

**Note**: Update the `MONGODB_URI` with your actual MongoDB connection string.

### Frontend Configuration

The frontend is configured to proxy API requests to the backend. Check `frontend/my-react-app/vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
},
```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

2. **Start Backend Server**:
   ```bash
   cd backend
   npm start
   ```
   Backend will run on: `http://localhost:5000`

3. **Start Frontend Server** (in a new terminal):
   ```bash
   cd frontend/my-react-app
   npm run dev
   ```
   Frontend will run on: `http://localhost:5173`

4. **Access the Application**:
   Open your browser and go to: `http://localhost:5173`

### Production Mode

1. **Build Frontend**:
   ```bash
   cd frontend/my-react-app
   npm run build
   ```

2. **Start Backend**:
   ```bash
   cd backend
   npm start
   ```

3. **Access Application**:
   Go to: `http://localhost:5000`

## 📡 API Endpoints

### Items API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| POST | `/api/items` | Create a new item |
| GET | `/api/items/:id` | Get a specific item |
| PUT | `/api/items/:id` | Update a specific item |
| DELETE | `/api/items/:id` | Delete a specific item |

### Request/Response Examples

**Create Item (POST /api/items)**:
```json
{
  "name": "Laptop",
  "description": "High-performance gaming laptop",
  "price": 1299.99,
  "quantity": 10
}
```

**Response**:
```json
{
  "name": "Laptop",
  "description": "High-performance gaming laptop",
  "price": 1299.99,
  "quantity": 10,
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "createdAt": "2023-07-20T10:30:00.000Z",
  "__v": 0
}
```

## 📁 Project Structure

```
react-express-crud/
├── backend/
│   ├── models/
│   │   └── Item.js          # MongoDB Item model
│   ├── node_modules/        # Backend dependencies
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies and scripts
│   ├── server.js            # Express server setup
│   └── .env.example         # Environment template
├── frontend/
│   └── my-react-app/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   │   └── AddItemForm.jsx  # Form component
│       │   ├── App.jsx              # Main React component
│       │   ├── App.css              # Application styles
│       │   ├── main.jsx             # React entry point
│       │   └── index.css            # Global styles
│       ├── node_modules/            # Frontend dependencies
│       ├── package.json             # Frontend dependencies
│       ├── vite.config.js           # Vite configuration
│       └── index.html               # HTML template
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management
- **Nodemon** - Development auto-restart

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **CSS3** - Styling and responsive design

## 📖 Usage

### Adding Items
1. Fill in the form fields:
   - **Name** (required): Item name
   - **Description** (optional): Item description
   - **Price** (required): Item price (must be positive number)
   - **Quantity** (required): Item quantity (must be non-negative integer)

2. Click "Add Item" button
3. Form will validate inputs and show error messages if needed
4. On success, item will be added and form will reset
5. Items list will update automatically

### Viewing Items
- All items are displayed below the form
- Each item shows: name, price, quantity, and description (if provided)
- Items are listed in the order they were added

## 🔧 Troubleshooting

### Common Issues

**1. "404 Not Found" when accessing frontend**
- Make sure both backend and frontend servers are running
- Check that you're accessing the correct URL: `http://localhost:5173`

**2. "Failed to connect to MongoDB"**
- Ensure MongoDB is running locally or update connection string
- Check your `.env` file has correct `MONGODB_URI`

**3. "CORS error"**
- Backend CORS is configured for `http://localhost:5173`
- If using different port, update CORS configuration in `backend/server.js`

**4. "Module not found" errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**5. Port already in use**
```bash
# Find process using port
netstat -ano | findstr :5173
# Kill the process or use different port
```

### Development Tips

- Use browser developer tools to check network requests
- Check console for JavaScript errors
- Verify API endpoints are responding correctly
- Test with tools like Postman for API debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all prerequisites are properly installed
4. Verify configuration files are correct

---

**Happy coding! 🎉**