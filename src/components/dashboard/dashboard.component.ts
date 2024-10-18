import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; 
import { Chart, registerables } from 'chart.js';
import { DataService } from '../../app/data.service';

Chart.register(...registerables);

interface SalesData {
  pid: number;
  category_name: string;
  price: number;
  quantity: number;
  date: string;
  type_promotion: string; // Ajouté pour le type de promotion
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  salesData: SalesData[] = [];
  filteredSalesData: SalesData[] = [];
  totalRevenue: number = 0;
  selectedCategory: string = 'all';
  selectedYear: string = 'all';
  selectedMonth: string = 'all'; // Propriété pour le mois
  selectedWeek: string = 'all'; // Propriété pour la semaine
  selectedPromotion: string = 'all'; // Propriété pour la promotion
  categories = ['Poisson', 'Crustacé', 'Coquillage'];
  years = Array.from({length: 10}, (_, i) => new Date().getFullYear() - i);
  months = Array.from({length: 12}, (_, i) => i); // 0 à 11 pour les mois
  monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  availableWeeks: number[] = []; // Pour stocker les semaines disponibles dans le mois
  promotions: string[] = []; // Liste des promotions

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getData().subscribe((data: SalesData[]) => {
      this.salesData = data;

      // Remplir la liste des promotions
      this.promotions = [...new Set(data.map(item => item.type_promotion))]; // Extraire les types de promotion uniques
      
      this.applyFilters(); // Appliquer les filtres après le chargement des données
    });
  }

  ngAfterViewInit(): void {
    this.createChart(); // Crée le graphique après le chargement des données
  }

  applyFilters() {
    this.filteredSalesData = this.salesData
      .filter(item => item.quantity > 0)
      .filter(item => this.selectedCategory === 'all' || item.category_name === this.selectedCategory)
      .filter(item => this.selectedYear === 'all' || new Date(item.date).getFullYear().toString() === this.selectedYear)
      .filter(item => this.selectedMonth === 'all' || new Date(item.date).getMonth() === +this.selectedMonth)
      .filter(item => this.selectedWeek === 'all' || this.getWeekNumber(new Date(item.date)) === +this.selectedWeek) // Filtre par semaine
      .filter(item => this.selectedPromotion === 'all' || item.type_promotion === this.selectedPromotion); // Filtre par promotion

    this.calculateRevenue(); // Calculer le chiffre d'affaires après filtrage
  }

  getWeekNumber(date: Date): number {
    const start = new Date(date.getFullYear(), date.getMonth(), 1); // Premier jour du mois
    const weekNumber = Math.floor((date.getDate() + start.getDay()) / 7) + 1; // Calcul du numéro de la semaine
    return weekNumber;
  }

  updateAvailableWeeks() {
    if (this.selectedYear !== 'all' && this.selectedMonth !== 'all') {
      const daysInMonth = new Date(+this.selectedYear, +this.selectedMonth + 1, 0).getDate();
      this.availableWeeks = Array.from({length: Math.ceil(daysInMonth / 7)}, (_, i) => i + 1);
    } else {
      this.availableWeeks = []; // Réinitialiser si l'année ou le mois est 'all'
    }
  }

  calculateRevenue() {
    this.totalRevenue = this.filteredSalesData
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  createChart() {
    if (typeof document !== 'undefined') {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  
      const labels = this.filteredSalesData.map(item => item.date);
      const revenues = this.filteredSalesData.map(item => item.price * item.quantity);
  
      if (ctx) {
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
          existingChart.destroy();
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
    this.applyFilters();
    this.createChart();
  }

  onYearChange(year: string) {
    this.selectedYear = year;
    this.selectedMonth = 'all'; // Réinitialiser le mois lors du changement d'année
    this.selectedWeek = 'all'; // Réinitialiser la semaine lors du changement d'année
    this.updateAvailableWeeks(); // Mettre à jour les semaines disponibles
    this.applyFilters();
    this.createChart();
  }

  onMonthChange(month: string) {
    this.selectedMonth = month;
    this.selectedWeek = 'all'; // Réinitialiser la semaine lors du changement de mois
    this.updateAvailableWeeks(); // Mettre à jour les semaines disponibles
    this.applyFilters();
    this.createChart();
  }

  onWeekChange(week: string) {
    this.selectedWeek = week;
    this.applyFilters();
    this.createChart();
  }

  onPromotionChange(promotion: string) {
    this.selectedPromotion = promotion;
    this.applyFilters();
    this.createChart();
  }
}
