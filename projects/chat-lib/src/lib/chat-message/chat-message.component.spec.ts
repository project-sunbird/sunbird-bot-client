import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatMessageComponent } from './chat-message.component';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;
  const buttonsMock = {
    buttons: [
      {text: 'Option 1', value: '1'},
      {text: 'Option 2', value: '2'},
    ]
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ChatMessageComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    component.data = {
      'buttons': [
        {text: 'Option 1', value: '1'},
        {text: 'Option 2', value: '2'},
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    component.data = buttonsMock;
    expect(component).toBeTruthy();
  });
});
