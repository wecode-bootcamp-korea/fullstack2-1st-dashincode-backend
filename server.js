import http from 'http';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const PORT = 8000 | process.env.DATABASE_URL;
const app = express();

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const server = http.createServer(app);

const start = async () => {
  try {
    await app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
