import { NamedAPIResource } from "../../api/NamedAPIResource";

export default interface AbilityPokemon {
    is_hidden: boolean; // Whether or not this is a hidden ability
    slot: number; // The slot this ability occupies in this Pokémon species
    pokemon: NamedAPIResource; // The ability the Pokémon may have
}
