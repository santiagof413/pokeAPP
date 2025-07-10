import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pokemon from '../../../shared/models/pokemon/Pokemon';
import NamedAPIResourceList from '../../../shared/models/api/NamedAPIResourceList ';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // Base URL for the PokeAPI to fetch Pokémon data
  private readonly BASEURL = 'https://pokeapi.co/api/v2/pokemon/';
  // Endpoint to fetch all Pokémon resources with a limit and offset
  private readonly GETALLAPIRESOURCES = '?limit=1302&offset=0';

  private pokemonListCache : NamedAPIResourceList;
  private pokemonSelected: Pokemon | null;

  constructor(private http:HttpClient) { 
    this.pokemonListCache={
      count: 0,
      next: null,
      previous: null,
      results: []
    }
    this.pokemonSelected=null;
  }


  setPokemonSelected(pokemon: Pokemon) {
    this.pokemonSelected = pokemon;
  }
  getPokemonSelected(): Pokemon | null {
    return this.pokemonSelected;
  }
  /**
   * Retrieves the NamedAPIResourceList containing all Pokémon.
   * This method caches the result to avoid unnecessary API calls.
   * If the cache is empty, it fetches the data from the API.
   * @returns 
   */
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
