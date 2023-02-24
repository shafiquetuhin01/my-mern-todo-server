const mongoose = require('mongoose');

// connected to mongodb database
const connectDB = () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err));
};

module.exports = connectDB