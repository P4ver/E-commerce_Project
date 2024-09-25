const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middleware

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,

}));

const user = require('./Routes/userRoutes.js');
const auth = require('./Routes/authRoutes.js');
const product = require('./Routes/productRoutes.js');
const order = require('./Routes/orderRoutes.js');
const customer = require('./Routes/customerRoutes.js');
// Routes

app.use('/', user);
app.use('/', auth);
app.use('/', product);
app.use('/', order);
app.use('/', customer);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
