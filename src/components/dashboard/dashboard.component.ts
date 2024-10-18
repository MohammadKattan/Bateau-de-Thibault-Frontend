import { Component } from '@angular/core';
import { DataService } from '../../app/data.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; 
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatTableModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  salesData: any[] = [];
  totalRevenue: number = 0;
  selectedCategory: string = 'all';
  categories = ['Poisson', 'Crustacé', 'Coquillage'];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getData().subscribe(data => {
      this.salesData = data;
      this.calculateRevenue(); // Calcul initial du CA
    });
  }

  ngAfterViewInit(): void {
    this.createChart(); // Crée le graphique après le chargement des données
  }

  calculateRevenue() {
    this.totalRevenue = this.salesData
      .filter(item => item.achat) // Filtrer uniquement les ventes
      .filter(item => this.selectedCategory === 'all' || item.category_name === this.selectedCategory) // Filtrer par catégorie
      .reduce((sum, item) => sum + (item.price * item.quantity), 0); // Calcul sans réduction
  }

  createChart() {
    // Vérifiez si le document est défini pour éviter l'erreur SSR
    if (typeof document !== 'undefined') {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;

      const labels = this.salesData.map(item => item.date); // Les dates comme étiquettes
      const revenues = this.salesData.map(item => item.price * item.quantity); // Calcul des revenus

      // Vérifiez si le graphique existe déjà, sinon, créez-en un nouveau
      if (ctx) {
        const existingChart = Chart.getChart(ctx); // Vérifie si le graphique existe déjà
        if (existingChart) {
          existingChart.destroy(); // Détruit l'ancien graphique pour éviter les doublons
        }

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Chiffre d\'affaires (EUR)',
              data: revenues,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Montant en EUR'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Dates'
                }
              }
            }
          }
        });
      }
    }
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.calculateRevenue();
    this.createChart(); // Met à jour le graphique lors du changement de catégorie
  }
}