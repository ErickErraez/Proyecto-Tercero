import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/CRUD/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public pushRightClass: string;
  user: any;
  userSearched: String;
  personReturned: any = [];

  constructor(private modalService: NgbModal, public router: Router, private userServices: UserService) {
    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
    this.userSearched = '';
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }
  searchPerson() {
    this.userServices.getName(this.userSearched).then(r => {
      this.personReturned = r;
      console.log(r);
    }).catch(e => {
      console.log(e);
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  open(content) {
    this.searchPerson();
    this.modalService.open(content).result.then((result => {
      if (result === 'save') {

      }
    }), (result => {

    }));
  }
}
