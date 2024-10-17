import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DataTableComponent} from '../components/tableau/tableau.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DataTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bateau-frontend';
}
