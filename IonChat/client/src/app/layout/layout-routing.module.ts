import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'muro'
          },
          {
            path: 'main',
            loadChildren: './main/main.module#MainModule'
          },
          {
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule'
          },
          {
            path: 'blank',
            loadChildren: './blank-page/blank-page.module#BlankPageModule'
          },
          {
            path: 'board',
            loadChildren: './board/board.module#BoardModule'
          },
          {
            path: 'muro',
            loadChildren: './muro/muro.module#MuroModule'
          },
          {
            path: '**',
            redirectTo: 'muro'
          }
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
