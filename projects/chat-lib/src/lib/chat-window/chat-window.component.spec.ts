import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { ChatWindowComponent } from './chat-window.component';
import { WebsocketioService } from '../websocketio.service';
import { ChatLibService } from '../chat-lib.service';

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWindowComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [WebsocketioService, ChatLibService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowComponent);
    component = fixture.componentInstance;
    component.inputValues = {
      did: 'did123',
      userId: 'U123',
      channel: '123',
      appId: 'sunbird.bot',
      chatbotUrl: 'https://staging.sunbird.com',
      socketUrl: 'http://localhost:3005',
      botInitMsg: 'Hi'
    }
    fixture.detectChanges();
    
  });


  it('should create call ngInit for socket connection', async() => {
    component.ngOnInit();
    expect(component.inputValues.title).toEqual('Ask Bot');
  });


  it('should listen for bot response on bot expand', async() => {
    const wss = TestBed.inject(WebsocketioService);
    spyOn(wss, 'initSocketConnection').and.callThrough();
    spyOn(component, 'listenBotResponse');
    component.expandChatIntent();
    expect(component.inputValues.collapsed).toBeFalsy();
    expect(component.listenBotResponse).toHaveBeenCalled();
  });

  it('should destroy socket connection on closing bot', async() => {
    const wss = TestBed.inject(WebsocketioService);
    spyOn(wss, 'destroyWSConnection');
    component.collapseChatIntent();
    expect(component.inputValues.collapsed).toBeTruthy();
    expect(wss.destroyWSConnection).toHaveBeenCalled();
  });

  xit('should listen for bot response', async() => {
    const chatService = TestBed.inject(ChatLibService);
    const wss = TestBed.inject(WebsocketioService);
    spyOn(chatService, 'chatListPushRevised');
    component.listenBotResponse();
  });

});
