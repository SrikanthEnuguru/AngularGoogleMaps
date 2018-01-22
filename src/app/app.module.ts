import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';

import { AppComponent } from './app.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { environment } from '../environments/environment';
import { InfoWindowComponent } from './info-window/info-window.component';


@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    InfoWindowComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  entryComponents: [InfoWindowComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
