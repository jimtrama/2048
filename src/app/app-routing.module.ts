import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimComponent } from './pages/sim/sim.component';
import { PlayComponent } from './pages/play/play.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CreatorPageComponent } from './pages/creator-page/creator-page.component';

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
    path:"creator",
    component:CreatorPageComponent
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
