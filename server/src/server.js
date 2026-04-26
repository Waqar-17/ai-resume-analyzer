const app = require('./app');
const connectDB = require('./config/db');

// Connect to Database
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log("Skipping MongoDB connection: MONGO_URI not found in .env");
}

const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
