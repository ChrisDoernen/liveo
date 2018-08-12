import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
  { path: '', redirectTo: '/languages', pathMatch: 'full' },
  { path: 'languages', component: SelectLanguageComponent },
  { path: 'languages/:id', component: PlayerComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}