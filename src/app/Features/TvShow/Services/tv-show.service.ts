import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/app-config';
import { TvShow } from 'src/app/Features/TvShow/Models/tv-show';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {
  private apiUrl = environment.apiUrl + '/Show';

  constructor(private http: HttpClient) { }

  getTvShows(): Observable<any[]> {
    return this.http.get<TvShow[]>(this.apiUrl + '/All');
  }

  addTvShow(tvShow: TvShow): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(tvShow.name);
    console.log(tvShow.favorite);
    return this.http.post<any>(this.apiUrl + '/AddTvShow', tvShow, { headers });
  }

  isFavorite(tvShow: TvShow): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiUrl + '/IsFavorite', tvShow, { headers });
  }

  deleteTvShow(name: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<any>(this.apiUrl + '/DeleteTvShow?name=' + name, { headers });
  }
}
