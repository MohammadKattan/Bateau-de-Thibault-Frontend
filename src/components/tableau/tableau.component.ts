import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table'; 
import { DataService } from '../../app/data.service';

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

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [MatTableModule], // Assurez-vous d'importer MatTableModule ici
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss'] // Remplacez styleUrl par styleUrls
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'availability', 'sale', 'discount', 'comments', 'owner'];
  dataSource: DataElement[] | any = []; // Source de données

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    console.log("this is from tableau")
    this.dataSource = this.dataService.getData()
    // console.log(this.dataSource)
      //.subscribe(response => {
     // this.dataSource = response; 
    //});
  }
}
