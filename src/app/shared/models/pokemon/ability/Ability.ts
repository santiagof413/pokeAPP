import { NamedAPIResourceLanguage } from '../../api/NamedAPIResource';
import VerboseEffect from './VerboseEffect';

export default interface Ability {
  id: number; // The unique identifier for the ability
  name: string; // The name of the ability
  names: {
    name: string; // Name of the ability in a specific language
    language: NamedAPIResourceLanguage; // Language of the name
  }[]; // Array of names in different languages
  effect_entries: VerboseEffect[]; // Array of effects in different languages
  // generation: NamedAPIResourceLanguage; // The generation in which the ability was introduced
  // effect_changes: AbilityEffectChange[]; // Array of changes to the effect of the ability
  // flavor_text_entries: AbilityFlavorText[]; // Array of flavor text entries in different languages
  // pokemon: AbilityPokemon[]; // Array of Pokémon that have this ability
}
