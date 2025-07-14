import { NamedAPIResource, NamedAPIResourceLanguage } from "../../api/NamedAPIResource";

export default interface AbilityFlavorText  {
    flavor_text: string; // The text of the effect change in a specific language
    language: NamedAPIResourceLanguage; // The language of the effect change
    version_group: NamedAPIResource
}