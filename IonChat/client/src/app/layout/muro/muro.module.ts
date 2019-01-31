import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MuroRoutingModule } from './muro-routing.module';
import { MuroComponent } from './muro.component';

@NgModule({
  imports: [CommonModule, MuroRoutingModule],
  declarations: [MuroComponent]
})
export class MuroModule {}
