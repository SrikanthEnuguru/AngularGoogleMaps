import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { environment } from '../environments/environment';
import { InfoWindowComponent } from './info-window/info-window.component';
import { MyMapsComponent } from './my-maps/my-maps.component';
import { ProductInfoComponent } from './product-info/product-info.component';


@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    InfoWindowComponent,
    MyMapsComponent,
    ProductInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  entryComponents: [InfoWindowComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
