import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import NamedAPIResourceList from '../../../../shared/models/api/NamedAPIResourceList ';
import { PaginationService } from '../../../../core/services/pagination.service';

@Component({
  selector: 'app-pokemons-page',
  imports: [SearchBarComponent,PokemonListComponent],
  templateUrl: './pokemons-page.component.html',
})
export class PokemonsPageComponent implements OnInit{

  readonly DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0';

  paginationData: NamedAPIResourceList;
  constructor(public paginationService: PaginationService) { 
    this.paginationData = {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
  }

  ngOnInit(): void {
    this.getPaginationdData(this.DEFAULT_URL);
  }

  getPaginationdData(url: string) {
    this.paginationService.getPaginationData(url).subscribe({
      next: (data: NamedAPIResourceList) => {
        this.paginationData = data;
      },
      error: (error) => {
        console.error('Error fetching pagination data:', error);
      }
    });
  }

  makeSearch(query: string) {
    console.log('Search initiated with query:', query);
    if (query.trim() === '') {
      this.getPaginationdData(this.DEFAULT_URL);
      return;
    }
    console.log('Search query:', query);
    this.paginationData = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: query.toLowerCase(),
          url: `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
        }
      ]
    }
    
  }
}
