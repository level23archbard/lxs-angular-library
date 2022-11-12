import { NgModule } from '@angular/core';
import { WindowModule } from '@level23archbard/window-service';

export function storageModuleFactory(): Storage {
  return localStorage;
}

@NgModule({
  imports: [
    WindowModule,
  ],
  providers: [
    { provide: 'LXS_LOCAL_STORAGE', useFactory: storageModuleFactory },
  ],
})
export class StorageModule { }
