import { Component, OnInit, Input } from '@angular/core';
import { ChatLibService } from '../chat-lib.service';
import { takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs';

@Component({
  selector: 'lib-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() data;
  public buttons = [];
  public isButtonAvailable = false;
  public unsubscribe$ = new Subject<void>();
  constructor(public chatService: ChatLibService) {
  }

  ngOnInit() {
    if (this.data.buttons) {
      this.isButtonAvailable = true;
      this.buttons = this.data.buttons;
    }
    this.buttons = this.data.buttons ? this.data.buttons : '';
  }

  buttonClicked(indx, text) {
    this.disableButtons();
    this.chatService.chatListPush('sent', text);
    const req = {
      data: {
        Body: indx
        }
      };
    this.sendMessage(req);
  }

  disableButtons() {
    this.chatService.disableButtons();
  }

  sendMessage(req) {
    this.chatService.chatpost(req).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.chatService.chatListPushRevised('recieved', data);

    }, err => {
      this.chatService.chatListPushRevised('recieved', err.error);
    });
  }
}
