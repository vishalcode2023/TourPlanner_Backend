const mongoose = require('mongoose');

const DBConnection = async () => {
  try {
    // If already connected, return early
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected.');
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1); // Optional: Exit process if DB fails
  }
};

module.exports = DBConnection;
