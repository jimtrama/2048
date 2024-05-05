import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayComponent } from './play/play.component';
import { SimComponent } from './sim/sim.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { SimControllerComponent } from './components/sim.controller/sim.controller.component';
import { LedgendComponent } from './components/ledgend/ledgend.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    SimComponent,
    HeaderComponent,
    SettingsComponent,
    SimControllerComponent,
    LedgendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, RouterOutlet, 
    RouterLink, RouterLinkActive
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
