import { Component,effect,input, OnInit } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import NamedAPIResourceList from '../../../../shared/models/api/NamedAPIResourceList ';
import Pokemon from '../../../../shared/models/pokemon/Pokemon';
import { PokemonService } from '../../../../core/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  paginationData= input<NamedAPIResourceList>({
    count: 0,
    next: null,
    previous: null,
    results: []
  })
  pokemonList:Pokemon[];

  constructor(private pokemonService: PokemonService) {
    this.pokemonList = [];
    effect(() => {
      this.loadPagination();
    });

    
  }
  ngOnInit(): void {
  }

  loadPagination(){
    this.pokemonList = [];
    if(this.paginationData()?.count==0) {
      return;
    }
    const countPokemons:number=this.paginationData().results.length;
    
    for (let i = 0; i < countPokemons; i++) {
      this.pokemonService.getPokemon(this.paginationData().results[i].name).subscribe({
        next: (pokemon: Pokemon) => {
          this.pokemonList.push(pokemon);
        },
        error: (error) => {
          console.error('Error fetching pokemon:', error);
        }
      });

    }


  }




}
