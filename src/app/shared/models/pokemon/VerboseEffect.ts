import { NamedAPIResourceLenguage } from '../api/NamedAPIResource';

export default interface VerboseEffect {
  effect: string; // The effect of the ability in a specific language
  short_effect: string; // A short description of the effect in a specific language
  lenguage: NamedAPIResourceLenguage; // The language of the effect
}
