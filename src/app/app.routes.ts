import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { PokemonsPageComponent } from './features/pokemon/pages/pokemons-page/pokemons-page.component';
import { PokemonDetailsComponent } from './features/pokemon/pages/pokemon-details/pokemon-details.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'pokemons',component: PokemonsPageComponent},
    {path: 'pokemons/:id', component: PokemonDetailsComponent},
];
