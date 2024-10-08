require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,

}));

const user = require('./Routes/userRoutes.js');
const auth = require('./Routes/authRoutes.js');
const product = require('./Routes/productRoutes.js');
const order = require('./Routes/orderRoutes.js');
const customer = require('./Routes/customerRoutes.js');
const categories = require('./Routes/categoryRoutes.js');
const orderItems = require('./Routes/orderItemsRoutes.js');
// Routes

app.use('/', user);
app.use('/', auth);
app.use('/', product);
app.use('/', order);
app.use('/', customer);
app.use('/', categories);
app.use('/', orderItems);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
