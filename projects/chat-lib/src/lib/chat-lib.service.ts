import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of as observableOf, throwError as observableThrowError, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatLibService {
  http: HttpClient;
  public chatList = [];
  public userId;
  public did;
  public appId;
  public channel;
  public chatbotUrl;
  public context;
  constructor(http: HttpClient) {
    this.http = http;
    if (localStorage && localStorage.getItem('chatHistory')) {
      this.chatList = (JSON.parse(localStorage.getItem('chatHistory')));
      localStorage.removeItem('chatHistory');
    }
  }
  chatpost(req?: any): Observable<any> {
    if (!this.did) {
      this.did = Date.now();
    }
    req.data['userId'] = this.userId;
    req.data['appId'] = this.appId;
    req.data['channel'] = this.channel;
    req.data['From'] = (this.did).toString();
    req.data['context'] = this.context;
    return this.http.post(this.chatbotUrl, req.data).pipe(
      mergeMap((data: any) => {
        return observableOf(data);
      }));
  }
  chatListPush(source, msg) {
    const chat = {
      'text': msg,
      'type': source
    };
    this.chatList.push(chat);
    localStorage.setItem('chatHistory', JSON.stringify(this.chatList));
  }
  chatListPushRevised(source, msg) {
    if (msg.data.button) {
      for (const val of msg.data.buttons) {
        val.disabled = false;
      }
    }
    const chat = {
      'buttons': msg.data.buttons,
      'text': msg.data.text,
      'type': source
    };
    this.chatList.push(chat);
    localStorage.setItem('chatHistory', JSON.stringify(this.chatList));
  }
  disableButtons() {
    if (this.chatList.length !== 0) {
      const btns = this.chatList[this.chatList.length - 1].buttons;
      for (const val of btns) {
        val.disabled = true;
      }
    }
  }
}
