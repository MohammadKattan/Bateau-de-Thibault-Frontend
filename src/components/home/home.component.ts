import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { DataTableComponent } from '../tableau/tableau.component'
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CardComponent } from '../card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,FooterComponent, DataTableComponent,SideNavComponent,CardComponent,HttpClientModule,DashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
