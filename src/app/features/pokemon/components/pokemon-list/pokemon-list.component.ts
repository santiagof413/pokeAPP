import { Component, effect, input, OnInit } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import NamedAPIResourceList from '../../../../shared/models/api/NamedAPIResourceList ';
import Pokemon from '../../../../shared/models/pokemon/Pokemon';
import { PokemonService } from '../../../../core/services/pokemon/pokemon.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import PaginationData from '../../../../shared/models/utils/PaginationData';
import { NamedAPIResource } from '../../../../shared/models/api/NamedAPIResource';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent, PaginationComponent, SearchBarComponent],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  paginationData: PaginationData; //Data for controlling pagination
  pokemonListResources: NamedAPIResource[]; //List of URLs where are all the infomation of the pokemon
  pokemonList: Pokemon[]; //List of pokemons with information (THIS IS THE ONE THAT IS SHOWN IN THE HTML)
  pokemonListCache: Pokemon[]; // Cache for pokemon data to avoid unnecessary API calls
  isLoading: boolean = true; // Flag to indicate if data is being loaded

  constructor(private pokemonService: PokemonService) {
    // Initialize pagination data
    this.paginationData = {
      count: 0, // Total number of items, starting at 0
      itemsbyPage: 21, // Number of items per page
      currentPage: 1, // Current page number, starting at 1
      totalPages: 1, // Total number of pages, starting at 1
    };
    // Initialize pokemon lists
    this.pokemonList = [];
    this.pokemonListResources = [];
    this.pokemonListCache = [];
  }
  ngOnInit(): void {
    this.isLoading = true; // Set loading flag to true
    this.pokemonService.fetchPokemonList().subscribe({
      next: (list) => {
        // Cache the list of Pokémon resources
        this.paginationData.count = list.count;
        this.paginationData.totalPages = Math.ceil(
          list.count / this.paginationData.itemsbyPage
        );
        this.loadPokemonsInHTML(); // Solo se llama si ya se tiene la data cargada
      },
      error: (err) => {
        console.error('Error fetching Pokemon list:', err);
        this.isLoading = false;
      },
    });
  }

  /**
   * Loads Pokémon data into the HTML view based on pagination settings.
   * If the cache is empty, it fetches data from the API.
   */
  loadPokemonsInHTML() {
    this.isLoading = true; // Set loading flag to true
    //If the cache is not empty, we can use it to show the pokemons
    if (
      this.pokemonListCache.length >
      this.paginationData.currentPage * this.paginationData.itemsbyPage
    ) {
      this.pokemonList = this.pokemonListCache.slice(
        (this.paginationData.currentPage - 1) * this.paginationData.itemsbyPage,
        this.paginationData.currentPage * this.paginationData.itemsbyPage
      );
      this.isLoading = false; // Set loading flag to false
      return;
    } else {
      this.loadInformationInCache();
    }
  }

  /**
   * Loads Pokémon data into the cache and updates the displayed list.
   * This method fetches Pokémon data based on the current pagination settings.
   * It uses forkJoin to make multiple API calls concurrently.
   * The results are then stored in the pokemonList and pokemonListCache arrays.
   */
  loadInformationInCache() {
    this.isLoading = true; // Set loading flag to true
    const start =
      (this.paginationData.currentPage - 1) * this.paginationData.itemsbyPage;
    const end =
      this.paginationData.currentPage * this.paginationData.itemsbyPage;

    const listResult = this.pokemonService.getPokemonList().results;

    this.pokemonListResources = listResult.slice(start, end);

    const requests = this.pokemonListResources.map((resource) =>
      this.pokemonService.getPokemon(resource.name)
    );

    forkJoin(requests).subscribe({
      next: (pokemons: Pokemon[]) => {
        this.pokemonList = pokemons;
        this.pokemonListCache.push(...pokemons); // Save in cache
        this.isLoading = false; // Set loading flag to false
      },
      error: (err) => {
        console.error('Error fetching pokemons:', err);
        this.isLoading = false; // Set loading flag to false even on error
      },
    });
  }

  /**
   * Searches for Pokémon based on the provided query.
   * If the query is empty, it reloads the full list of Pokémon.
   * Otherwise, it filters the cached Pokémon list based on the query.
   * @param query - The search term to filter Pokémon by name.
   */
  makeSearch(query: string) {
    if (query.trim() === '') {
      this.loadPokemonsInHTML();
      return;
    }
    this.isLoading = true; // Set loading flag to true

    this.pokemonListResources = this.pokemonService
      .getPokemonList()
      .results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
    this.pokemonList = [];

    const requests = this.pokemonListResources.map((resource) =>
      this.pokemonService.getPokemon(resource.name)
    );
    forkJoin(requests).subscribe({
      next: (pokemons: Pokemon[]) => {
        this.pokemonList = pokemons;
        this.isLoading = false; // Set loading flag to false
      },
      error: (err) => {
        console.error('Error fetching pokemons:', err);
        this.isLoading = false; // Set loading flag to false even on error
      },
    });
  }

  /**
   * Changes the current page based on the action ('next' or 'previous').
   * It updates the pagination data and reloads the Pokémon list accordingly.
   * @param action - The action to perform ('next' or 'previous').
   */
  changePage(action: string) {
    if (
      action == 'next' &&
      this.paginationData.currentPage < this.paginationData.totalPages
    ) {
      this.paginationData.currentPage++;
      this.loadPokemonsInHTML();
    } else if (action == 'previous' && this.paginationData.currentPage > 1) {
      this.paginationData.currentPage--;
      this.loadPokemonsInHTML();
    }
  }
}
