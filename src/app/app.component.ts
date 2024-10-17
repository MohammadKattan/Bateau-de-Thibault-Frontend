import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../components/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavComponent],
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,FooterComponent  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bateau-frontend';
}
