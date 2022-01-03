import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatLibService } from '../chat-lib.service';
import { WebsocketioService } from '../websocketio.service';
import { ChatMessageBottomBarComponent } from './chat-message-bottom-bar.component';

describe('ChatMessageBottomBarComponent', () => {
  let component: ChatMessageBottomBarComponent;
  let fixture: ComponentFixture<ChatMessageBottomBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ ChatMessageBottomBarComponent ],
      providers: [ChatLibService, WebsocketioService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send message', () => {
    component.messageForm = new FormGroup({
      message: new FormControl('', Validators.required)
    });
    component.messageForm.controls.message.setValue("Hi Tara");
    const chatService = TestBed.inject(ChatLibService);
    let wss = TestBed.inject(WebsocketioService);
    wss['socket'] = new EventEmitter();
    spyOn(wss['socket'], 'emit').and.returnValue({});
    spyOn(chatService, 'chatListPush');
    spyOn(chatService, 'chatpost');
    component.sendMessage();
    expect(chatService.chatListPush).toHaveBeenCalled()
    expect(chatService.chatpost).toHaveBeenCalled()
  });

});
