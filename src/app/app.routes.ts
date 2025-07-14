import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { PokemonsPageComponent } from './features/pokemon/pages/pokemons-page/pokemons-page.component';
import { PokemonDetailsComponent } from './features/pokemon/pages/pokemon-details/pokemon-details.component';
import { AbilitiesPageComponent } from './features/ability/pages/abilities-page/abilities-page.component';
import { AbilityDetailsComponent } from './features/ability/pages/ability-details/ability-details.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'pokemons',component: PokemonsPageComponent},
    {path: 'pokemons/:id', component: PokemonDetailsComponent},
    {path: 'abilities', component: AbilitiesPageComponent},
    {path: 'abilities/:id', component: AbilityDetailsComponent}, // Assuming you want to show details on the same page
];
