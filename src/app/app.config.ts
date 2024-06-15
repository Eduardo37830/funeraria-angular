import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BarController, Colors, Legend } from 'chart.js';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AuthInterceptor } from './interceptors/auth.interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
    ), provideCharts(withDefaultRegisterables()),
    provideCharts(withDefaultRegisterables()),
    provideCharts({ registerables: [BarController, Legend, Colors] }),
    { provide: MAT_DATE_FORMATS, useValue: { display: { dateInput: 'YYYY/DD/MM' } } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ] 
};
