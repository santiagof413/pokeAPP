import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Ability from '../../../shared/models/pokemon/Ability';
import { EnumLanguajes } from '../../../shared/models/api/EnumLanguajes';
import NamedAPIResourceList from '../../../shared/models/api/NamedAPIResourceList ';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbilityService {
  // Base URL for the PokeAPI to fetch Pokémon data
  private readonly BASEURL = 'https://pokeapi.co/api/v2/ability/';
  private readonly GETALLAPIRESOURCES =
    'https://pokeapi.co/api/v2/ability/?limit=367&offset=0';

  private abilityListCache: NamedAPIResourceList | null;
  private abilitySelected: Ability | null;

  constructor(private http: HttpClient) {
    this.abilityListCache = null;
    this.abilitySelected = null;
  }

  /**
   * Sets the currently selected ability. Used to the shared state across components.
   * For example, move details or other components that need to know which ability is selected.
   * @param ability - The ability to set as selected.
   */
  setPokemonSelected(ability: Ability) {
    this.abilitySelected = ability;
  }
  /**
   * Retrieves the currently selected ability.Used to get the selected ability
   * for displaying details or other information in the UI.
   * @returns The selected ability or null if none is selected.
   */
  getPokemonSelected(): Ability | null {
    return this.abilitySelected;
  }

  getAbilityList(): NamedAPIResourceList {
    if (!this.abilityListCache) {
      throw new Error('Ability list has not been loaded yet.');
    }
    return this.abilityListCache;
  }

  /**
   * Fetches the list of abilities from the PokeAPI.
   * This method caches the result to avoid unnecessary API calls.
   * @returns The NamedAPIResourceList containing all abilities.
   */
  fetchAbililyList(): Observable<NamedAPIResourceList> {
    if (this.abilityListCache) {
      return of(this.abilityListCache); // cache
    }

    return this.http.get<NamedAPIResourceList>(this.GETALLAPIRESOURCES).pipe(
      tap((data) => {
        this.abilityListCache = data;
      })
    );
  }

  /**
   * Fetches the details of a specific ability by its ID or name.
   * @param id - The ID or name of the ability to fetch.
   * @returns An observable containing the Ability details.
   */
  getAbility(id: number | string) {
    const url = `${this.BASEURL}${id}`;
    return this.http.get<Ability>(url);
  }

  /**
   * Get the name of the ability in the specified language.
   * @param name - The name of the ability to fetch.
   * @returns Name of the ability in the specified language.
   * */
  getAbilityName(ability: Ability, lang: EnumLanguajes): string {
    return (
      ability.names.find((n) => n.language.name == lang)?.name ??
      'Name not available'
    );
  }

  /**
   * Gets the effect of the ability in the specified language.
   * @param ability
   * @returns the effect of the ability in the specified language.
   */
  getAbilityEffect(ability: Ability, lang: EnumLanguajes): string {
    return (
      ability.effect_entries.find((e) => e.language.name == lang)?.effect ??
      'Efect not available'
    );
  }

  /**
   * Gets the short effect of the ability in the specified language.
   * @param ability
   * @param lang
   * @returns the short effect of the ability in the specified language.
   */
  getAbilityShortEffect(ability: Ability, lang: EnumLanguajes): string {
    return (
      ability.effect_entries.find((e) => e.language.name == lang)
        ?.short_effect ?? 'Short effect not available'
    );
  }
}
