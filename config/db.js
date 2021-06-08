const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGOD_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error connecting to database. Error: ', error);
  }
};

module.exports = connectDB;
