import {PastType, Pokemon, PokemonType} from '../models/Pokemon';
import {DamageEntry, PastDamageRelation, Type} from '../models/Type';

export class TypedData {
  static readonly urlSplitId = 6;

  constructor() {
    //Empty
  }

  /**
   * Returns the data as the Pokemon interface
   *
   * @param data Data from the PokéAPI 'https://pokeapi.co/api/v2/pokemon/id/'
   * @returns Data as Pokemon interface
   */
  static setPokemonData(data: any): Promise<Pokemon> {
    return new Promise(async (resolve) => {
      resolve({
        id: data?.id,
        name: await this.fixNameFormat(data?.name),
        generation: -1,
        sprite: data?.sprites?.front_default,
        pastTypes: await this.setPastTypes(data?.past_types),
        types: this.setPokemonTypes(data?.types)
      } as Pokemon);
    });
  }

  /**
   * Returns the data as the Type interface
   *
   * @param data Data from the PokéAPI 'https://pokeapi.co/api/v2/type/id/'
   * @returns Data as Type interface
   */
  static setTypeData(data: any): Promise<Type> {
    return new Promise(async (resolve) => {
      resolve({
        id: data?.id,
        name: data?.name,
        generation: this.getIdFromUrl(data?.generation?.url),
        damageRelations: {
          doubleDamageFrom: await this.setDamageEntry(data?.damage_relations?.double_damage_from),
          doubleDamageTo: await this.setDamageEntry(data?.damage_relations?.double_damage_to),
          halfDamageFrom: await this.setDamageEntry(data?.damage_relations?.half_damage_from),
          halfDamageTo: await this.setDamageEntry(data?.damage_relations?.half_damage_to),
          noDamageFrom: await this.setDamageEntry(data?.damage_relations?.no_damage_from),
          noDamageTo: await this.setDamageEntry(data?.damage_relations?.no_damage_to)
        },
        pastDamageRelations: await this.setPastDamageRelation(data?.past_damage_relations)
      } as Type);
    });
  }

  /**
   * Returns the data as the DamageEntry interface
   *
   * @param data
   * @returns DamageEntry array
   */
  static async setDamageEntry(data: any): Promise<DamageEntry[]> {
    if (!data) {
      return [];
    }

    const damageEntry: DamageEntry[] = [];
    for (const info of data) {
      damageEntry.push({
        generation: info?.generation,
        damageEntry: {name: info?.name, id: this.getIdFromUrl(info?.url)}
      } as DamageEntry);
    }

    return damageEntry;
  }

  /**
   * Returns the id from the given url from the PokéAPI.
   *
   * @param url Url as 'https://pokeapi.co/api/v2/test/id/' format
   * @returns The id in number type
   */
  static getIdFromUrl(url: string): number {
    if (url) {
      return parseInt(url.split('/')[this.urlSplitId], 10);
    } else {
      return -1;
    }
  }

  /**
   * Returns the data as the PastType interface
   *
   * @param data
   * @returns PastType array
   */
  static async setPastTypes(data: any): Promise<PastType[]> {
    if (!data) {
      return [];
    }

    const pastType: PastType[] = [];
    for (const info of data) {
      pastType.push({
        generation: this.getIdFromUrl(info?.generation?.url),
        types: this.setPokemonTypes(info?.types)
      } as PastType);
    }

    return pastType;
  }

  /**
   * Returns the data as the PokemonType interface
   *
   * @param data
   * @returns PokemonType array
   */
  static setPokemonTypes(data: any): PokemonType[] {
    if (!data) {
      return [];
    }

    const pokemonType: PokemonType[] = [];

    for (const info of data) {
      pokemonType.push({
        slot: info?.slot,
        type: {name: info?.type?.name, id: this.getIdFromUrl(info?.type?.url)}
      } as PokemonType);
    }

    return pokemonType;
  }

  /**
   * Returns the data as the PastDamageRelation interface
   *
   * @param data
   * @returns PastDamageRelation array
   */
  static async setPastDamageRelation(data: any): Promise<PastDamageRelation[]> {
    if (!data) {
      return [];
    }

    const pastDamageRelation: PastDamageRelation[] = [];

    for (const info of data) {
      pastDamageRelation.push({
        generation: this.getIdFromUrl(info?.generation?.url),
        damageRelations: {
          doubleDamageFrom: await this.setDamageEntry(info?.damage_relations?.double_damage_from),
          doubleDamageTo: await this.setDamageEntry(info?.damage_relations?.double_damage_to),
          halfDamageFrom: await this.setDamageEntry(info?.damage_relations?.half_damage_from),
          halfDamageTo: await this.setDamageEntry(info?.damage_relations?.half_damage_to),
          noDamageFrom: await this.setDamageEntry(info?.damage_relations?.no_damage_from),
          noDamageTo: await this.setDamageEntry(info?.damage_relations?.no_damage_to)
        }
      } as PastDamageRelation);
    }

    return pastDamageRelation;
  }

  /**
   * Delete the '-' from the string given
   *
   * @param data string
   * @returns fixed string
   */
  static async fixNameFormat(data: string): Promise<string> {
    if (!data) {
      return '';
    }

    const nameArray = data.split('-');
    let name = '';
    let i = 0;
    for (const part of nameArray) {
      name += part;
      if (i !== nameArray.length - 1) {
        name += ' ';
      }
      i++;
    }

    name = await this.capitalize(name);
    return name;
  }

  static capitalize(str: string): Promise<string> {
    if (!str) {
      return new Promise((resolve) => resolve(''));
    }

    return new Promise((resolve) => {
      const array = str.split(' ');
      let capitalized = '';

      for (const [index, word] of array.entries()) {
        const lower = word.toLowerCase();
        capitalized += word.charAt(0).toUpperCase() + lower.slice(1);
        capitalized += index < array.length - 1 ? ' ' : '';
      }

      resolve(capitalized);
    });
  }

  static async fixGenerationNameFormat(data: string): Promise<string> {
    if (!data) {
      return '';
    }

    const nameArray = data.split('-');
    return nameArray[1].toUpperCase();
  }
}
