import { Component } from '@angular/core';
import { DownloadVideosService } from '../../services/download-videos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos',
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class AdminVideosComponent {
  
  videos: any[] = [];

  constructor(private downloadVidsService: DownloadVideosService) {}
  ngOnInit(): void {
    this.downloadVidsService.downloadAll().subscribe({
      next: (response:any) => {
        console.log('Videos downloaded correctly:', response);
        this.videos = this.videos.concat(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error downloading videos:', error);
      }
    });
  }
}
