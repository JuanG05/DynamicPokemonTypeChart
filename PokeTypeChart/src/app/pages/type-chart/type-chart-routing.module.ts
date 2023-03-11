import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeChartPage } from './type-chart.page';

const routes: Routes = [
  {
    path: '',
    component: TypeChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeChartPageRoutingModule {}
