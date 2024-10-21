import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from './Pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent,NavbarComponent,ProductDetailsComponent,DashboardComponent, LoginComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bateau-frontend';
  imagePath: any = 'assets/photo/photo1.jpg';
}
