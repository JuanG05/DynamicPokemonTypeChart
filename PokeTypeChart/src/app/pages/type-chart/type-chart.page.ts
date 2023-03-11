import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TypesDamage} from 'src/app/helpers/TypesDamage';
import {IonPopover} from '@ionic/angular';
import {Type} from 'src/app/models/Type';
import {Pokemon} from 'src/app/models/Pokemon';
import {PokemonService} from 'src/app/services/pokemon.service';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-type-chart',
  templateUrl: './type-chart.page.html',
  styleUrls: ['./type-chart.page.scss']
})
export class TypeChartPage implements OnInit, AfterViewInit {
  @ViewChild('popover') popover: IonPopover | undefined;

  // searchControl: FormControl;

  pokemonTypeDamages: string[][] = [];
  pokemonTypeDamagesTo: string[][] = [];

  quadrupleDamageFrom: string[] = [];
  doubleDmgFrom: string[] = [];
  halfDmgFrom: string[] = [];
  oneQuarterDamageFrom: string[] = [];
  noDmgFrom: string[] = [];

  doubleDmgTo: string[] = [];
  halfDmgTo: string[] = [];
  noDmgTo: string[] = [];

  filteredSearch: Pokemon[] = [];

  isPopoverOpen = false;

  types: Type[] = [];
  type1: string = '';
  type2: string = '';

  generation: string = '1';
  availableGens: string[][] = [
    ['1', 'Gen 1'],
    ['5', 'Gen 2-5'],
    ['6', 'Gen 6+']
  ];
  actualGen: string = '';

  constructor(private pokemonService: PokemonService) {
    // this.searchControl = new FormControl();
  }

  ngOnInit() {
    // this.searchControl.valueChanges.pipe(debounceTime(700)).subscribe((search) => {
    //   this.filterPokemon(search);
    // });
    this.type1 = '';
    this.type2 = '';
    this.updateToNewGeneration('6');
  }

  ngAfterViewInit(): void {
    // this.popover.didDismiss.subscribe(() => {
    //   this.isPopoverOpen = false;
    //   this.searchControl.reset();
    // });
  }

  updateToNewGeneration(newGeneration?: string) {
    if (newGeneration) {
      this.setNewGenTitleText(newGeneration);
      this.generation = newGeneration;
    }

    this.pokemonService.getAllTypesInfoInArray().then((response: any) => {
      this.types = [];
      this.type1 = '';
      this.type2 = '';
      for (const type of response) {
        if (type.generation <= parseInt(this.generation, 10)) {
          this.types.push(type);
        }
      }
    });

    this.getPokemonTypeDamages();
  }

  toggleActiveType(type: string) {
    switch (true) {
      case this.type1 === '':
        this.type1 = type;
        break;

      case this.type1 === type:
        this.type1 = this.type2;
        this.type2 = '';
        break;

      case this.type2 === '':
        this.type2 = type;
        break;

      default:
        this.type2 = this.type2 === type ? '' : type;
    }

    this.getPokemonTypeDamages();
  }

  getPokemonTypeDamages() {
    this.resetDamages();
    this.fillToDamages();
    this.fillFromDamages();
  }

  fillToDamages() {
    this.pokemonTypeDamagesTo = TypesDamage.calculatePokemonDamageTo(
      this.types,
      this.generation,
      this.type1,
      this.type2
    );

    this.doubleDmgTo = this.pokemonTypeDamagesTo[0];
    this.halfDmgTo = this.pokemonTypeDamagesTo[1];
    this.noDmgTo = this.pokemonTypeDamagesTo[2];
  }

  fillFromDamages() {
    this.pokemonTypeDamages = TypesDamage.calculatePokemonDamageFrom(
      this.types,
      this.generation,
      this.type1,
      this.type2
    );

    if (this.pokemonTypeDamages.length === 5) {
      this.quadrupleDamageFrom = this.pokemonTypeDamages[0];
      this.doubleDmgFrom = this.pokemonTypeDamages[1];
      this.halfDmgFrom = this.pokemonTypeDamages[2];
      this.oneQuarterDamageFrom = this.pokemonTypeDamages[3];
      this.noDmgFrom = this.pokemonTypeDamages[4];
    } else {
      this.doubleDmgFrom = this.pokemonTypeDamages[0];
      this.halfDmgFrom = this.pokemonTypeDamages[1];
      this.noDmgFrom = this.pokemonTypeDamages[2];
    }
  }

  resetDamages() {
    this.pokemonTypeDamages =
      this.pokemonTypeDamagesTo =
      this.quadrupleDamageFrom =
      this.doubleDmgFrom =
      this.halfDmgFrom =
      this.oneQuarterDamageFrom =
      this.noDmgFrom =
      this.doubleDmgTo =
      this.halfDmgTo =
      this.noDmgTo =
        [];
  }

  setNewGenTitleText(newGeneration: string) {
    switch (newGeneration) {
      case '1':
        this.actualGen = this.availableGens[0][1];
        break;
      case '5':
        this.actualGen = this.availableGens[1][1];
        break;
      case '6':
        this.actualGen = this.availableGens[2][1];
        break;

      default:
        this.actualGen = 'Gen ?';
        break;
    }
  }

  // filterPokemon(searchTerm: string) {
  //   if (!searchTerm) {
  //     this.isPopoverOpen = false;
  //   } else {
  //     this.pokemonService.searchPokemon(searchTerm).then((response: string | any[]) => {
  //       const filteredList: any[] = [];
  //       for (const pokemon of response) {
  //         this.pokemonService.getPokemonByName(pokemon.name).then((pokemonInfo: any) => {
  //           TypedData.setPokemonData(pokemonInfo).then((pokemonData: any) => {
  //             filteredList.push(pokemonData);
  //             filteredList.sort((a, b) => a.id - b.id);
  //           });
  //         });
  //       }
  //       this.filteredSearch = filteredList;
  //       this.filteredSearch.sort((a, b) => a.id - b.id);

  //       if (response.length > 0) {
  //         this.isPopoverOpen = true;
  //       }
  //     });
  //   }
  // }

  // importPokemonTypeFromPopover(pokemon: Pokemon) {
  //   this.popover.dismiss();

  //   this.fillPokemonTypes(pokemon);
  //   this.getPokemonTypeDamages();
  // }

  // fillPokemonTypes(pokemon: Pokemon) {
  //   if (
  //     pokemon.pastTypes.length > 0 &&
  //     pokemon.pastTypes[0].generation.id >= parseInt(this.generation, 10)
  //   ) {
  //     this.type1 = pokemon.pastTypes[0].types[0] ? pokemon.pastTypes[0].types[0].type.name : '';
  //     this.type2 = pokemon.pastTypes[0].types[1] ? pokemon.pastTypes[0].types[1].type.name : '';
  //   } else {
  //     this.type1 = pokemon.types[0] ? pokemon.types[0].type.name : '';
  //     this.type2 = pokemon.types[1] ? pokemon.types[1].type.name : '';
  //   }
  // }

  getData() {
    const array = [
      // this.pokemonService.pokemonInfo,
      // this.pokemonService.pokemonSpeciesInfo,
      this.pokemonService.typesInfo
    ];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < array.length; i++) {
      const theJSON = JSON.stringify(array[i]);
      const uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(theJSON);
      const a = document.createElement('a');
      a.href = uri;
      a.innerHTML = `Right-click and choose save as...`;
      document.getElementById('selector')?.appendChild(a);
      document.getElementById('selector')?.appendChild(document.createElement('br'));
    }
  }
}
