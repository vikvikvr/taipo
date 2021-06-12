import mongoose, { ConnectOptions, CallbackError } from 'mongoose';
import dotenv from 'dotenv';

// database configuration

dotenv.config();

const url = process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/';
const databaseName = process.env.DB_NAME || 'playground';
const uri = `${url}/${databaseName}`;

const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// connect to database

function callback(error: CallbackError) {
  if (error) {
    console.log('failed to connect to database 😟', error);
  } else {
    console.log('connected to database 👍');
  }
}

mongoose.connect(uri, options, callback);

export default mongoose;
