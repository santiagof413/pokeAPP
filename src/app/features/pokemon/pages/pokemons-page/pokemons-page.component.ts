import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import PaginationData from '../../../../shared/models/utils/PaginationData';
import { PokemonService } from '../../../../core/services/pokemon/pokemon.service';
import { NamedAPIResource } from '../../../../shared/models/api/NamedAPIResource';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent],
  templateUrl: './pokemons-page.component.html',
})
export class PokemonsPageComponent{

}
