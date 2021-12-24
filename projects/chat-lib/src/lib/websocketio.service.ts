import { Injectable } from '@angular/core';
import { io } from "socket.io-client";



@Injectable({
  providedIn: 'root'
})
export class WebsocketioService {

  public socket

  public initSocketConnection(socketURl) {
    const URL = socketURl;
    this.socket = io(URL, { 
      transports: ['websocket'],
      autoConnect: false 
    });

    const sessionID = localStorage.getItem("sessionID");
    const userID = localStorage.getItem("userID");
    if (sessionID) {
      this.socket.auth = { sessionID, userID };
      this.socket.connect();
    } else {
      this.socket.connect();
    }

    this.socket.on("session", ({ sessionid, userid }) => {
      // attach the session ID to the next reconnection attempts
      this.socket.auth = { sessionid, userid };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionid);
      localStorage.setItem("userID", userid);
      // save the ID of the user
      this.socket.userID = userid;
    });

    this.socket.on("connect_error", (err) => {
      console.log("ERR: SOCKET CONNECTION : ",err);
    });

  }

  public destroyWSConnection() {
    this.socket.off("connect_error");
    this.socket.off("connect");
    this.socket.off("botRequest");
  }


}
 