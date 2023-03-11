export interface Pokemon {
  id: number;
  name: string;
  generation: number;
  sprites: {frontDefault: string};
  pastTypes: PastType[];
  types: PokemonType[];
}

export interface PastType {
  generation: {name: string; id: number};
  types: PokemonType[];
}

export interface PokemonType {
  slot: number;
  type: {name: string; id: number};
}
