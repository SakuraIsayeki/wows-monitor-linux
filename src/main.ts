import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module.desktop';
import { environment } from '@environments/environment';

if (environment.production) {
  enableProdMode();
}

window.addEventListener('keydown', event => {
  if (event.key === 'F11') {
    event.preventDefault();
  }
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
