import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CheffClienteModule } from './app.module';
import { enableProdMode } from '@angular/core';

enableProdMode();
platformBrowserDynamic().bootstrapModule(CheffClienteModule);
