export interface Type {
  id: number;
  name: string;
  generation: number;
  pastDamageRelations: PastDamageRelation[];
  damageRelations: {
    doubleDamageFrom: DamageEntry[];
    doubleDamageTo: DamageEntry[];
    halfDamageFrom: DamageEntry[];
    halfDamageTo: DamageEntry[];
    noDamageFrom: DamageEntry[];
    noDamageTo: DamageEntry[];
  };
}

export interface PastDamageRelation {
  generation: number;
  damageRelations: {
    doubleDamageFrom: DamageEntry[];
    doubleDamageTo: DamageEntry[];
    halfDamageFrom: DamageEntry[];
    halfDamageTo: DamageEntry[];
    noDamageFrom: DamageEntry[];
    noDamageTo: DamageEntry[];
  };
}

export interface DamageEntry {
  generation: number;
  damageEntry: {name: string; id: number};
}
