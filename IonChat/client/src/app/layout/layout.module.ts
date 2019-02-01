import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NgbDropdownModule, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { EdadPipe } from '../pipes/edad.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
    imports: [CommonModule, LayoutRoutingModule, NgbDropdownModule, HttpModule, FormsModule, NgbModalModule],
    declarations: [LayoutComponent, NavbarComponent,
        EdadPipe, SidebarComponent],
    providers: [DatePipe],
})
export class LayoutModule { }
