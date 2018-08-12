import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectLanguageComponent } from './components/select-language/select-language.component';

const routes: Routes = [
  { path: '', redirectTo: '/languages', pathMatch: 'full' },
  { path: 'languages', component: SelectLanguageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}