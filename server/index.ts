import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server, ServerOptions } from 'socket.io';
import cors from 'cors';
import { handleConnection } from './controllers/socket.controller';
import router from './router';
import './models/database';

const app = express();

// server configuration

dotenv.config();

const port = process.env.PORT || 3333;

const corsOptions: Pick<ServerOptions, 'cors'> = {
  cors: { origin: '*' }
};

// express middlewares

app.use(cors());
app.use(router);

// server bootstrap

function onServerStarted() {
  console.log('server started on port', port);
  const io = new Server(httpServer, corsOptions);
  io.on('connection', handleConnection);
}

const httpServer = createServer(app);

httpServer.listen(port, onServerStarted);
