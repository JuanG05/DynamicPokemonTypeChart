import {DamageEntry, Type} from '../models/Type';

export class TypesDamage {
  constructor() {}

  static calculatePokemonDamageFrom(
    typeArray: Type[],
    generation: string,
    type1: string,
    type2?: string
  ): string[][] {
    if (!type1) {
      return [[], [], []];
    }

    const genTypes = [];

    for (const gen of typeArray) {
      if (gen.generation <= parseInt(generation, 10)) {
        genTypes.push(gen);
      }
    }

    const type1ToCompare = genTypes.find((x) => x.name === type1);
    if (!type1ToCompare) {
      return [[], [], []];
    }
    const type1Damage = this.getTypeDamagesFrom(type1ToCompare, generation);

    if (!type2) {
      return type1Damage;
    }

    const type2ToCompare = genTypes.find((x) => x.name === type2);
    if (!type2ToCompare) {
      return type1Damage;
    }
    const type2Damage = this.getTypeDamagesFrom(type2ToCompare, generation);

    return this.getTypeDamagesFromOfTwoTypes(genTypes, type1Damage, type2Damage);
  }

  static calculatePokemonDamageTo(
    typeArray: Type[],
    generation: string,
    type1: string,
    type2?: string
  ): string[][] {
    if (!type1) {
      return [[], [], []];
    }

    const genTypes = [];

    for (const gen of typeArray) {
      if (gen.generation <= parseInt(generation, 10)) {
        genTypes.push(gen);
      }
    }

    const type1ToCompare = genTypes.find((x) => x.name === type1);
    if (!type1ToCompare) {
      return [[], [], []];
    }
    const type1Damage = this.getTypeDamagesTo(type1ToCompare, generation);

    if (!type2) {
      return type1Damage;
    }

    const type2ToCompare = genTypes.find((x) => x.name === type2);
    if (!type2ToCompare) {
      return type1Damage;
    }
    const type2Damage = this.getTypeDamagesTo(type2ToCompare, generation);

    return this.getTypeDamagesToOfTwoTypes(genTypes, type1Damage, type2Damage);
  }

  static getTypeDamagesFromOfTwoTypes(typeArray: Type[], type1: string[][], type2: string[][]) {
    const quadrupleDamage: string[] = [];
    const doubleDamage: string[] = [];
    const halfDamage: string[] = [];
    const oneQuarterDamage: string[] = [];
    const noDamage: string[] = [];

    for (const type of typeArray) {
      const damageType = this.getDamageFromType(type1, type2, type.name);

      switch (damageType) {
        case 'x4':
          quadrupleDamage.push(type.name);
          break;
        case 'x2':
          doubleDamage.push(type.name);
          break;
        case 'x1/2':
          halfDamage.push(type.name);
          break;
        case 'x1/4':
          oneQuarterDamage.push(type.name);
          break;
        case 'x0':
          noDamage.push(type.name);
          break;

        default:
          // * x1
          break;
      }
    }

    return [quadrupleDamage, doubleDamage, halfDamage, oneQuarterDamage, noDamage];
  }

  static getDamageFromType(type1: string[][], type2: string[][], fromType: string) {
    const damagesMatrix = this.fillDamagesMatrix(type1, type2, fromType);

    if (damagesMatrix[2].includes(true)) {
      return 'x0';
    }
    if (!damagesMatrix[0].includes(false)) {
      return 'x4';
    }
    if (!damagesMatrix[1].includes(false)) {
      return 'x1/4';
    }
    if (
      (damagesMatrix[0][1] && !damagesMatrix[1][0]) ||
      (damagesMatrix[0][0] && !damagesMatrix[1][1])
    ) {
      return 'x2';
    }
    if (
      (!damagesMatrix[0][1] && damagesMatrix[1][0]) ||
      (!damagesMatrix[0][0] && damagesMatrix[1][1])
    ) {
      return 'x1/2';
    }

    return 'null';
  }

  static getTypeDamagesToOfTwoTypes(typeArray: Type[], type1: string[][], type2: string[][]) {
    const doubleDamage: string[] = [];
    const halfDamage: string[] = [];
    const noDamage: string[] = [];

    for (const type of typeArray) {
      const damageType = this.getDamageToType(type1, type2, type.name);

      switch (damageType) {
        case 'x2':
          doubleDamage.push(type.name);
          break;
        case 'x1/2':
          halfDamage.push(type.name);
          break;
        case 'x0':
          noDamage.push(type.name);
          break;

        default:
          // * x1
          break;
      }
    }

    return [doubleDamage, halfDamage, noDamage];
  }

  static getDamageToType(type1: string[][], type2: string[][], againstType: string) {
    const damagesMatrix = this.fillDamagesMatrix(type1, type2, againstType);

    if (damagesMatrix[0].includes(true)) {
      return 'x2';
    }
    if (!damagesMatrix[1].includes(false)) {
      return 'x1/2';
    }
    if (!damagesMatrix[2].includes(false)) {
      return 'x0';
    }

    return 'null';
  }

  static fillDamagesMatrix(type1: string[][], type2: string[][], fromType: string) {
    // * [ doubleDamage[0], halfDamage[1], noDmgDmgFrom[2] ]
    return [
      [this.isStringInsideArray(fromType, type1[0]), this.isStringInsideArray(fromType, type2[0])],
      [this.isStringInsideArray(fromType, type1[1]), this.isStringInsideArray(fromType, type2[1])],
      [this.isStringInsideArray(fromType, type1[2]), this.isStringInsideArray(fromType, type2[2])]
    ];
  }

  static isStringInsideArray(str: string, array: string[]): boolean {
    return array.find((x) => x.includes(str)) ? true : false;
  }

  /**
   * Returns a matrix with the damageFrom info
   *
   * @param type Data as Type
   * @returns string[doubleDamage[], halfDamage[], noDmgDmgFrom[]]
   */
  static getTypeDamagesFrom(type: Type, generation: string): string[][] {
    let doubleDamage: string[] = [];
    let halfDamage: string[] = [];
    let noDamage: string[] = [];

    if (type.pastDamageRelations.length > 0) {
      for (const pastType of type.pastDamageRelations) {
        if (parseInt(generation, 10) <= pastType.generation) {
          doubleDamage = this.getTypeDamageOfDamageEntry(
            pastType.damageRelations.doubleDamageFrom,
            generation
          );
          halfDamage = this.getTypeDamageOfDamageEntry(
            pastType.damageRelations.halfDamageFrom,
            generation
          );
          noDamage = this.getTypeDamageOfDamageEntry(
            pastType.damageRelations.noDamageFrom,
            generation
          );

          return [doubleDamage, halfDamage, noDamage];
        }
      }
    }
    doubleDamage = this.getTypeDamageOfDamageEntry(
      type.damageRelations.doubleDamageFrom,
      generation
    );
    halfDamage = this.getTypeDamageOfDamageEntry(type.damageRelations.halfDamageFrom, generation);
    noDamage = this.getTypeDamageOfDamageEntry(type.damageRelations.noDamageFrom, generation);

    return [doubleDamage, halfDamage, noDamage];
  }

  /**
   * Returns a matrix with the damageTo info
   *
   * @param type Data as Type
   * @returns string[doubleDmgTo[], halfDmgTo[], noDmgDmgTo[]]
   */
  static getTypeDamagesTo(type: Type, generation: string): string[][] {
    let doubleDmgTo = [];
    let halfDmgTo = [];
    let noDmgTo = [];

    if (type.pastDamageRelations.length > 0) {
      for (const pastType of type.pastDamageRelations) {
        if (parseInt(generation, 10) <= pastType.generation) {
          doubleDmgTo = this.getTypeDamageOfDamageEntry(
            pastType.damageRelations.doubleDamageTo,
            generation
          );
          halfDmgTo = this.getTypeDamageOfDamageEntry(
            pastType.damageRelations.halfDamageTo,
            generation
          );
          noDmgTo = this.getTypeDamageOfDamageEntry(
            pastType.damageRelations.noDamageTo,
            generation
          );

          return [doubleDmgTo, halfDmgTo, noDmgTo];
        }
      }
    }
    doubleDmgTo = this.getTypeDamageOfDamageEntry(type.damageRelations.doubleDamageTo, generation);
    halfDmgTo = this.getTypeDamageOfDamageEntry(type.damageRelations.halfDamageTo, generation);
    noDmgTo = this.getTypeDamageOfDamageEntry(type.damageRelations.noDamageTo, generation);

    return [doubleDmgTo, halfDmgTo, noDmgTo];
  }

  static getTypeDamageOfDamageEntry(damageEntry: DamageEntry[], generation: string) {
    const damage: string[] = [];
    for (const info of damageEntry) {
      if (info.generation <= parseInt(generation, 10)) {
        damage.push(info.damageEntry.name);
      }
    }
    return damage;
  }
}
