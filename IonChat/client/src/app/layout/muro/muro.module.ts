import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MuroRoutingModule } from './muro-routing.module';
import { FormsModule } from '@angular/forms';
import { MuroComponent } from './muro.component';
import { FriendsOnComponent } from '../../components/friends-on/friends-on.component';
import { ChatComponent } from '../chat/chat.component';

@NgModule({
  imports: [CommonModule, MuroRoutingModule, FormsModule],
  declarations: [MuroComponent, FriendsOnComponent, ChatComponent]
})
export class MuroModule {}
