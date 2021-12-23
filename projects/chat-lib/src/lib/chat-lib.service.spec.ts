import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatLibService } from './chat-lib.service';

describe('ChatLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers:[ChatLibService],
    schemas: [NO_ERRORS_SCHEMA]
  }));


  it('should be created', () => {
    const service: ChatLibService = TestBed.get(ChatLibService);
    expect(service).toBeTruthy();
  });
});