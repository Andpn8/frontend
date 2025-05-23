import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NewAnnouncementComponent } from './new-announcement/new-announcement.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NotifyComponent } from './notify/notify.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewAnnouncementStep2Component } from './new-announcement-step2/new-announcement-step2.component';
import { NewAnnouncementStep3Component } from './new-announcement-step3/new-announcement-step3.component';
import { NewAnnouncementStep4Component } from './new-announcement-step4/new-announcement-step4.component';
import { LoginAgentComponent } from './login-agent/login-agent.component';
import { RegisterAgencyComponent } from './register-agency/register-agency.component';
import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { ManageAgentComponent } from './manage-agent/manage-agent.component';
import { LoginAmministratorComponent } from './login-amministrator/login-amministrator.component';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { CatalogComponent } from './catalog/catalog.component';

export const routes: Routes = [

  //HOMEPAGE
  { path: 'home', component: HomepageComponent },

  //CREA ANNUNCIO
  { path: 'new-announcement', component: NewAnnouncementComponent },
  { path: 'new-announcement-step2', component: NewAnnouncementStep2Component },
  { path: 'new-announcement-step3', component: NewAnnouncementStep3Component },
  { path: 'new-announcement-step4', component: NewAnnouncementStep4Component },

  //INFO
  { path: 'about-us', component: AboutUsComponent },

  //NOTIFICHE
  { path: 'notify', component: NotifyComponent },

  //LOGIN E REGISTRAZIONE
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'loginAgent', component: LoginAgentComponent},
  { path: 'registerAgency', component: RegisterAgencyComponent},
  { path: 'loginAgency', component: AgencyLoginComponent},
  { path: 'loginAmministrator', component: LoginAmministratorComponent},

  //API PER LOGIN
  { path: 'login-success', component: LoginSuccessComponent},

  //GESTIONE AGENTI
  { path: 'manageAgent', component: ManageAgentComponent},
  { path: 'createAgent', component: CreateAgentComponent},

  //INFO PROFILO
  { path: 'profile-info', component: ProfileInfoComponent},

  //CATALOGO
  { path: 'catalog', component: CatalogComponent},

  //REDIRECT
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];




