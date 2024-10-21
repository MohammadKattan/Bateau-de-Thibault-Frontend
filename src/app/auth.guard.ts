import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../app/Core/Services/login.service';  // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;  // Si l'utilisateur est connecté, accès autorisé
    } else {
      this.router.navigate(['/login']);  // Rediriger vers la page de connexion si non connecté
      return false;  // Accès refusé
    }
  }
}
