import { NgModule } from '@angular/core';

export function windowModuleFactory() {
  return window;
}

@NgModule({
  providers: [
    { provide: 'LXS_WINDOW', useFactory: windowModuleFactory },
  ]
})
export class WindowModule { }
