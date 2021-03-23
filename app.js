const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
var cors = require('cors');
// require("dotenv").config()

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")))


app.get('/', (req, res) => res.send('Hello world!'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
         res.sendFile(path.resolve(__dirname, '../client','build','index.html'));
    });
} 

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));