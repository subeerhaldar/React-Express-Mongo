// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // To load environment variables from .env file
const Item = require('./models/Item'); // Import the Item model
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
const MONGODB_URI = process.env.MONGODB_URI; // Your MongoDB connection string

const corsOptions = {
    origin: 'http://localhost:5173/', // Replace with your actual frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware to parse JSON bodies
app.use(cors(corsOptions));
app.use(express.json());

console.log(process.env);

// // Serve static files from the React build folder in production
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'client/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Deprecated in Mongoose 6.x
    // useFindAndModify: false // Deprecated in Mongoose 6.x
})
.then(() => {
    console.log('MongoDB Connected Successfully!');
    // Start the server only after successful DB connection
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
});

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Item API!');
});

// Routes for Items
// GET all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new item
app.post('/api/items', async (req, res) => {
    const { name, description, price, quantity } = req.body;

    try {
        const newItem = new Item({
            name,
            description,
            price,
            quantity
        });

        const item = await newItem.save();
        res.status(201).json(item); // 201 Created
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT update an item
app.put('/api/items/:id', async (req, res) => {
    const { name, description, price, quantity } = req.body;

    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { name, description, price, quantity },
            { new: true, runValidators: true }
        );

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Optional: Error handling for unhandled rejections (good practice)
process.on('unhandledRejection', (err, promise) => {
    console.error(`Error: ${err.message}`);
    // Close server & exit process
    // server.close(() => process.exit(1)); // If you have a separate server variable
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
