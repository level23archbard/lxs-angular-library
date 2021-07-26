import { Inject, Injectable, Optional } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  private _window: Window | null;
  constructor(@Inject('LXS_WINDOW') @Optional() _window: any) {
    this._window = _window;
  }

  get window(): Window | null {
    return this._window;
  }
}
