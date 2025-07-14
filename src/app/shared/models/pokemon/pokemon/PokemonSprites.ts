export default interface PokemonSprites {
  front_default: string; // URL to the default front-facing sprite
  front_shiny: string; // URL to the shiny front-facing sprite
  back_default: string; // URL to the default back-facing sprite
  back_shiny: string; // URL to the shiny back-facing sprite
  other?: {
    // Optional additional sprites
    'official-artwork': {
      front_default: string; // URL to the official artwork front-facing sprite
    };
  };
}
