import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../../core/services/pokemon/pokemon.service';
import Pokemon from '../../../../shared/models/pokemon/Pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { AbilitieService } from '../../../../core/services/pokemon/abilitie.service';
import Ability from '../../../../shared/models/pokemon/Ability';
import { EnumLanguajes } from '../../../../shared/models/api/EnumLanguajes';

@Component({
  selector: 'app-pokemon-details',
  imports: [],
  templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon | null;
  pokemonAbilities: Ability[]; // Cambiar el tipo según la estructura de las habilidades
  lang:EnumLanguajes; // Para usar en la plantilla

  constructor(
    private pokemonService: PokemonService,
    private abilityService: AbilitieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pokemon = this.pokemonService.getPokemonSelected();
    this.pokemonAbilities = [];
    this.lang = EnumLanguajes.Ingles
  }
  ngOnInit(): void {
    this.loadPokemonGeneralDetails();
  }

  loadPokemonGeneralDetails(): void {
    if (!this.pokemon) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.pokemonService.getPokemon(id).subscribe({
          next: (pokemon: Pokemon) => {
            this.pokemon = pokemon;
            this.pokemonService.setPokemonSelected(pokemon);
            this.loadPokemonAbilities();
          },
          error: (error) => {
            console.error('Error fetching pokemon details:', error);
            this.router.navigate(['/pokemons']);
          },
        });
      } else {
        console.error('No Pokemon ID provided in route');
        this.router.navigate(['/pokemons']);
      }
    }else {
      this.loadPokemonAbilities();
    }
  }

  loadPokemonAbilities(): void {
    this.pokemon?.abilities.forEach((ability) => {
      this.abilityService.getAbility(ability.ability.name).subscribe({
        next: (abilitie: Ability) => {
          this.pokemonAbilities.push(abilitie);
        },
        error: (error) => {
          console.error('Error fetching ability details:', error);
        },
      });
    });
  }

  getAbilityName(ability: Ability): string {
    return this.abilityService.getAbilityName(ability, this.lang);
  }

  getAbilityEffect(ability: Ability): string {
    return this.abilityService.getAbilityEffect(ability, this.lang);
  }

}
