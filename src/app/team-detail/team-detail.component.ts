import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FootballService } from '../football.service';
import { TeamObject, TeamDetailsResponse } from './team-detail.model';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
})
export class TeamDetailComponent implements OnInit {
  teamId: string = '';
  teamDetailList: TeamObject[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private footbal: FootballService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      // Check if id is not null before calling toString()
      this.teamId = id !== null ? id.toString() : '';
    });

    this.footbal.viewTeamResults(this.teamId).subscribe(
      (data: TeamDetailsResponse) => {
        // Handle the response data
        this.teamDetailList = data.response;
      },
      (error) => {
        // Handle errors
        this.toastr.error('Error!', 'Something went wrong');
        console.error('Error fetching data:', error);
      }
    );
  }

  goToLeagueSelection(): void {
    this.router.navigate(['/']);
  }
}
