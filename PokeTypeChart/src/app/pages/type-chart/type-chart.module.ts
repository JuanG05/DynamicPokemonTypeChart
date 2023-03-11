import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeChartPageRoutingModule } from './type-chart-routing.module';

import { TypeChartPage } from './type-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeChartPageRoutingModule
  ],
  declarations: [TypeChartPage]
})
export class TypeChartPageModule {}
