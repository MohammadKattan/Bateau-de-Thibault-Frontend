import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { Product } from '../../Core/Models/product';
import { NgIf, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { catchError } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-details-produits',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'], // Correction ici
  standalone: true,
  imports: [
    MatTableModule,
    NgIf,
    NgFor,
    FormsModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: [DecimalPipe],
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  categories = [
    { id: 'all', name: 'All' },
    { id: 0, name: 'Poisson' },
    { id: 1, name: 'Fruits de Mer' },
    { id: 2, name: 'Crustacés' }
  ];

  productsList: Product[] = [];
  originalProductsList: Product[] = [];
  selectedProduct: Product | undefined;
  selectedCategory: number | string = 'all';
  quantityInStock!: number;
  product = { isEditing: false };

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    // Récupère les produits depuis le service
    this.productsService.getProductsFromJson().subscribe((data) => {
      this.productsList = data;
      this.originalProductsList = data; // Conserve la liste originale pour le filtrage
    });
  }

  ngOnChanges() {
    console.log('Composant mis à jour');
  }

  getProduit(id: number): Product | undefined {
    return this.productsList.find((product) => product.id === id);
  }

  toggleEditMode(product: Product) {
    product.isEditing = !product.isEditing;
    this.quantityInStock = product.quantityInStock;
  }

  saveProduct(product: Product) {
    this.productsService.updateProduct(product)
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la mise à jour du produit', error);
          throw error;
        })
      )
      .subscribe(
        (updatedProduct) => {
          console.log('Produit mis à jour avec succès', updatedProduct);
        }
      );

    if (this.quantityInStock !== product.quantityInStock) {
      const stockDifference = this.quantityInStock - product.quantityInStock;

      if (stockDifference > 0) {
        this.productsService.updateProductdecrementStockById(product, Math.abs(stockDifference))
          .pipe(
            catchError((error) => {
              console.error('Erreur lors de la diminution du stock', error);
              throw error;
            })
          )
          .subscribe(
            (updatedProduct) => {
              console.log('Stock décrémenté avec succès', updatedProduct);
            }
          );
      } else {
        this.productsService.updateProductincrementStockById(product, Math.abs(stockDifference))
          .pipe(
            catchError((error) => {
              console.error('Erreur lors de l\'incrémentation du stock', error);
              throw error;
            })
          )
          .subscribe(
            (updatedProduct) => {
              console.log('Stock incrémenté avec succès', updatedProduct);
            }
          );
      }
    }
  }

  enableEditModeForAll() {
    this.product.isEditing = true;
    this.productsList.forEach((product) => {
      product.isEditing = true;
    });
  }

  saveAllProducts() {
    this.productsList.forEach((product) => {
      if (product.isEditing) {
        this.saveProduct(product);
        this.toggleEditMode(product);
      }
    });
  }

  cancelAllEdits() {
    this.product.isEditing = false;
    this.productsList.forEach((product) => {
      if (product.isEditing) {
        this.toggleEditMode(product);
      }
    });
  }

  calculatePercentageDiscount(product: Product): number {
    const discountAmount = product.price - (product.price * (product.discount / 100));
    return parseFloat(discountAmount.toFixed(2)); // Retourne le montant après réduction
  }

  // Fonction de filtrage par catégorie
  filterByCategory(categoryId: string | number) {
    this.selectedCategory = categoryId;

    if (categoryId === 'all') {
      // Si 'all' est sélectionné, afficher tous les produits
      this.productsList = [...this.originalProductsList];
    } else {
      // Sinon, filtrer par catégorie
      this.productsList = this.originalProductsList.filter(
        (product) => product.category === categoryId
      );
    }
  }
}
