import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définition de l'interface pour les éléments de données
interface DataElement {
  id: number;
  name: string;
  category: number;
  price: number;
  unit: string;
  availability: boolean;
  sale: boolean;
  discount: number;
  comments: string;
  owner: string;
  quantityInStock: number;
}

@Injectable({
  providedIn: 'root' 
})
export class DataService {
  private jsonUrl = 'http://localhost:8000/poissons/';
  private dataUrl = 'assets/data_part2.json'; // chemin vers votre fichier JSON

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les données depuis l'URL
  getData(): Observable<DataElement[]> {
    return this.http.get<any[]>(this.dataUrl);
  }
}