import { Component, input } from '@angular/core';
import Pokemon from '../../../../shared/models/pokemon/Pokemon';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  pokemon = input<Pokemon>();
}
