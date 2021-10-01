import http from 'http';
import express from 'express';
import { test } from './test';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: '/ endpoint' });
});

app.get('/', test);

const server = http.createServer(app);

const start = async () => {
  try {
    await app.listen(8080, () => console.log(`Server is running on 8080`));
  } catch (err) {
    console.log(err);
  }
};

start();
