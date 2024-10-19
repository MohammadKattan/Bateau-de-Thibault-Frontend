import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { Product } from '../../Core/Models/product';
import {NgIf, NgFor} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-details-produits',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  standalone: true,
  imports: [MatTableModule, NgIf, NgFor,FormsModule, MatIconModule],
  providers: [DecimalPipe],
})
export class ProductDetailsComponent implements OnInit, OnChanges{
  quantityChange: number = 0;

  // Variables pour savoir quelle checkbox est sélectionnée
  isIncrementing: boolean = false;
  isDecrementing: boolean = false;
  productsList: Product[] = [];
  productsCrustacesList: Product[] = [];
  selectedProduct: Product | undefined;
  selectedCategory: number | string = 'all';
  quantityInStock!: number ;
  originalProductsList: Product[] = [];
  product = { isEditing: false };
  constructor(private productsService: ProductsService,private productService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProductsFromJson().subscribe((data) => {
      this.productsList = data;
      this.originalProductsList = data;
    });
  }

    
  ngOnChanges() {
    console.log('helloooo ');
  }
  onCheckboxChange(action: 'increment' | 'decrement') {
    if (action === 'increment') {
      this.isDecrementing = false; // Désactiver la décrémentation
    } else if (action === 'decrement') {
      this.isIncrementing = false; // Désactiver l'incrémentation
    }
  }

  getProduit(id: number): Product | undefined {
    return this.productsList.find(product => product.id === id);
  }
  getProductCrustacesList(id: number): Product | undefined {
    return this.productsCrustacesList.find(product => product.id === id);
  }
  
  toggleEditMode(product: any) {
    product.isEditing = !product.isEditing;
    this.quantityInStock =  product.quantityInStock;
  }

  saveProduct(product: Product) {
    if (this.isIncrementing) {
      this.incrementStock(product, this.quantityChange);
    } else if (this.isDecrementing) {
      this.decrementStock(product, this.quantityChange);
    } else {
      console.error("Aucune action sélectionnée (ni incrémenter ni décrémenter).");
    }

    this.updateProductIfNeeded(product); // Mise à jour du produit si nécessaire
  }

  updateProductIfNeeded(product: Product) {
    this.productService.updateProductputonsale(product)
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
  }

  incrementStock(product: Product, value: number) {
    this.productService.updateProductincrementStockById(product, value)
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la mise à jour du produit', error);
          throw error;
        })
      )
      .subscribe(
        (updatedProduct) => {
          console.log('Stock incrémenté avec succès', updatedProduct);
          product.quantityInStock += value;
        }
      );
}

decrementStock(product: Product, value: number) {
    this.productService.updateProductdecrementStockById(product, value)
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la mise à jour du produit', error);
          throw error;
        })
      )
      .subscribe(
        (updatedProduct) => {
          console.log('Stock décrémenté avec succès', updatedProduct);
        }
      );
}

  enableEditModeForAll() {
    this.product.isEditing = true;
    for (const product of this.productsList) {
      product.isEditing = true;
    }
    for (const product of this.productsCrustacesList) {
      product.isEditing = true;
    }
  }

  saveAllProducts() {
    for (const product of this.productsList) {
      if (product.isEditing) {
        this.saveProduct(product);
        this.toggleEditMode(product);
      }
    }
  }

  cancelAllEdits() {
    this.product.isEditing = false;
    for (const product of this.productsList) {
      if (product.isEditing) {
        this.toggleEditMode(product);
      }
    }
    for (const product of this.productsCrustacesList) {
      if (product.isEditing) {
        this.toggleEditMode(product);
      }
    }
}

calculatePercentageDiscount(product: Product): number {

  const discountAmount = (product.price -(product.price * (product.discount / 100)) );

  const roundedDiscountAmount = discountAmount.toFixed(2);

  return parseFloat(roundedDiscountAmount);
}



filterProducts(): void {
  if (this.selectedCategory === 'all') {
    // Si 'all' est sélectionné, affichez la liste complète
    this.productsList = this.originalProductsList;
  } else {
    // Sinon, filtrez les produits en fonction de la catégorie
    this.productsList = this.originalProductsList.filter(product => product.category === this.selectedCategory);
  }
}
filterByCategory(category: number | string): void {
  this.selectedCategory = category;
  this.filterProducts();
}

}

