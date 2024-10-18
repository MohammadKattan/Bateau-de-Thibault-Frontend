import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface pour typage des données de ventes
export interface SalesData {
  pid: number;
  category_name: string;
  price: number;
  quantity: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'assets/data_part2.json'; // Chemin vers votre fichier JSON

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les données de vente à partir du fichier JSON
  getData(): Observable<SalesData[]> {
    return this.http.get<SalesData[]>(this.apiUrl);
  }
}
