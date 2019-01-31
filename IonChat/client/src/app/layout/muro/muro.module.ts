import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MuroRoutingModule } from './muro-routing.module';
import { MuroComponent } from './muro.component';
import { FriendsOnComponent} from '../../components/friends-on/friends-on.component';

@NgModule({
  imports: [CommonModule, MuroRoutingModule],
  declarations: [MuroComponent,FriendsOnComponent]
})
export class MuroModule {}
