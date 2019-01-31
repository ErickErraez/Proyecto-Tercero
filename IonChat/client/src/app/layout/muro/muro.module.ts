import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MuroRoutingModule } from './muro-routing.module';
import { FormsModule } from '@angular/forms';
import { MuroComponent } from './muro.component';

@NgModule({
  imports: [CommonModule, MuroRoutingModule, FormsModule],
  declarations: [MuroComponent]
})
export class MuroModule {}
