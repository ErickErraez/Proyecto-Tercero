import { HttpModule } from '@angular/http';
import { AuthService } from './../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserprofileRoutingModule } from './userprofile-routing.module';
import { UserprofileComponent } from './userprofile.component';
import { UserService } from 'src/app/services/CRUD/user.service';

@NgModule({
  imports: [CommonModule, UserprofileRoutingModule, FormsModule, HttpModule],
  declarations: [UserprofileComponent],
  providers: [AuthService, UserService]
})
export class UserprofileModule {}
