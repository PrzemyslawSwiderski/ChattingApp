import {Configuration} from "./Configuration";
import * as $ from "jquery";

import * as socketIo from 'socket.io-client'

export class Communication {

  private webSocket: SocketIOClient.Socket;

  constructor() {
    this.webSocket = socketIo(Configuration.apiUrl);
    this.serveMessaging();
    this.serveClear();

  }

  emitMsg(txt: string | number | string[] | undefined) {
    this.webSocket.emit("client-message", txt);
  }

  serveClear(): any {
    $('#clear_button').on("click", () => {
      console.log("Clearing messages list");
      $("#messages").empty();
    });
  }

  serveMessaging() {
    $('#send_button').on("click", () => {
      let text_area: string | number | string[] | undefined = $("#main-input").val();
      console.log("Sending to server: " + text_area);
      this.emitMsg(text_area)
    });
    this.webSocket.on("server-message", function (msg: string) {
      $('#messages').append($('<li>').text(msg));
    });
  }
}