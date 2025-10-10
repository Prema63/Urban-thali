// const mongoose = require('mongoose');
// const { secret } = require('./secret');

// mongoose.set('strictQuery', false);

// // local url 
// // const DB_URL = 'mongodb://localhost:27017/urbanthali'; 
// // mongodb url - fallback to local if not provided
// const DB_URL = 'mongodb+srv://urbanthali:urban12345@cluster0.kywxn3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const MONGO_URI = secret.db_url || DB_URL;

// const connectDB = async () => {
//   try { 
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
//       socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//     });
//     console.log('mongodb connection success!');
//   } catch (err) {
//     console.log('mongodb connection failed!', err.message);
//     // console.log('Please make sure MongoDB is installed and running on your system');
//     // console.log('You can download MongoDB from: https://www.mongodb.com/try/download/community');
//     process.exit(1)
//   }
// };

// module.exports = connectDB;











const mongoose = require('mongoose');
const { secret } = require('./secret');

mongoose.set('strictQuery', false);

// MongoDB Atlas connection string
// Replace 'urbanthali' and 'urban12345' with your actual username and password
// Make sure to URL-encode special characters in your password if needed
// const DB_URL = 'mongodb+srv://urbanthali:urban12345@cluster0.kywxn3o.mongodb.net/urbanthali?retryWrites=true&w=majority&appName=UrbanThali';

// Use secret.db_url if defined, otherwise fallback to DB_URL
const MONGO_URI = secret.db_url || DB_URL;

const connectDB = async () => {
  try { 
    console.log('Trying to connect to MongoDB...');
    console.log(`Using URI: ${MONGO_URI.split('@')[1]}`); // logs host info only for security

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Try for 10 seconds
      socketTimeoutMS: 45000,           // Close sockets after 45s of inactivity
    });

    console.log('✅ MongoDB connection successful!');
  } catch (err) {
    console.error('❌ MongoDB connection failed!');
    console.error('Error message:', err.message);

    if (err.message.includes('Authentication failed')) {
      console.error('⚠️  Check your username, password, and authSource/database name.');
    } else if (err.message.includes('ECONNREFUSED') || err.message.includes('network')) {
      console.error('⚠️  Check your network access and IP whitelist in MongoDB Atlas.');
    }

    process.exit(1); // exit app if DB connection fails
  }
};

module.exports = connectDB;
