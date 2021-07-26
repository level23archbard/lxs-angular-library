import { Inject, Injectable, Optional } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  constructor(@Inject('LXS_WINDOW') @Optional() private _window: Window | null) {}

  get window(): Window | null {
    return this._window;
  }
}
