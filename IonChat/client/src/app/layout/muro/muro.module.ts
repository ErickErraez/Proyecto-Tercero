import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MuroRoutingModule } from './muro-routing.module';
import { FormsModule } from '@angular/forms';
import { MuroComponent } from './muro.component';
import { FriendsOnComponent} from '../../components/friends-on/friends-on.component';

@NgModule({
<<<<<<< HEAD
  imports: [CommonModule, MuroRoutingModule, FormsModule],
  declarations: [MuroComponent]
=======
  imports: [CommonModule, MuroRoutingModule],
  declarations: [MuroComponent,FriendsOnComponent]
>>>>>>> e90c9365e259bced25b89ab05e0ab89ce80bc2c9
})
export class MuroModule {}
