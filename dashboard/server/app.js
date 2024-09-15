const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middleware

app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors());

const user = require('./Routes/userRoutes.js');

// Routes

app.use('/', user);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
