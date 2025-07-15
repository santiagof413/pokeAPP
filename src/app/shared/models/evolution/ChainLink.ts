import { NamedAPIResource } from "../api/NamedAPIResource";
import EvolutionDetail from "./EvolutionDetail";

export default interface ChainLink{
    species: NamedAPIResource;
    evolves_to: ChainLink[];
    evolution_details: EvolutionDetail[];

}