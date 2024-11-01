import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8000/api/token/'; 

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout/`, {});
  }
  
  onLogout() {
    // Supprimer les tokens du localStorage ou sessionStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
      
    // Rediriger vers la page de connexion ou la page d'accueil
    // this.router.navigate(['/login']);
    console.log('Logout successful!');
  }
  
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
  }

  authenticate(credentials: any): void {
    this.login(credentials).subscribe(response => {
      if (response && response.access_token) {
        localStorage.setItem('access_token', JSON.stringify(response.access_token));
      }
    });
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('access_token'); // Assurez-vous d'utiliser 'access_token' ici
    }
    return false; // ou gérer en conséquence pour le SSR
  }
}
