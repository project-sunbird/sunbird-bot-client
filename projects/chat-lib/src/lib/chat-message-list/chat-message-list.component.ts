import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, Input } from '@angular/core';
import { ChatLibService } from '../chat-lib.service';
import { takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs';
@Component({
  selector: 'lib-chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.scss']
})
export class ChatMessageListComponent implements OnInit, AfterViewChecked {
  @ViewChild('msgScrollToBottom') private msgScrollToBottom: ElementRef;
  
  @Input() did: string;
  @Input() userId: string;
  @Input() channel: string;
  @Input() appId: string;
  @Input() chatbotUrl:string;
  @Input() context:string;

  public array = [
  ];
  public unsubscribe$ = new Subject<void>();
  constructor(public chatService: ChatLibService) { }

  ngOnInit() {
    this.array = this.chatService.chatList;
    this.chatService.userId = this.userId || null;
    this.chatService.did = this.did || null;
    this.chatService.channel = this.channel || null;
    this.chatService.appId = this.appId || null;
    this.chatService.chatbotUrl = this.chatbotUrl || null;
    this.chatService.context = this.context || null;
    
    if (this.array.length === 0 ) {
      const req = {
        data: {
          Body: "0"
          }
        }
      this.chatService.chatpost(req).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        this.chatService.chatListPushRevised('recieved', data)
      },err => {
        this.chatService.chatListPushRevised('recieved', err.error.data)
      });
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.msgScrollToBottom.nativeElement.scrollTop = this.msgScrollToBottom.nativeElement.scrollHeight;
    } catch (err) { 
      
    }
  }

}
