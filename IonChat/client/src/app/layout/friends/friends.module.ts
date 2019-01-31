import { HttpModule } from '@angular/http';
import { AuthService } from './../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { UserService } from 'src/app/services/CRUD/user.service';

@NgModule({
  imports: [CommonModule, FriendsRoutingModule, FormsModule, HttpModule],
  declarations: [FriendsComponent],
  providers: [AuthService, UserService]
})
export class FriendsModule {}
