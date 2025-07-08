import { NamedAPIResource } from '../api/NamedAPIResource';

export default interface PokemonStat {
  //Url to the API resource for the stat
  stat: NamedAPIResource;
  // The effort value contributed by this stat
  effort: number; 
  // The base value of the stat for the Pokémon
  base_stat: number; 
}
