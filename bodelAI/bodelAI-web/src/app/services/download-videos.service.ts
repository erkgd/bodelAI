import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadVideosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  downloadAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/videos`).pipe(
      timeout(5000) // 5 seconds
    );
  } 
}