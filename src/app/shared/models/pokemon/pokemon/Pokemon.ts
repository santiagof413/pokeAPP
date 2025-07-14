import { NamedAPIResource } from '../../api/NamedAPIResource';
import PokemonAbility from './PokemonAbility';
import PokemonSprites from './PokemonSprites';
import PokemonStat from './PokemonStat';
import PokemonType from './PokemonType';


export default interface Pokemon {
  // The unique identifier for the Pokémon
  id: number;
  // The name of the Pokémon
  name: string;
  // The base experience gained from defeating this Pokémon
  base_experience: number;
  // The height of the Pokémon in decimetres
  height: number;
  // The weight of the Pokémon in hectograms
  weight: number;
  // The abilities of the Pokémon
  abilities: PokemonAbility[];
  // Sprites representing the Pokémon in various forms
  sprites: PokemonSprites;
  // The specie of the Pokémon
  species: NamedAPIResource;
  // The stats of the Pokémon
  stats: PokemonStat[];
  // The types of the Pokémon
  types: PokemonType[];
}
