import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Headers, Track, TrackList} from "../top-tracks/track.model";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class LastfmService {
  constructor(private http: HttpClient) { }
  private jamendoApiUrl = 'https://api.jamendo.com/v3.0/tracks';
  private clientId = 'e386f5a7';
  getTopTracks() {
    const url = `${environment.apiUrl}?method=chart.gettoptracks&api_key=${environment.apiKey}&format=json`;
    console.log(url);
    return this.http.get<LastfmAPIResponse>(url).pipe(map(data =>data.tracks.track));
  }
  getAllTopTracks(): Observable<any> {
    const payload = {
      client_id: this.clientId,
      order: 'popularity_total',
      limit: '28',
      format: 'json',
    };
    return this.http.get<JamendoApiResponse>(this.jamendoApiUrl, { params: payload }).pipe(map(data => data.results));
  }

}
export interface LastfmAPIResponse{
  tracks: {track:Track[]};
}
 export interface JamendoApiResponse{
    headers: Headers;
    results: TrackList[];
 }
