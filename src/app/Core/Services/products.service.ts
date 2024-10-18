import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/product';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
    })
    export class ProductsService {

    private apiUrl = 'http://localhost:8000'; 

    constructor(private http: HttpClient) { }

    
    public getProductsFromJson(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl + '/infoproducts/');
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + "/putonsale/" + product.tig_id + "/" + product.discount);
    }
    updateProductdecrementStockById(product: Product, quantity: number): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + "/decrementStock/" + product.tig_id + "/" + quantity);
    }

    updateProductincrementStockById(product: Product, quantity: number): Observable<Product> {
        // const setHeaders= {
        //         'Content-type' : 'application/json',
        //             'Access-Control-Allow-Origin'  :'*',
        // }
        return this.http.get<Product>(this.apiUrl + "/incrementStock/" + product.tig_id + "/" + quantity);
    }
    getProductImageById(product: Product, quantity: number): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + "/myImage/" + product.tig_id + "/" + quantity);
    }

}