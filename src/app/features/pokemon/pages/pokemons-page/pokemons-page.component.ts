import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-pokemons-page',
  imports: [SearchBarComponent,PokemonListComponent],
  templateUrl: './pokemons-page.component.html',
})
export class PokemonsPageComponent {

}
