import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GamesModule} from './games/games.module';
import {CoreModule} from './core/core.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import LocaleEnGB from '@angular/common/locales/en-GB';
import {registerLocaleData} from '@angular/common';


registerLocaleData(LocaleEnGB);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    CoreModule,
    GamesModule,
    AppRoutingModule
  ],
  providers: [
    {
    provide: LOCALE_ID,
    useValue: 'en-GB'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
