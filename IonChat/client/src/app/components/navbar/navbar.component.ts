import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/CRUD/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FriendService } from 'src/app/services/CRUD/friend.service';
import { Friend } from 'src/app/models/Friend';
import { Image } from 'src/app/models/Image';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public pushRightClass: string;
  user: any;
  srcFoto = '../../../assets/images/user.png';
  friend: Friend;
  userSearched: String;
  personReturned: any = [];

  constructor(private modalService: NgbModal, public router: Router, private userServices: UserService,
    private friendService: FriendService) {
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

      console.log(result);
    }), (result => {

    }));
  }
  acceptFriend() {

  }
  cancelFriend() {

  }
  sendFriendRequest(idUser) {
    this.friend.idUser = idUser;
    this.friend.idFriend = this.user.id;
    this.friendService.post(this.friend).then(r => {

    }).catch(e => {

    });
  }

  refreshUser(): Boolean {
    if (JSON.parse(sessionStorage.getItem('user')) !== null) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
    if (JSON.parse(sessionStorage.getItem('profilePicture')) !== null) {
      const profilePicture = JSON.parse(sessionStorage.getItem('profilePicture')) as Image;
      this.srcFoto = 'data:' + profilePicture.type + ';base64,' + profilePicture.attached;
    }
    return true;
  }
}
