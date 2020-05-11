import { NgModule } from '@angular/core';
import {GamesComponent} from './games.component';
import {GamesRoutingModule} from './games-routing.module';
import {CoreModule} from '../core/core.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GamesService} from './games.service';
import {CustomCurrencyPipe} from '../shared/currency.pipe';


@NgModule({
  imports: [
    GamesRoutingModule,
    CoreModule,
    NgbModule
  ],
  declarations: [
    GamesComponent,
    CustomCurrencyPipe
  ],
  entryComponents: [],
  providers: [GamesService,
    CustomCurrencyPipe]
})
export class GamesModule {}
