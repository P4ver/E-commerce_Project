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
const auth = require('./Routes/authRoutes.js');
// Routes

app.use('/', user);
app.use('/', auth);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
