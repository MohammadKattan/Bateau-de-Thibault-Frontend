import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import data from '../assets/data.json';


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
}

@Injectable({
  providedIn: 'root' // Déclare que ce service est disponible au niveau de l'application
})
export class DataService {
  private jsonUrl = 'assets/data.json'; // Chemin vers le fichier JSON

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les données
  getData() {
    return data;
    return this.http.get<DataElement[]>(this.jsonUrl);
  }
}
