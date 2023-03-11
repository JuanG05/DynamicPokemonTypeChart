import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TypeChartPageRoutingModule} from './type-chart-routing.module';
import {TypeChartPage} from './type-chart.page';
import {PokemonSearchPopoverComponent} from 'src/app/components/pokemon-search-popover/pokemon-search-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TypeChartPageRoutingModule
  ],
  declarations: [TypeChartPage, PokemonSearchPopoverComponent]
})
export class TypeChartPageModule {}
