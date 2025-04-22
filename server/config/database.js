const mongoose = require('mongoose');

// MongoDB URI and database name
const dbconfig = {
  url: "mongodb://localhost:27017/LMS",
  dbname: 'EduHub'
};

// Function to connect to MongoDB
const connectToDatabase = () => {
  mongoose
    .connect(dbconfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });
};

module.exports = { dbconfig, connectToDatabase };
