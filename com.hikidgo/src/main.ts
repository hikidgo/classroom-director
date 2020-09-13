import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppSettingsService } from './app/services/app-settings/app-settings.service';

(async () => {
  
  await new AppSettingsService().init();
  
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

})();