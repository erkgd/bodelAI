import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUploadService } from '../services/video-upload.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  videoSrc: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;
  timeoutError: boolean = false;
  isLoading: boolean = false;

  constructor(private videoUploadService: VideoUploadService) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        const videoUrl = URL.createObjectURL(file);
        this.videoSrc = videoUrl;
        this.errorMessage = null;
        this.timeoutError = false;
        this.isLoading = true;
        console.log('Video cargado correctamente:', videoUrl);

        // Upload the video
        this.videoUploadService.uploadVideo(file).subscribe({
          next: (response) => {
            console.log('Video subido correctamente:', response);
            this.isLoading = false;
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error al subir el video:', error);
            this.isLoading = false;
            if (error.status === 408) { // 408 Request Timeout
              this.timeoutError = true;
            } else if (error.status >= 500 && error.status < 600) { // 5xx Server Errors
              this.errorMessage = 'Server error. Please try again later.';
            } else {
              this.errorMessage = 'Error uploading video. Please try again.';
            }
          }
        });
      } else {
        this.errorMessage = 'Unsupported video format. Please upload a video in MP4, WebM, or Ogg format.';
      }
    }
  }
}