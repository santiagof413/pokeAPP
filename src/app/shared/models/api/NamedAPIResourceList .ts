import { NamedAPIResource } from "./NamedAPIResource";

export default interface NamedAPIResourceList {
    // The total number of resources available
    count: number;
    // The URL to the next page of results, or null if there are no more pages
    next: string | null;
    // The URL to the previous page of results, or null if this is the first page
    previous: string | null;
    // An array of NamedAPIResource objects representing the results
    results: NamedAPIResource[];
}