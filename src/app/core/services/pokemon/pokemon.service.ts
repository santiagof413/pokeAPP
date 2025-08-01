import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pokemon from '../../../shared/models/pokemon/pokemon/Pokemon';
import NamedAPIResourceList from '../../../shared/models/api/NamedAPIResourceList ';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  // Base URL for the PokeAPI to fetch Pokémon data
  private readonly BASEURL = 'https://pokeapi.co/api/v2/pokemon/';
  // Endpoint to fetch all Pokémon resources with a limit and offset
  private readonly GETALLAPIRESOURCES = 'https://pokeapi.co/api/v2/pokemon/?limit=1302&offset=0';

  private pokemonListCache: NamedAPIResourceList | null;
  private pokemonSelected: Pokemon | null;

  constructor(private http: HttpClient) {
    this.pokemonListCache = null;
    this.pokemonSelected = null;
  }

  /**
   * Sets the currently selected Pokémon. Used to the shared state across components.
   * For example, move details or other components that need to know which Pokémon is selected.
   * @param pokemon - The Pokémon to set as selected.
   */
  setPokemonSelected(pokemon: Pokemon | null) {
    this.pokemonSelected = pokemon;
  }
  /**
   * Retrieves the currently selected Pokémon.Used to get the selected Pokémon
   * for displaying details or other information in the UI.
   * @returns The selected Pokémon or null if none is selected.
   */
  getPokemonSelected(): Pokemon | null {
    return this.pokemonSelected;
  }
  /**
   * Retrieves the NamedAPIResourceList containing all Pokémon.
   * This method caches the result to avoid unnecessary API calls.
   * If the cache is empty, it fetches the data from the API.
   * @returns
   */
  getPokemonList(): NamedAPIResourceList {
    if (!this.pokemonListCache) {
      throw new Error('Pokemon list has not been loaded yet.');
    }
    return this.pokemonListCache;
  }
  

  /**
   * Fetches the list of Pokémon from the PokeAPI.
   * This method caches the result to avoid unnecessary API calls.
   * @returns An observable containing the NamedAPIResourceList of Pokémon.
   */
  fetchPokemonList(): Observable<NamedAPIResourceList> {
    if (this.pokemonListCache) {
      return of(this.pokemonListCache); // cache
    }

    return this.http
      .get<NamedAPIResourceList>(this.GETALLAPIRESOURCES)
      .pipe(
        tap((data) => {
          this.pokemonListCache = data;
        })
      );
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
