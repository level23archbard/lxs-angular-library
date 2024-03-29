import { TestBed } from '@angular/core/testing';
import { WindowService } from '@level23archbard/window-service';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  const mockWindowService = {
    window: {
      callback: (_: any) => {},
      addEventListener(_: string, callback: (event: any) => void) {
        this.callback = callback;
      },
    },
  };
  const mockLocalStorage = {
    storage: {},
    getItem(key: string) {
      return (this.storage as Record<string, any>)[key] || null;
    },
    setItem(key: string, value: any) {
      (this.storage as Record<string, any>)[key] = value;
    },
    removeItem(key: string) {
      (this.storage as Record<string, any>)[key] = null;
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowService, useValue: mockWindowService },
        { provide: 'LXS_LOCAL_STORAGE', useValue: mockLocalStorage },
      ],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate keys', () => {
    const testKey = service.stringKey('test');
    expect(testKey).toBeTruthy();
    const test2Key = service.stringKey('test');
    expect(test2Key).toBe(testKey);
    const testJsonKey = service.jsonKey('json');
    expect(testJsonKey).toBeTruthy();
  });

  it('should trigger key value updates', () => {
    const testKey = service.stringKey('test');
    let testValue: string | null = 'INITIAL SLATE VALUE SHOULD BE NULL';
    testKey.get().subscribe((value) => testValue = value);
    expect(testValue).toBeNull();
    testKey.set('testing');
    expect(testValue).toBe('testing');
    testKey.set(null);
    expect(testValue).toBeNull();

    const testJsonKey = service.jsonKey<{ field: string }>('testJson');
    let testJsonValue: { field: string } | null = { field: 'INITIAL SLATE VALUE SHOULD BE NULL' };
    testJsonKey.get().subscribe((value) => testJsonValue = value);
    expect(testJsonValue).toBeNull();
    testJsonKey.set({ field: 'testing' });
    expect(testJsonValue).toEqual({ field: 'testing' });
    testJsonKey.set(null);
    expect(testJsonValue).toBeNull();
  });

  it('should respond to window storage events', () => {
    // Initial slate value should be null
    const testKey = service.stringKey('test');
    let testValue: string | null = 'INITIAL SLATE VALUE SHOULD BE NULL';
    testKey.get().subscribe((value) => testValue = value);
    expect(testValue).toBeNull();
    // A storage event should update the value
    mockWindowService.window.callback({ key: 'test', newValue: 'testing' });
    expect(testValue).toBe('testing');
    // A storage event for another key should not update the value
    mockWindowService.window.callback({ key: 'test2', newValue: 'asdfasdf' });
    expect(testValue).toBe('testing');
    // An event without a key should not update the value
    mockWindowService.window.callback({});
    expect(testValue).toBe('testing');
  });

  it('should support current getters', () => {
    // Initial slate value should be null
    const testKey = service.stringKey('test');
    let testValue = testKey.getCurrent();
    expect(testValue).toBeNull();
    // Default value should display
    testValue = testKey.getCurrentWithDefault('default');
    expect(testValue).toBe('default');
    // Value should set and be readable
    testKey.set('value');
    testValue = testKey.getCurrent();
    expect(testValue).toBe('value');
    testValue = testKey.getCurrentWithDefault('default');
    expect(testValue).toBe('value');
    // Value should clear and be readable
    testKey.set(null);
    testValue = testKey.getCurrent();
    expect(testValue).toBeNull();
    testValue = testKey.getCurrentWithDefault('default');
    expect(testValue).toBe('default');
  });
});

describe('StorageService without localStorage', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate keys', () => {
    const testKey = service.stringKey('test');
    expect(testKey).toBeTruthy();
    const test2Key = service.stringKey('test');
    expect(test2Key).toBe(testKey);
    const testJsonKey = service.jsonKey('json');
    expect(testJsonKey).toBeTruthy();
  });

  it('should trigger key value updates', () => {
    const testKey = service.stringKey('test');
    let testValue: string | null = 'INITIAL SLATE VALUE SHOULD BE NULL';
    testKey.get().subscribe((value) => testValue = value);
    expect(testValue).toBeNull();
    testKey.set('testing');
    expect(testValue).toBe('testing');
    testKey.set(null);
    expect(testValue).toBeNull();

    const testJsonKey = service.jsonKey<{ field: string }>('testJson');
    let testJsonValue: { field: string } | null = { field: 'INITIAL SLATE VALUE SHOULD BE NULL' };
    testJsonKey.get().subscribe((value) => testJsonValue = value);
    expect(testJsonValue).toBeNull();
    testJsonKey.set({ field: 'testing' });
    expect(testJsonValue).toEqual({ field: 'testing' });
    testJsonKey.set(null);
    expect(testJsonValue).toBeNull();
  });
});
