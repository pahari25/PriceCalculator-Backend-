require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

 const serviceRoutes = require('./routes/services');
 const requestRoutes =require('./routes/request')
// const emailRoutes = require('./routes/email');
// const authRoutes = require('./routes/auth');

const app = express();

// Middleware
const corsOptions = {
  // Your frontend's development server URL(s)
  origin: [process.env.DEV_FRONT_URL, process.env.PROD_FRONT_URL].filter(Boolean),
  optionsSuccessStatus: 200
};
  
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend server is running successfully.' });
});

// Routes


 app.use('/api/services', serviceRoutes);
 app.use('/api/request',requestRoutes)
// app.use('/api', emailRoutes);
// app.use('/api/auth', authRoutes);




// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`✅ Connected to DB & Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('DB Connection Error:', error);
  });
