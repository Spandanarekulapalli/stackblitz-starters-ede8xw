import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { TeamDetailsResponse } from './team-detail/team-detail.model';
import { TeamResponse } from './standings/standing.model';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  private apiUrl = environment.apiendpoint;

  private selectedCountry = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {}

  setSelectCountry(value: number) {
    this.selectedCountry.next(value);
  }
  getSelectCountry() {
    return this.selectedCountry.asObservable();
  }

  getCountries() {
    return this.http.get(this.apiUrl);
  }

  getCurrentSeason(leagueId: string): Observable<TeamResponse> {
    // Define headers
    const headers = new HttpHeaders({
      'x-rapidapi-host': environment.hostname,
      'x-rapidapi-key': environment.apiKey,
    });

    // Define query parameters
    const params = {
      league: leagueId,
      season: '2023',
    };

    // Add headers to the request
    const options = { headers: headers, params: params };

    return this.http.get<TeamResponse>(this.apiUrl + '/standings', options);
  }

  viewTeamResults(teamId: string): Observable<TeamDetailsResponse> {
    // Define headers
    const headers = new HttpHeaders({
      'x-rapidapi-host': environment.hostname,
      'x-rapidapi-key': environment.apiKey,
    });

    // Define query parameters
    const params = {
      team: teamId,
      season: '2023',
      last: '10',
    };
    // Add headers to the request
    const options = { headers: headers, params: params };

    return this.http.get<TeamDetailsResponse>(
      this.apiUrl + '/fixtures',
      options
    );
  }
}
