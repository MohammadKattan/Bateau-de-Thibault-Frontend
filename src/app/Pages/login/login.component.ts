import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Core/Services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../Core/Services/NotificationService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  [x: string]: any;
  email: string = '';
  password: string = '';
  errorMessage: string = '';  
  username: string = '';
  etat: boolean = false; 
  
  constructor(private LoginService: LoginService, private NotificationService: NotificationService , private router:Router) {}

  onLogin() {
     this.LoginService.login({ username:this.email, password:this.password}).subscribe(
      (response: { access: string; refresh: string; }) => {

        localStorage.setItem('access_token', response.access);
         localStorage.setItem('refresh_token', response.refresh);
         this.etat = true;
         this.NotificationService.showNotification(`Connexion a réussie !`);
          this.router.navigate(['/']);
      },
       (error: HttpErrorResponse) => { 
        this.NotificationService.showNotification(`Connexion a échoué !`);
      }
    );
  }
    
  onLogout() {
    // Supprimer les tokens du localStorage ou sessionStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.etat = false;
      
      // Rediriger vers la page de connexion ou la page d'accueil
      //this.router.navigate(['/login']);
    console.log('Logout successful!');
  }

}