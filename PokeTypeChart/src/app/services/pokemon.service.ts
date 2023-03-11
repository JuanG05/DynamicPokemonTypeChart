import {Injectable} from '@angular/core';
import {DamageEntry, PastDamageRelation, Type} from '../models/Type';
import {TypedData} from '../helpers/TypedData';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import typesInfoJson from 'src/assets/Data/typesInfo.json';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  readonly typesNumber = 18;
  readonly apiUrl = environment.pokemonAPIV2;

  typesInfo: Type[] = [];

  constructor(private http: HttpClient) {}

  /**
   * Returns the Type data as an array of Type[]
   *
   * @returns Promise<Type[]>
   */
  async getAllTypesInfoInArray(): Promise<Type[]> {
    this.typesInfo = typesInfoJson as Type[];
    return this.typesInfo;
    let typesInfo: Type[] = [];

    // if (typesInfo.length === 0) {
    //   for (let id = 1; id <= this.typesNumber; id++) {
    //     await this.getTypesById(id)
    //       .then(async (data: any) => {
    //         const type = await TypedData.setTypeData(data);

    //         this.fillDamageRelations(type);

    //         for (const pastDamage of type.pastDamageRelations) {
    //           this.fillDamageRelations(pastDamage);
    //         }

    //         typesInfo.push(type);
    //         typesInfo.sort((a, b) => a.id - b.id);
    //       })
    //       .catch((_error) => {});
    //   }
    //   this.typesInfo = typesInfo;
    //   localStorage.setItem('typesInfo', JSON.stringify(typesInfo));
    // }
    // return typesInfo;
  }

  // async getTypesById(id: number) {
  //   return await this.http.get(`${this.apiUrl}/type/${id}`).toPromise();
  // }

  // fillDamageRelations(type: Type | PastDamageRelation) {
  //   this.fillDamageRelationGeneration(type.damageRelations.doubleDamageFrom);
  //   this.fillDamageRelationGeneration(type.damageRelations.doubleDamageTo);
  //   this.fillDamageRelationGeneration(type.damageRelations.halfDamageFrom);
  //   this.fillDamageRelationGeneration(type.damageRelations.halfDamageTo);
  //   this.fillDamageRelationGeneration(type.damageRelations.noDamageFrom);
  //   this.fillDamageRelationGeneration(type.damageRelations.noDamageTo);
  // }

  // fillDamageRelationGeneration(damageEntry: DamageEntry[]) {
  //   for (const damageRelation of damageEntry) {
  //     switch (damageRelation.damageEntry.id) {
  //       case 18:
  //         damageRelation.generation = 6;
  //         break;
  //       case 17:
  //         damageRelation.generation = 2;
  //         break;
  //       case 9:
  //         damageRelation.generation = 2;
  //         break;

  //       default:
  //         damageRelation.generation = 1;
  //         break;
  //     }
  //   }
  // }
}
