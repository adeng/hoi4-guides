import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'divisions',
    pathMatch: 'full'
  },
  {
    path: 'countries',
    loadChildren: () => import('./pages/countries/country-list/country-list.module').then( m => m.CountryListPageModule)
  },
  {
    path: 'divisions',
    loadChildren: () => import('./pages/divisions/division-home/division-home.module').then( m => m.DivisionHomePageModule)
  },
  {
    path: 'divisions/all',
    loadChildren: () => import('./pages/divisions/division-list/division-list.module').then( m => m.DivisionListPageModule)
  },
  // {
  //   path: 'divisions/:type',
  //   loadChildren: () => import('./pages/divisions/division-type-list/division-type-list.module').then( m => m.DivisionTypeListPageModule)
  // },
  // {
  //   path: 'divisions/:type/:id',
  //   loadChildren: () => import('./pages/divisions/division-detail/division-detail.module').then( m => m.DivisionDetailPageModule)
  // },
  {
    path: 'designer',
    loadChildren: () => import('./pages/designs/design-list/design-list-routing.module').then( m => m.DesignListPageRoutingModule)
  },
  {
    path: 'divisions/designer',
    loadChildren: () => import('./pages/divisions/division-designer/division-designer.module').then( m => m.DivisionDesignerPageModule)
  },
  {
    path: 'divisions/designer/:id',
    loadChildren: () => import('./pages/divisions/division-designer/division-designer.module').then( m => m.DivisionDesignerPageModule)
  },
  {
    path: 'choose-equipment',
    loadChildren: () => import('./components/choose-equipment/choose-equipment.module').then( m => m.ChooseEquipmentPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
