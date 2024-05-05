import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimComponent } from './sim/sim.component';
import { PlayComponent } from './play/play.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path:"play",
    component:PlayComponent
  },
  {
    path:"sim",
    component:SimComponent
  },
  {
    path:"settings",
    component:SettingsComponent
  },
  {
    path:"**",
    redirectTo:"/play"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
