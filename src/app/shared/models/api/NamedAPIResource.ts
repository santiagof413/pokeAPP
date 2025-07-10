import { EnumLanguajes } from './EnumLanguajes';

export interface NamedAPIResource {
  // The name of the resource
  name: string;
  // The URL of the resource
  url: string;
}

export interface NamedAPIResourceLanguage {
  // The name of the resource
  name: EnumLanguajes;
  // The URL of the resource
  url: string;
}
