import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionComponent } from './components/session/session.component';

const routes: Routes = [
  { path: '', redirectTo: '/session', pathMatch: 'full' },
  { path: 'session', component: SessionComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}