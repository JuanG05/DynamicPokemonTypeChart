export interface Pokemon {
  id: number;
  name: string;
  generation: number;
  sprite: string;
  pastTypes: PastType[];
  types: PokemonType[];
}

export interface PastType {
  generation: number;
  types: PokemonType[];
}

export interface PokemonType {
  slot: number;
  type: {name: string; id: number};
}
