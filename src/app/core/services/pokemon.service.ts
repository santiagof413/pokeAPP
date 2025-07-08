import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pokemon from '../../shared/models/pokemon/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // Base URL for the PokeAPI to fetch Pokémon data
  readonly BASEURL = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http:HttpClient) { }

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
