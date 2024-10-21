import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { routes } from '../../app/app.routes';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../app/Core/Services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  // Injection de LoginService via le constructeur
  constructor(public loginService: LoginService) {}

  // Méthode pour se déconnecter
  logout() {
    this.loginService.logout();  // Correction ici : loginService avec minuscule
  }
}
