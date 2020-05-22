import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import socket from './services/socket';
import jobs from './services/jobs';
import 'dotenv/config';
import joiErrors from './middlewares/joiErrors';
import logger from './helpers/logger';
import { connectDb } from './models';
import routes from './routes';

const { NODE_ENV } = process.env;

const isProd = NODE_ENV === 'production';
const app = express();

connectDb()
  .then(async () => {
    logger.info('Mongodb connected');
  })
  .catch((error) => {
    logger.info('Could not connect to Mongodb', error);
  });

const server = http.createServer(app);
const io = socket(server, { log: true, origins: '*:*' });
app.io = io;
jobs(io);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan(isProd ? 'combined' : 'dev'));
app.use(routes);
app.use(joiErrors());

if (isProd) {
  app.use((req, res) => {
    const status = 404;
    res.status(status).json({
      message: 'Not found',
      status,
    });
  });

  app.use((err, req, res) => {
    const status = err.status || 500;
    res.status(status).json({
      errors: {
        message: err.message,
        status,
      },
    });
  });
}

export { server };
export default app;
