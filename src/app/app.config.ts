import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryRecipeService } from './services/in-memory-recipe.service';
import { loggingInterceptor } from './interceptors/logging-interceptor';
import { authInterceptor } from './interceptors/auth-interceptor';
import { provideFormlyCore } from '@ngx-formly/core';
import { withFormlyMaterial } from '@ngx-formly/material';
import { ArrayFormItemComponent } from './form-types/array-form-item.type';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor])),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryRecipeService)),
    provideFormlyCore([
      ...withFormlyMaterial(),
      {
        types: [{ name: 'array', component: ArrayFormItemComponent }],
      },
    ]),
  ],
};
