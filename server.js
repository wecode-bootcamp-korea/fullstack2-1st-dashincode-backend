import app from './app';
import dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;

const start = async () => {
  try {
    await app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();