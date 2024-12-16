import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { DocenteMenuComponent } from './docente-menu/docente-menu.component';

@NgModule({
  declarations: [AppComponent, UserMenuComponent,DocenteMenuComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"registrapp-be99a","appId":"1:685389501226:web:25ab24186b8733d3390453","storageBucket":"registrapp-be99a.appspot.com","apiKey":"AIzaSyBkgO-tPwYc3R1BPRYRCPernDDAZXCD4OU","authDomain":"registrapp-be99a.firebaseapp.com","messagingSenderId":"685389501226","measurementId":"G-SZ0NRG84LL"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())],
  bootstrap: [AppComponent],
})
export class AppModule {}
