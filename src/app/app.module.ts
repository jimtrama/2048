import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayComponent } from './pages/play/play.component';
import { SimComponent } from './pages/sim/sim.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SimControllerComponent } from './components/sim.controller/sim.controller.component';
import { LedgendComponent } from './components/ledgend/ledgend.component';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { CreatorPageComponent } from './pages/creator-page/creator-page.component';
import { BlockComponent } from './pages/creator-page/comps/block/block.component';
import { VarBlockComponent } from './pages/creator-page/comps/var-block/var-block.component';
import { IfBlockComponent } from './pages/creator-page/comps/if-block/if-block.component';
import { StatementBlockComponent } from './pages/creator-page/comps/statement-block/statement-block.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    SimComponent,
    HeaderComponent,
    SettingsComponent,
    SimControllerComponent,
    LedgendComponent,
    BoardViewComponent,
    CreatorPageComponent,
    BlockComponent,
    IfBlockComponent,
    StatementBlockComponent,
    
    VarBlockComponent
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
