import { NamedAPIResourceLenguage } from '../api/NamedAPIResource';
import VerboseEffect from './VerboseEffect';

export default interface Ability {
  id: number; // The unique identifier for the ability
  name: string; // The name of the ability
  names: {
    name: string; // Name of the ability in a specific language
    lenguage: NamedAPIResourceLenguage; // Language of the name
  }[]; // Array of names in different languages
  effect_entries: VerboseEffect[]; // Array of effects in different languages
}
