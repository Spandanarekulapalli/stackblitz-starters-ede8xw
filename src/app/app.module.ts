import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandingsComponent } from './standings/standings.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, StandingsComponent, TeamDetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ToastrModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
