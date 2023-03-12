import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {Pokemon} from 'src/app/models/Pokemon';

@Component({
  selector: 'app-pokemon-search-popover',
  templateUrl: './pokemon-search-popover.component.html',
  styleUrls: ['./pokemon-search-popover.component.scss']
})
export class PokemonSearchPopoverComponent implements OnInit {
  @Input() filteredSearch: Pokemon[] | undefined;
  @Output() selectedPokemon = new EventEmitter<Pokemon>();

  constructor() {}

  ngOnInit() {}

  outputSelectedPokemon(pokemon: Pokemon) {
    this.selectedPokemon.emit(pokemon);
  }
}
