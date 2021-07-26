import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WindowModule } from 'projects/window-service/src/lib/window.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WindowModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
