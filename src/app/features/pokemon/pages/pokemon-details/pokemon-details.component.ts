import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../../core/services/pokemon/pokemon.service';
import Pokemon from '../../../../shared/models/pokemon/pokemon/Pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { AbilityService } from '../../../../core/services/pokemon/abilitie.service';
import { EnumLanguajes } from '../../../../shared/models/api/EnumLanguajes';
import Ability from '../../../../shared/models/pokemon/ability/Ability';
import { EvolutionService } from '../../../../core/services/evolution/evolution.service';
import { SpecieService } from '../../../../core/services/pokemon/specie.service';
import ChainLink from '../../../../shared/models/evolution/ChainLink';

@Component({
  selector: 'app-pokemon-details',
  imports: [],
  templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon | null;
  pokemonAbilities: Ability[]; // Cambiar el tipo según la estructura de las habilidades
  lang: EnumLanguajes; // Para usar en la plantilla
  evolutionChains: ChainLink[]; // Cambiar el tipo según la estructura de la cadena de evolución
  evolutionSprites: { [name: string]: string }; // Para almacenar las imágenes de las evoluciones

  constructor(
    public pokemonService: PokemonService,
    private abilityService: AbilityService,
    private evolutionService: EvolutionService,
    private specieService: SpecieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pokemon = this.pokemonService.getPokemonSelected();
    this.pokemonAbilities = [];
    this.evolutionChains = [];
    this.evolutionSprites = {};
    this.lang = EnumLanguajes.English;
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const pokemonName = params['name'] || params['id']; // depende de tu ruta
      if (pokemonName) {
        this.pokemonService.setPokemonSelected(null);
        this.pokemonService.getPokemon(pokemonName).subscribe({
          next: (pokemon) => {
            this.pokemon = pokemon;
            this.pokemonAbilities = [];
            this.evolutionChains = [];
            this.evolutionSprites = {};
            this.pokemonService.setPokemonSelected(pokemon);
            this.loadPokemonAbilities();
            this.loadEvolutionChain();
          },
          error: (error) => {
            console.error('Error fetching pokemon details:', error);
            this.router.navigate(['/pokemons']);
          },
        });
      }
    });
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

  loadEvolutionChain(): void {
    const URLSpecie = this.pokemon?.species?.url;
    if (!URLSpecie) {
      console.error('No species URL found for the Pokemon');
      return;
    }
    this.specieService.getSpecieByURL(URLSpecie).subscribe({
      next: (specie) => {
        if (specie.evolution_chain) {
          this.evolutionService
            .getEvolutionChainByURL(specie.evolution_chain.url)
            .subscribe({
              next: (evolutionChain) => {
                let currentLink: ChainLink | null = evolutionChain.chain;
                while (currentLink) {
                  this.evolutionChains.push(currentLink);
                  this.pokemonService
                    .getPokemon(currentLink.species.name)
                    .subscribe({
                      next: (pokemon) => {
                        this.evolutionSprites[pokemon.name] =
                          pokemon.sprites.other?.['official-artwork']
                            .front_default || pokemon.sprites.front_default;
                      },
                      error: (error) => {
                        console.error(
                          'Error fetching evolution sprite:',
                          error
                        );
                      },
                    });
                  currentLink =
                    currentLink.evolves_to.length > 0
                      ? currentLink.evolves_to[0]
                      : null; // Solo toma la primera evolución
                }
              },
              error: (error) => {
                console.error('Error fetching evolution chain:', error);
              },
            });
        } else {
          console.warn('No evolution chain found for this species');
        }
      },
      error: (error) => {
        console.error('Error fetching species details:', error);
      },
    });
    //this.evolutionService.getEvolutionChainByURL(this.pokemon?.s
  }

  getAbilityName(ability: Ability): string {
    return this.abilityService.getAbilityName(ability, this.lang);
  }

  getAbilityEffect(ability: Ability): string {
    return this.abilityService.getAbilityEffect(ability, this.lang);
  }

  goToAbilityDetails(ability: Ability): void {
    this.abilityService.setAbilitySelected(ability);
    this.router.navigate(['/abilities', ability.id]);
  }

  goToPokemonDetails(pokemonName: string): void {
    this.pokemonService.setPokemonSelected(null);
    this.router.navigate(['/pokemons', pokemonName]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
