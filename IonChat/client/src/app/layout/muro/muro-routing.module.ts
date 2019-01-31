import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MuroComponent } from './muro.component';

const routes: Routes = [
  {
    path: '',
    component: MuroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuroRoutingModule {}
