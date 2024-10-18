import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
    { path: '',component:HomeComponent},
    { path: 'details-produits',component:ProductDetailsComponent},
];