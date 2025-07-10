import { Component, input } from '@angular/core';
import Pokemon from '../../../../shared/models/pokemon/Pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../../../../core/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  pokemon = input<Pokemon>();

  constructor(private pokemonService: PokemonService, private router: Router) {}

  goToDetails() {
    const selected = this.pokemon();
    if (selected) {
      this.pokemonService.setPokemonSelected(selected);
      this.router.navigate(['/pokemons', selected.id]);
    }
  }
}
