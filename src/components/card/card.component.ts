import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() name: string = 'Nom du produit';
  @Input() category: string = 'Poisson'; // Valeurs possibles : Poisson, Crustacé, Coquillage
}
