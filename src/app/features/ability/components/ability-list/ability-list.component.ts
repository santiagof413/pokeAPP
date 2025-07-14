import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { AbilityService } from '../../../../core/services/pokemon/abilitie.service';
import PaginationData from '../../../../shared/models/utils/PaginationData';
import { NamedAPIResource } from '../../../../shared/models/api/NamedAPIResource';
import { forkJoin } from 'rxjs';
import { AbilityCardComponent } from '../ability-card/ability-card.component';
import Ability from '../../../../shared/models/pokemon/ability/Ability';

@Component({
  selector: 'app-ability-list',
  imports: [SearchBarComponent, PaginationComponent,AbilityCardComponent],
  templateUrl: './ability-list.component.html',
})
export class AbilityListComponent {
  paginationData: PaginationData; //Data for controlling pagination
  abilityListResources: NamedAPIResource[]; //List of URLs where are all the infomation of the abilities
  abilityList: Ability[]; //List of abilities with information (THIS IS THE ONE THAT IS SHOWN IN THE HTML)
  abilityListCache: Ability[]; // Cache for ability data to avoid unnecessary API calls
  isLoading: boolean = true; // Flag to indicate if data is being loaded

  constructor(private abilityService: AbilityService) {
    // Initialize pagination data
    this.paginationData = {
      count: 0, // Total number of items, starting at 0
      itemsbyPage: 30, // Number of items per page
      currentPage: 1, // Current page number, starting at 1
      totalPages: 1, // Total number of pages, starting at 1
    };
    // Initialize pokemon lists
    this.abilityList = [];
    this.abilityListResources = [];
    this.abilityListCache = [];
  }
  ngOnInit(): void {
    this.isLoading = true; // Set loading flag to true
    this.abilityService.fetchAbililyList().subscribe({
      next: (list) => {
        // Cache the list of Pokémon resources
        this.paginationData.count = list.count;
        this.paginationData.totalPages = Math.ceil(
          list.count / this.paginationData.itemsbyPage
        );
        this.loadAbilitiesInHTML(); // Solo se llama si ya se tiene la data cargada
      },
      error: (err) => {
        console.error('Error fetching Pokemon list:', err);
        this.isLoading = false;
      },
    });
  }

  /**
   * Loads abilities data into the HTML view based on pagination settings.
   * If the cache is empty, it fetches data from the API.
   */
  loadAbilitiesInHTML() {
    this.isLoading = true; // Set loading flag to true
    //If the cache is not empty, we can use it to show the abilities
    if (
      this.abilityListCache.length >
      this.paginationData.currentPage * this.paginationData.itemsbyPage
    ) {
      this.abilityList = this.abilityListCache.slice(
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
   * Loads ability data into the cache and updates the displayed list.
   * This method fetches ability data based on the current pagination settings.
   * It uses forkJoin to make multiple API calls concurrently.
   * The results are then stored in the abilityList and abilityListCache arrays.
   */
  loadInformationInCache() {
    this.isLoading = true; // Set loading flag to true
    const start =
      (this.paginationData.currentPage - 1) * this.paginationData.itemsbyPage;
    const end =
      this.paginationData.currentPage * this.paginationData.itemsbyPage;

    const listResult = this.abilityService.getAbilityList().results;

    this.abilityListResources = listResult.slice(start, end);

    const requests = this.abilityListResources.map((resource) =>
      this.abilityService.getAbility(resource.name)
    );

    forkJoin(requests).subscribe({
      next: (abilities: Ability[]) => {
        this.abilityList = abilities;
        this.abilityListCache.push(...abilities); // Save in cache
        this.isLoading = false; // Set loading flag to false
      },
      error: (err) => {
        console.error('Error fetching pokemons:', err);
        this.isLoading = false; // Set loading flag to false even on error
      },
    });
  }

  /**
   * Searches for ability based on the provided query.
   * If the query is empty, it reloads the full list of abilities.
   * Otherwise, it filters the cached ability list based on the query.
   * @param query - The search term to filter Pokémon by name.
   */
  makeSearch(query: string) {
    if (query.trim() === '') {
      this.loadAbilitiesInHTML();
      return;
    }
    this.isLoading = true; // Set loading flag to true

    this.abilityListResources = this.abilityService
      .getAbilityList()
      .results.filter((ability) =>
        ability.name.toLowerCase().includes(query.toLowerCase())
      );
    this.abilityList = [];

    const requests = this.abilityListResources.map((resource) =>
      this.abilityService.getAbility(resource.name)
    );
    if (requests.length === 0) {
      this.isLoading = false; // Set loading flag to false if no requests
      return;
    }
    forkJoin(requests).subscribe({
      next: (abilities: Ability[]) => {
        this.abilityList = abilities;
        this.isLoading = false; // Set loading flag to false
      },
      error: (err) => {
        console.error('Error fetching abilities:', err);
        this.isLoading = false; // Set loading flag to false even on error
      },
    });
  }

  /**
   * Changes the current page based on the action ('next' or 'previous').
   * It updates the pagination data and reloads the abilities list accordingly.
   * @param action - The action to perform ('next' or 'previous').
   */
  changePage(action: string) {
    if (
      action == 'next' &&
      this.paginationData.currentPage < this.paginationData.totalPages
    ) {
      this.paginationData.currentPage++;
      this.loadAbilitiesInHTML();
    } else if (action == 'previous' && this.paginationData.currentPage > 1) {
      this.paginationData.currentPage--;
      this.loadAbilitiesInHTML();
    }
  }
}
