import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { quizFeature } from './store/quiz.feature';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), 
    provideAnimations(), 
    provideHttpClient(), 
    provideStore(),
    provideStoreDevtools(), 
    provideState(quizFeature)
    ]
};
