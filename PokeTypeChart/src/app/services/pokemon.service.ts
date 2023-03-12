import {Injectable} from '@angular/core';
import {DamageEntry, PastDamageRelation, Type} from '../models/Type';
import {TypedData} from '../helpers/TypedData';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import typesInfoJson from 'src/assets/Data/typesInfo.json';
import pokemonInfoJson from 'src/assets/Data/pokemonInfo.json';
import {Pokemon} from '../models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  readonly typesNumber = 18;
  readonly apiUrl = environment.pokemonAPIV2;

  typesInfo: Type[] = [];
  pokemonInfo: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  /**
   * Returns the Type data as an array of Type[]
   *
   * @returns Promise<Type[]>
   */
  async getAllTypesInfoInArray(): Promise<Type[]> {
    this.typesInfo = typesInfoJson as Type[];
    return this.typesInfo;
  }

  async searchPokemon(searchTerm: string, generation: string) {
    let filtered = this.pokemonInfo.filter(
      (pokemon) => pokemon.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
    filtered = filtered.filter((pokemon) => pokemon.generation <= parseInt(generation, 10));

    return filtered;
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

  async setPokemonGeneration(pokemon: Pokemon): Promise<Pokemon> {
    await this.getPokemonSpeciesById(pokemon.id).then(async (data: any) => {
      pokemon.generation = TypedData.getIdFromUrl(data?.generation?.url);
    });
    return pokemon;
  }

  async getAllPokemonVarietiesFromPokemon(pokemon: Pokemon) {
    const pokemonVarieties: Pokemon[] = [];

    await this.getPokemonSpeciesById(pokemon.id).then(async (data: any) => {
      if (data?.varieties.length > 1) {
        for (const variety of data?.varieties) {
          if (!variety.is_default) {
            // console.log(TypedData.getIdFromUrl(variety.pokemon.url));
            await this.getPokemonById(TypedData.getIdFromUrl(variety.pokemon.url)).then(
              async (data: any) => {
                let pokemonVariety = await TypedData.setPokemonData(data);
                pokemonVarieties.push(pokemonVariety);
              }
            );
          }
        }
      }
    });

    return pokemonVarieties;
  }

  async getPokemonById(id: number) {
    return await this.http.get(`${this.apiUrl}/pokemon/${id}`).toPromise();
  }
  async getPokemonSpeciesById(id: number) {
    return await this.http.get(`${this.apiUrl}/pokemon-species/${id}`).toPromise();
  }
}
