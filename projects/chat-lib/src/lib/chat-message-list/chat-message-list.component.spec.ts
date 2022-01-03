import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { ChatMessageListComponent } from './chat-message-list.component';
import { ChatLibService } from '../chat-lib.service';
import { WebsocketioService } from '../websocketio.service';

describe('ChatMessageListComponent', () => {
  let component: ChatMessageListComponent;
  let fixture: ComponentFixture<ChatMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ChatLibService, WebsocketioService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageListComponent);
    component = fixture.componentInstance;
    component.did = 'did123';
    component.userId = 'U123';
    component.channel = '123';
    component.appId = 'sunbird.bot';
    component.chatbotUrl = 'https://staging.sunbird.com';
    component.botInitMsg = 'Hi'
    fixture.detectChanges();
  });

  it('should create ngOnInit', () => {
    const chatService = TestBed.inject(ChatLibService);
    spyOn(chatService, 'chatpost');
    const wss = TestBed.inject(WebsocketioService);
    wss['socket'] = new EventEmitter();
    spyOn(wss['socket'], 'emit').and.returnValue({});
    component.ngOnInit();
    expect(chatService.appId).toEqual(component.appId);
    expect(chatService.chatpost).toHaveBeenCalled();
  });


});
