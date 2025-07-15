import { NamedAPIResource } from "../../api/NamedAPIResource";

export default interface Specie{
    //the identifier of the specie
    id: number;
    //the name of the specie
    name: string;
    //the url evolution chain of the specie
    evolution_chain:NamedAPIResource;
}