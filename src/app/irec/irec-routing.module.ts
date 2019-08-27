import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/irec/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'todo', loadChildren: './todo/todo.module#TodoPageModule',
  canActivate: [AuthGuardService], },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule',
  canActivate: [AuthGuardService], }
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class IrecRoutingModule { }
