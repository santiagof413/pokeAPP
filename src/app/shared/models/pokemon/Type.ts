import { NamedAPIResourceLanguage } from '../api/NamedAPIResource';

export default interface Type {
  names: {
    name: string; // Name of the ability in a specific language
    language: NamedAPIResourceLanguage; // Language of the name
  }[];
}
