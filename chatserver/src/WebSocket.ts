import {Server} from "http";
import {User} from "./User";
import {Message} from "./Message";
import * as socketIo from "socket.io";
import {Socket} from "socket.io";


export class WebSocket {

  private users: User[];

  private server: Server;

  private messages: Message[];

  constructor(server: Server) {
    this.server = server;
  }

  createWSServer() {
    const io = socketIo.listen(this.server);
    io.on('connection', (socket: Socket) => {
      console.log("Test");
      //connection is up, let's add a simple simple event
      socket.on('client-message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        socket.emit("server-message", `Server: you sent -> ${message}`);
      });

    });
  }

}