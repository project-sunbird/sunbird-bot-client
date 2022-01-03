import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from "socket.io-client";



@Injectable({
  providedIn: 'root'
})
export class WebsocketioService {

  public socket;
  public triggerInitMsg = new Subject<any>();

  public initSocketConnection(socketURl) {
    const url = new URL(socketURl);
    this.socket = io(url.origin, {
      path: url.pathname == '/' ? '/socket.io' : `${url.pathname}/socket.io`,
      transports: ['websocket'],
      autoConnect: false 
    });

    const sessionid = localStorage.getItem("sessionID");
    const userid = localStorage.getItem("userID");
    if (sessionid) {
      this.socket.auth = { sessionid, userid };
      this.socket.connect();
    } else {
      this.socket.connect();
    }

    this.socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      this.socket.auth = { sessionID, userID };
      this.socket.userID = userID;
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      localStorage.setItem("userID", userID);
      this.triggerInitMsg.next(this.socket)
     
    });

    this.socket.on("connect_error", (err) => {
      // console.log("ERR: SOCKET CONNECTION : ", err);
    });

  }

  public destroyWSConnection() {
    this.socket.off("connect_error");
    this.socket.off("connect");
    this.socket.off("botRequest");
    this.socket.emit('endConnection');
  }


}
 