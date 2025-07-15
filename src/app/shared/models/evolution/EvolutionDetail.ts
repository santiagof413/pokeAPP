import { NamedAPIResource } from "../api/NamedAPIResource";

export default interface EvolutionDetail{
    min_level?: number; // The minimum level required for evolution
    trigger?: NamedAPIResource; // The trigger for evolution, e.g., level-up, use of an item
}