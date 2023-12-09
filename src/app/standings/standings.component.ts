import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FootballService } from '../football.service';
import { Standing, TeamResponse } from './standing.model';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit {
  teams: Standing[] = [];
  countryId: number | null = null;

  constructor(
    private router: Router,
    private footbal: FootballService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.footbal.getSelectCountry().subscribe(
      (country: number | null) => {
        if (country) {
          this.countryId = country;
          this.loadStandings(country);
        }
      },
      (error) => {
        // Handle errors
        this.toastr.error('Error!', 'Something went wrong');
        console.error('Error fetching data:', error);
      }
    );
  }

  getCurrentSeason(leagueId: number) {
    this.footbal.setSelectCountry(leagueId);
  }

  loadStandings(leagueId: number) {
    this.footbal.getCurrentSeason(leagueId.toString()).subscribe(
      (data: TeamResponse) => {
        // Handle the response data
        this.teams = data.response[0].league.standings[0];
      },
      (error) => {
        // Handle errors
        this.toastr.error('Error!', 'Something went wrong');
        console.error('Error fetching data:', error);
      }
    );
  }

  viewTeamResults(teamId: number): void {
    this.router.navigate(['/team', teamId]);
  }
}
