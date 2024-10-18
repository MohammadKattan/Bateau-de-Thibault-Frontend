import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { DataTableComponent } from '../tableau/tableau.component'
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CardComponent } from '../card/card.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,FooterComponent, DataTableComponent,SideNavComponent,CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
