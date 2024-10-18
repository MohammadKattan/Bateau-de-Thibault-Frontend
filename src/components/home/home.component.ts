import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CardComponent } from '../card/card.component';
import { ProductDetailsComponent} from '../../app/Pages/product-details/product-details.component'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,SideNavComponent,CardComponent, ProductDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
