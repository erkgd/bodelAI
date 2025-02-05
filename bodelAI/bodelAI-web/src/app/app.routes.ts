import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AdminVideosComponent } from './features/admin-videos/admin-videos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'videos', component: AdminVideosComponent},
    { path: '**', redirectTo: '/' },
];