// @ts-ignore
import { ApplicationConfig } from '@angular/core';
// @ts-ignore
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// @ts-ignore
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync()]
};
