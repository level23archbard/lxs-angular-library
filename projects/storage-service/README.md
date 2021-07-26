# storage-service

This library contains a service named `StorageService`, which can be injected to provide a reactive, key-object-based accessor to `localStorage`, via storage keys. Storage keys will carefully watch the stored value and will provide subscription-based updates whenever the value changes, even across separate application instances.

It requires the `StorageModule` is imported in order to use.

## Module Configuration

Add the following import to your module:
`import { StorageModule } from '@level23archbard/storage-service';`

And add the `StorageModule` item to the NgModule.imports array.
