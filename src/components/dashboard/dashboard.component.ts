import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; 
import { Chart, registerables } from 'chart.js';
import { DataService } from '../../app/data.service';
import { StatsService } from '../../app/Core/Services/stats.service';
import { Stats } from '../../app/Core/Models/stats'

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  salesData: Stats[] = [];
  filteredSalesData: Stats[] = [];
  totalRevenue: number = 0;
  totalInvoices: number = 0; // Total des factures à payer
  margin: number = 0; // Marge calculée
  accountingResult: number = 0; // Résultat comptable
  corporateTax: number = 0; // Impôt sur les sociétés

  selectedCategory: string = 'all';
  selectedYear: string = 'all';
  selectedMonth: string = 'all';
  selectedWeek: string = 'all';
  selectedQuarter: string = 'all'; // Nouveau champ pour le trimestre
  selectedPromotion: string = 'all';
  
  categories = ['Poisson', 'Crustacé', 'Coquillage'];
  years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  months = Array.from({ length: 12 }, (_, i) => i);
  monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  availableWeeks: number[] = [];
  quarters = ['1er trimestre', '2ème trimestre', '3ème trimestre', '4ème trimestre'];

  promotions: string[] = [];

  constructor(private dataService: DataService,private StatsService: StatsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.StatsService.getStatsFromJson().subscribe((data) => {
      this.salesData = data;
      this.promotions = [...new Set(data.map(item => item.type_promotion))];
      this.applyFilters();
      this.createChart();
    });
  }
  ngAfterViewInit(): void {
    this.createChart();
  }

  applyFilters() {
    this.filteredSalesData = this.salesData
      .filter(item => item.quantity > 0)
      .filter(item => this.selectedCategory === 'all' || item.category_name === this.selectedCategory)
      .filter(item => this.selectedYear === 'all' || new Date(item.date).getFullYear().toString() === this.selectedYear)
      .filter(item => this.selectedMonth === 'all' || new Date(item.date).getMonth() === +this.selectedMonth)
      .filter(item => this.selectedWeek === 'all' || this.getWeekNumber(new Date(item.date)) === +this.selectedWeek)
      .filter(item => this.selectedQuarter === 'all' || this.getQuarter(new Date(item.date)) === this.selectedQuarter)
      .filter(item => this.selectedPromotion === 'all' || item.type_promotion === this.selectedPromotion)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    this.calculateRevenue();
    this.calculateMarginAndTaxes();
  }

  getQuarter(date: Date): string {
    const month = date.getMonth();
    if (month < 3) return '1er trimestre';
    if (month < 6) return '2ème trimestre';
    if (month < 9) return '3ème trimestre';
    return '4ème trimestre';
  }

  getWeekNumber(date: Date): number {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const weekNumber = Math.floor((date.getDate() + start.getDay()) / 7) + 1;
    return weekNumber;
  }

  updateAvailableWeeks() {
    if (this.selectedYear !== 'all' && this.selectedMonth !== 'all') {
      const daysInMonth = new Date(+this.selectedYear, +this.selectedMonth + 1, 0).getDate();
      this.availableWeeks = Array.from({length: Math.ceil(daysInMonth / 7)}, (_, i) => i + 1);
    } else {
      this.availableWeeks = [];
    }
  }

  calculateRevenue() {
    this.totalRevenue = this.filteredSalesData
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    this.totalInvoices = this.filteredSalesData
      .reduce((sum, item) => sum + item.total_invoice, 0);
  }

  calculateMarginAndTaxes() {
    this.margin = this.totalRevenue - this.totalInvoices;
    this.accountingResult = this.margin; // Résultat comptable est égal à la marge pour l'année
    this.corporateTax = this.accountingResult > 0 ? this.accountingResult * 0.30 : 0;
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
    this.selectedMonth = 'all';
    this.selectedWeek = 'all';
    this.selectedQuarter = 'all'; // Reset quarter when year changes
    this.updateAvailableWeeks();
    this.applyFilters();
    this.createChart();
  }

  onMonthChange(month: string) {
    this.selectedMonth = month;
    this.selectedWeek = 'all';
    this.selectedQuarter = 'all'; // Reset quarter when month changes
    this.updateAvailableWeeks();
    this.applyFilters();
    this.createChart();
  }

  onWeekChange(week: string) {
    this.selectedWeek = week;
    this.applyFilters();
    this.createChart();
  }

  onQuarterChange(quarter: string) {
    this.selectedQuarter = quarter;
    this.applyFilters();
    this.createChart();
  }

  onPromotionChange(promotion: string) {
    this.selectedPromotion = promotion;
    this.applyFilters();
    this.createChart();
  }
}
