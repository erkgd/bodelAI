import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUploadService } from '../../services/video-upload.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DragAndDropComponent } from '../../shared/drag-and-drop/drag-and-drop.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DragAndDropComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  videoSrc: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;
  timeoutError: boolean = false;
  isLoading: boolean = false;

  constructor(private videoUploadService: VideoUploadService) {}

  onFileDropped(file: File) {
    if (file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      this.videoSrc = videoUrl;
      this.errorMessage = null;
      this.timeoutError = false;
      this.isLoading = true;
      console.log('Video cargado correctamente:', videoUrl);

      this.videoUploadService.uploadVideo(file).subscribe({
        next: (response) => {
          console.log('Video subido correctamente:', response);
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al subir el video:', error);
          this.isLoading = false;
          if (error.status === 408) {
            this.timeoutError = true;
          } else if (error.status >= 500 && error.status < 600) {
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