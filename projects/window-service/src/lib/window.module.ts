import { NgModule } from '@angular/core';

@NgModule({
  providers: [
    { provide: 'LXS_WINDOW', useFactory: () => window },
  ]
})
export class WindowModule { }
