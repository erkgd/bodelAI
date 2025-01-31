import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'videos', component: VideosComponent},
    { path: '**', redirectTo: '/' },
];