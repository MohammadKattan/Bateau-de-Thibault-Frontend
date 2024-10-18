import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/product';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
    })
    export class ProductsService {

    private apiUrl = 'http://127.0.0.1:8000'; 

    constructor(private http: HttpClient) { }

    
    public getProductsFromJson(): Observable<Product[]> {
        console.log('coucou ', this.http.get<Product[]>(this.apiUrl + '/infoproducts/'));
        return this.http.get<Product[]>(this.apiUrl + '/infoproducts/');
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + "/putonsale/" + product.tig_id + "/" + product.discount);
    }
    updateProductdecrementStockById(product: Product, quantity: number): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + "/decrementstock/" + product.tig_id + "/" + quantity);
    }

    updateProductincrementStockById(product: Product, quantity: number): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + "/incrementstock/" + product.tig_id + "/" + quantity);
    }
    getProductImageById(product: Product, quantity: number): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + "/myImage/" + product.tig_id + "/" + quantity);
    }

}