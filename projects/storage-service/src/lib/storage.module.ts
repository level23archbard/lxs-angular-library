import { NgModule } from '@angular/core';
import { WindowModule } from 'lxs-window/projects/window-service/src/public-api';

@NgModule({
  imports: [
    WindowModule,
  ],
  providers: [
    { provide: 'LXS_LOCAL_STORAGE', useFactory: () => localStorage },
  ],
})
export class StorageModule { }
