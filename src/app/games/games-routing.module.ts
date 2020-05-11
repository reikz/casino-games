import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamesComponent} from './games.component';

const routes: Routes = [
  { path: 'games', component: GamesComponent, data: { title: 'Games' } },
  { path: '**', redirectTo: 'games', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GamesRoutingModule {}
