import { EnumLenguajes } from './EnumLenguajes';

export interface NamedAPIResource {
  // The name of the resource
  name: string;
  // The URL of the resource
  url: string;
}

export interface NamedAPIResourceLenguage {
  // The name of the resource
  name: EnumLenguajes;
  // The URL of the resource
  url: string;
}
