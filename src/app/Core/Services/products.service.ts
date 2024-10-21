import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Models/product';
import { Observable } from 'rxjs';

    @Injectable({
        providedIn: 'root'
    })
    export class ProductsService {

    private apiUrl = 'http://localhost:8000'; 

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('access_token'); 
            return new HttpHeaders({
            'Authorization': `Bearer ${token}` 
        });
    }
        
    login(username: string, password: string): Observable<any> {
        return this.http.post(this.apiUrl, { username, password });
    }

    refreshToken(refreshToken: string): Observable<any> {
        return this.http.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
    }

    public getProductsFromJson(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/infoproducts/`, { headers: this.getAuthHeaders() });
    }

    public getProductsPoissons(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/poissons/`, { headers: this.getAuthHeaders() });
    }

    updateProductPutOnSale(product: Product): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/putonsale/${product.tig_id}/${product.discount}`, { headers: this.getAuthHeaders() });
    }

    updateProductDecrementStockById(product: Product, quantity: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/decrementStock/${product.tig_id}/${quantity}`, { headers: this.getAuthHeaders() });
    }

    updateProductIncrementStockById(product: Product, quantity: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/incrementStock/${product.tig_id}/${quantity}`, { headers: this.getAuthHeaders() });
    }

    getProductImageById(product: Product, quantity: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/myImage/${product.tig_id}/${quantity}`, { headers: this.getAuthHeaders() });
    }

    updateProductPriceById(product: Product): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/updatePrice/${product.tig_id}/${product.price}`, { headers: this.getAuthHeaders() });
    }
}