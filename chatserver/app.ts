import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import {WebSocket} from "./src/WebSocket";

const app = express();
app.use(cors());

//initialize a simple http server
const server = http.createServer(app);

const webSocket = new WebSocket(server);

//start our server

const port: number = Number(process.env.port) || 3000;

webSocket.createWSServer();

server.listen(port, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});