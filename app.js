const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./schema/schema');

const app = express();

// connect database
connectDB();

// apply middleware
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});
