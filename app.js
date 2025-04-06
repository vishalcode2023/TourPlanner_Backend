const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');

// Importing DB connection
const DBConnection = require('./Config/MangoDBConfig');


// Importing Routes
const authRouter = require('./Router/AuthRouter');
const googleAiRouter = require('./Router/GoogleAiRouter');
const paymentRouter = require('./Router/PaymentRouter');
const BusRouter = require('./Router/BusRouter');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['https://tour-planner-front-end.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // optional: if you're using cookies/auth headers
}));


// Connect to DB
DBConnection();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/',googleAiRouter);
app.use('/api/',BusRouter)
app.use('/api/payment',paymentRouter);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
