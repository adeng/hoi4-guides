import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'countries',
        loadChildren: () => import('../countries/country-list/country-list.module').then(m => m.CountryListPageModule)
      },
      {
        path: 'divisions',
        loadChildren: () => import('../divisions/division-list/division-list.module').then(m => m.DivisionListPageModule)
      },
      {
        path: 'designer',
        loadChildren: () => import('../designs/design-list/design-list.module').then(m => m.DesignListPageModule)
      },
      {
        path: '',
        redirectTo: '/countries',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
