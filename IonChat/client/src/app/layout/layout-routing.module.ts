import { Friend } from './../models/Friend';
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
            path: 'userprofile',
            loadChildren: './userprofile/userprofile.module#UserprofileModule'
          },
          {
            path: 'blank',
            loadChildren: './blank-page/blank-page.module#BlankPageModule'
          },
          {
            path: 'muro',
            loadChildren: './muro/muro.module#MuroModule'
          },
          {
          path: 'friends',
          loadChildren: './friends/friends.module#FriendsModule'
          }
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
