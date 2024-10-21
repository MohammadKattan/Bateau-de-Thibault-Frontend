import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from './Pages/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '',component:HomeComponent},
    { path: 'details-produits',component:ProductDetailsComponent, canActivate: [AuthGuard]},
    { path: 'Dashboard-Component', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'login',component:LoginComponent},
];