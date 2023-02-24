const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoItemsRoute = require('./routes/todoItemRoute');
const UserRoute = require('./routes/userRoute');
const connectDB = require('./config/db');
const app = express();

dotenv.config();
const port = process.env.PORT || 8000;

// app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/', TodoItemsRoute)
app.use('/', UserRoute)

// database connection 
connectDB()

app.listen(port, () => {
  console.log(`My app is running on port: ${port}`);
});
