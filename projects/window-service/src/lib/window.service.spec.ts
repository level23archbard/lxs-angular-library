import { TestBed } from '@angular/core/testing';

import { WindowService } from './window.service';

describe('WindowService', () => {
  let service: WindowService;
  const mockWindow = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'LXS_WINDOW', useValue: mockWindow },
      ]
    });
    service = TestBed.inject(WindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a window if one is injected', () => {
    expect(service.window).toBeTruthy();
  });
});

describe('WindowService without window', () => {
  let service: WindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not return a window if one is not injected', () => {
    expect(service.window).toBeFalsy();
  });
});
