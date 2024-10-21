import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8000/api/token/'; 

  constructor(private http: HttpClient) { }

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
      //this.router.navigate(['/login']);
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
    return !!localStorage.getItem('access_token');  // Vérifie si le token est présent
  }
}
