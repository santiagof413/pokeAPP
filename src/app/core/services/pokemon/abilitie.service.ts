import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Ability from '../../../shared/models/pokemon/Ability';

@Injectable({
  providedIn: 'root'
})
export class AbilitieService {
  // Base URL for the PokeAPI to fetch Pokémon data
  private readonly BASEURL = 'https://pokeapi.co/api/v2/ability/';

  constructor(private http:HttpClient) { }
  getAbility(id: number | string) {
      const url = `${this.BASEURL}${id}`;
      return this.http.get<Ability>(url);
  }
}
