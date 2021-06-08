const express = require('express');
require('dotenv').config();
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});
