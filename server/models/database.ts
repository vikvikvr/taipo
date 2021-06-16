import mongoose, { ConnectOptions, CallbackError } from 'mongoose';
import dotenv from 'dotenv';
import { debug } from '..';

// database configuration

dotenv.config();

const url = process.env.DB_CONNECTION_URL;
const databaseName = process.env.DB_NAME;
const uri = `${url}/${databaseName}`;

const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// connect to database

function callback(error: CallbackError) {
  if (error) {
    debug && console.log('failed to connect to database 😟', error);
  } else {
    debug && console.log('connected to database 👍');
  }
}

mongoose.connect(uri, options, callback);

export default mongoose;
