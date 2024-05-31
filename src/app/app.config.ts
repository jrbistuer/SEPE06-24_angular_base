import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({"projectId":"testcifo03","appId":"1:263353068362:web:d1f54752bf07d9b3816fb3","storageBucket":"testcifo03.appspot.com","apiKey":"AIzaSyAX4VfJLZf7oaIrI9YF46g5Wlq0WktH-xQ","authDomain":"testcifo03.firebaseapp.com","messagingSenderId":"263353068362","measurementId":"G-R5GS6Y0700"})),
    provideAuth(() => getAuth())]
};
