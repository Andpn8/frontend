import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NewAnnouncementComponent } from './new-announcement/new-announcement.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NotifyComponent } from './notify/notify.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewAnnouncementStep2Component } from './new-announcement-step2/new-announcement-step2.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'new-announcement', component: NewAnnouncementComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'notify', component: NotifyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-announcementStep2', component: NewAnnouncementStep2Component },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
