import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Ability from '../../../shared/models/pokemon/Ability';
import { EnumLanguajes } from '../../../shared/models/api/EnumLanguajes';

@Injectable({
  providedIn: 'root',
})
export class AbilitieService {
  // Base URL for the PokeAPI to fetch Pokémon data
  private readonly BASEURL = 'https://pokeapi.co/api/v2/ability/';

  constructor(private http: HttpClient) {}

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
  getAbilityName(ability: Ability,lang : EnumLanguajes): string {
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
  getAbilityEffect(ability: Ability,lang : EnumLanguajes): string {
    return (
      ability.effect_entries.find((e) => e.language.name == lang)
        ?.effect ?? 'Efect not available'
    );
  }
}
