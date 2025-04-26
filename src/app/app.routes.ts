import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NewAnnouncementComponent } from './new-announcement/new-announcement.component';

export const routes: Routes = [
    { path: 'home', component: HomepageComponent },
    { path: 'new-announcement', component: NewAnnouncementComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
