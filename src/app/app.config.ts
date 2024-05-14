import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BarController, Colors, Legend } from 'chart.js';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
    ), provideCharts(withDefaultRegisterables()),
    provideCharts(withDefaultRegisterables()),
    provideCharts({ registerables: [BarController, Legend, Colors] }),
    { provide: MAT_DATE_FORMATS, useValue: { display: { dateInput: 'YYYY/DD/MM' } } }
  ]
};
