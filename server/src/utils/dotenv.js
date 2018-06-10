import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT, MONGO_URI, ACCESS_SECRET, REFRESH_SECRET,
} = process.env;
