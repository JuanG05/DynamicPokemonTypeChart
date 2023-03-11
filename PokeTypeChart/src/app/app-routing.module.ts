import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'type-chart',
    loadChildren: () =>
      import('./pages/type-chart/type-chart.module').then((m) => m.TypeChartPageModule)
  },
  {
    path: '',
    redirectTo: 'type-chart',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
