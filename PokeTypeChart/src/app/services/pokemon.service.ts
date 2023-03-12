import {Injectable} from '@angular/core';
import {Type} from '../models/Type';
import typesInfoJson from 'src/assets/Data/typesInfo.json';
import pokemonInfoJson from 'src/assets/Data/pokemonInfo.json';
import {Pokemon} from '../models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  typesInfo: Type[] = [];
  pokemonInfo: Pokemon[] = [];

  constructor() {}

  /**
   * Returns the Type data as an array of Type[]
   *
   * @returns Promise<Type[]>
   */
  async getAllTypesInfoInArray(): Promise<Type[]> {
    this.typesInfo = typesInfoJson as Type[];
    return this.typesInfo;
  }

  /**
   * Returns the Pokemon data as an array of Pokemon[]
   *
   * @returns Promise<Pokemon[]>
   */
  async getPokemonInfoInArray(): Promise<Pokemon[]> {
    this.pokemonInfo = pokemonInfoJson as Pokemon[];
    return this.pokemonInfo;
  }

  /**
   * Returns the filtered data as an array of Pokemon[]
   *
   * @param searchTerm string to search for pokemon names
   * @param generation
   * @returns Promise<Pokemon[]>
   */
  async searchPokemon(searchTerm: string, generation: string): Promise<Pokemon[]> {
    let filtered = this.pokemonInfo.filter(
      (pokemon) => pokemon.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
    filtered = filtered.filter((pokemon) => pokemon.generation <= parseInt(generation, 10));

    return filtered;
  }
}
