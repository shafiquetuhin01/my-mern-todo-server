const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoItemsRoute = require('./routes/todoItemRoute');
const app = express();

dotenv.config();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use('/', TodoItemsRoute)

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`My app is running on port: ${port}`);
});
