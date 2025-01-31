import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadVideo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('video', file);

    return this.http.post(`${this.apiUrl}/api/upload`, formData).pipe(
      timeout(5000) // 5 seconds
    );
  }
}