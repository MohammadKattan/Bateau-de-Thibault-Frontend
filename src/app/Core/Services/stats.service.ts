import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stats } from '../Models/stats';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
    })
    export class StatsService {

    private apiUrl = 'http://localhost:8000'; 

    constructor(private http: HttpClient) { }

    
    public getStatsFromJson(): Observable<Stats[]> {
        return this.http.get<Stats[]>(this.apiUrl + '/stats/');
    }

}