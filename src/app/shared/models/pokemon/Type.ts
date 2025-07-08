import { NamedAPIResourceLenguage } from '../api/NamedAPIResource';

export default interface Type {
  names: {
    name: string; // Name of the ability in a specific language
    lenguage: NamedAPIResourceLenguage; // Language of the name
  }[];
}
