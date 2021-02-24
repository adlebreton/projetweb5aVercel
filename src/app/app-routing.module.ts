import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from '../app/auth/auth.component';
import { ForgotComponent } from '../app/forgot/forgot.component';
import { AddictPanelComponent } from './addict-panel/addict-panel.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { ResetComponent } from './forgot/reset.component';

const appRoutes: Routes = [
  { path: '',  component:HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'main', data:{key:'value', key2:'value'},component: MainComponent },
  { path: 'addictions',data:{key:'value'}, component: AddictPanelComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
