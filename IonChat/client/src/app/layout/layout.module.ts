import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpModule } from '@angular/http';


@NgModule({
    imports: [CommonModule, LayoutRoutingModule, NgbDropdownModule, FormsModule, HttpModule],
    declarations: [LayoutComponent, NavbarComponent, SidebarComponent, ChatComponent, NotFoundComponent]
})
export class LayoutModule { }
