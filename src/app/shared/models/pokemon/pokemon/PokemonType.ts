import { NamedAPIResource } from '../../api/NamedAPIResource';

export default interface PokemonType {
  // The slot in which the Pokémon's type appears
  slot: number;
  // The type of the Pokémon
  type: NamedAPIResource;
}
