import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pokemon from '../../shared/models/pokemon/Pokemon';
import NamedAPIResourceList from '../../shared/models/api/NamedAPIResourceList ';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // Base URL for the PokeAPI to fetch Pokémon data
  private readonly BASEURL = 'https://pokeapi.co/api/v2/pokemon/';
  private readonly GETALLAPIRESOURCES = '?limit=1302&offset=0';

  private pokemonListCache : NamedAPIResourceList;

  constructor(private http:HttpClient) { 
    this.pokemonListCache={
      count: 0,
      next: null,
      previous: null,
      results: []
    }
  }

  getPokemonList():NamedAPIResourceList{
    if (this.pokemonListCache.count > 0) {
      return this.pokemonListCache;
    }

    const url = `${this.BASEURL}${this.GETALLAPIRESOURCES}`;
    this.http.get<NamedAPIResourceList>(url).subscribe({
      next: (data: NamedAPIResourceList) => {
        this.pokemonListCache = data;
      },
      error: (error) => {
        console.error('Error fetching Pokémon list:', error);
      }
    });
    return this.pokemonListCache;
  }

  /**
   * Fetches Pokémon data by ID.
   * @param id - The unique identifier for the Pokémon.
   * @returns An observable containing the Pokémon data.
   */
  getPokemon(id: number | string) {
    const url = `${this.BASEURL}${id}`;
    return this.http.get<Pokemon>(url);
  }
}
