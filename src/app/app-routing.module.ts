import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsComponent } from './standings/standings.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
const routes: Routes = [
  {
    path: '',
    component: StandingsComponent,
  },
  { path: 'standings/:id', component: StandingsComponent },
  { path: 'team/:id', component: TeamDetailComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
