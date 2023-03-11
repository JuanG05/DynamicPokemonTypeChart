import {DamageEntry, PastDamageRelation, Type} from '../models/Type';

export class TypedData {
  static readonly urlSplitId = 6;

  constructor() {
    //Empty
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
        // * Mantener name en minúscula (para cálculo de daños)
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

  static async fixGenerationNameFormat(data: string): Promise<string> {
    if (!data) {
      return '';
    }

    const nameArray = data.split('-');
    return nameArray[1].toUpperCase();
  }
}
