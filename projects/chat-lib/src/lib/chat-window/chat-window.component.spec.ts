import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChatWindowComponent } from './chat-window.component';

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ChatWindowComponent ],
      schemas: [NO_ERRORS_SCHEMA]
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
      chatbotUrl: 'https://staging.sunbird.com'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
