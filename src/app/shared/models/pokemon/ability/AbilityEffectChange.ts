import { NamedAPIResource} from "../../api/NamedAPIResource";
import Effect from "./Effect";

export default interface AbilityEffectChange {
    effect_entries: Effect[]; // The text of the effect change in a specific language
    version_group: NamedAPIResource; // The version group in which the effect change occurs
}