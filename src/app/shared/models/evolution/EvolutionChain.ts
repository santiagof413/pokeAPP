import ChainLink from "./ChainLink";

export default interface EvolutionChain {
    // The unique identifier for the evolution chain
    id: number;
    //The base chain link object.
    chain:ChainLink;
}