import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GoogleSchedulesComponent } from './components/google/schedules/google-schedules.component';
import { GoogleAuthComponent } from './components/google/auth/google-auth.component';
import { GoogleAuthCallbackComponent } from './components/google/auth/google-auth-callback.component';
import { GoogleGuardedRouteService } from './services/google/authorization/google-guarded-route.service';

import { BaseComponent } from './base.component';
import { GoogleComponent } from './google.component';

const routes: Routes = [
  {
    path: 'google',
    component: GoogleComponent,
    children: [
      { path: 'auth', component: GoogleAuthComponent},
      { path: 'auth-callback', component: GoogleAuthCallbackComponent },
      { path: '', component: GoogleSchedulesComponent, canActivate: [GoogleGuardedRouteService] },
    ]
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '', component: HomeComponent,
        canActivate: []
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
