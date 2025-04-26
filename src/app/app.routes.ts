import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NewAnnouncementComponent } from './new-announcement/new-announcement.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NotifyComponent } from './notify/notify.component';

export const routes: Routes = [
    { path: 'home', component: HomepageComponent },
    { path: 'new-announcement', component: NewAnnouncementComponent},
    { path: 'about-us', component: AboutUsComponent},
    { path: 'notify', component: NotifyComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
