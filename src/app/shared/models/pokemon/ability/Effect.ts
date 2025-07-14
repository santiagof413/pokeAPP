import { NamedAPIResourceLanguage } from "../../api/NamedAPIResource";

export default interface Effect {
    effect: string; // The text of the effect in a specific language
    language: NamedAPIResourceLanguage; // The language of the effect
}