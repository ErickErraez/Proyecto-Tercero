import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/CRUD/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FriendService } from 'src/app/services/CRUD/friend.service';
import { Friend } from 'src/app/models/Friend';
import { Image } from 'src/app/models/Image';
import { ImageService } from 'src/app/services/CRUD/image.service';
import { User } from 'src/app/models/User';
import { MessageService } from 'src/app/services/CRUD/message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public pushRightClass: string;
  user: User;
  viewMesaje = false;
  srcFoto = '../../../assets/images/user.png';
  friend: Friend;
  isRequest = false;
  userSearched: String;
  personReturned: any = [];
  sendFriends: any;
  conversation: any[];
  friendAcept: any;
  friendsGets: any = [];
  nameFriends: any = [];
  acceptRequest = false;
  pictureFriend: any;
  picture: any = [];
  request: any;
  pictureReturned: any = [];


  constructor(private modalService: NgbModal, public router: Router, private userServices: UserService,
    private friendService: FriendService, private imageService: ImageService, private messageServices: MessageService) {
    this.friend = new Friend();
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
    this.getFriends();
    this.getName();
    this.getProfilePicture();
    this.getFriendPicture();
    this.getMesajes();
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
    }).catch(e => {
      console.log(e);
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getMesajes() {
    this.messageServices.get().then(r => {
      this.conversation = r;
    }).catch(e => {

    });

  }

  open(content) {
    this.searchPerson();
    this.modalService.open(content).result.then((result => {

      console.log(result);
    }), (result => {

    }));
  }

  acceptFriend(idFriend) {
    this.friend.idFriend = this.user.id;
    this.friend.idUser = idFriend;
    this.friend.idState = 2;
    this.friendService.post(this.friend).then(r => {
      swal({
        title: 'Solicitud Aceptada',
        icon: 'success',
      });

      this.acceptRequest = true;
    })
      .catch(e => {
        console.log(e, 'error');
      });
  }

  cancelFriend(id) {
    swal({
      title: 'Solicitud Rechazada',
      icon: 'success',
    });
    this.acceptRequest = true;

  }


  sendFriendRequest(idUser) {
    this.friend.idUser = idUser;
    this.friend.idFriend = this.user.id;
    this.friend.idState = 2;
    this.friendService.post(this.friend).then(r => {
      this.friendAcept = r;
      swal({
        title: 'Solicitud Enviada Correctamente',
        icon: 'success',
      });
      this.isRequest = true;
      this.request = this.friendAcept;
    }).catch(e => {
      console.log(e);
    });
  }

  getProfilePicture() {
    this.imageService.get(this.user.id).then(r => {
      if (r.error === 'Record not found.') {
        this.srcFoto = 'assets/images/user.png';
      } else {
        if (r.idAlbum === 1) {
          this.srcFoto = 'data:' + r.type + ';base64,' + r.attached;
          sessionStorage.setItem('image', JSON.stringify(r));
        }
      }
    }).catch(e => {

    });
  }

  refreshUser(): Boolean {
    if (JSON.parse(sessionStorage.getItem('user')) !== null) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
    if (JSON.parse(sessionStorage.getItem('image')) !== null) {
      const profilePicture = JSON.parse(sessionStorage.getItem('image')) as Image;
      this.srcFoto = 'data:' + profilePicture.type + ';base64,' + profilePicture.attached;
    }
    return true;
  }

  getFriends() {
    this.friendService.get().then(r => {
      this.friendsGets = r;
    })
      .catch(e => {

      });
  }

  getFriendPicture() {

    this.imageService.get().then(r => {
      this.pictureFriend = r;
      for (let i = 0; i < this.nameFriends.length; i++) {
        this.imageService.get(this.pictureFriend[i].idUser).then(response => {
          this.pictureReturned = 'data:' + response.type + ';base64,' + response.attached;
        }).catch(e => {

        });
      }
    }).catch(e => {

    });

  }

  getName() {
    this.userServices.get().then(r => {
      this.nameFriends = r;
    }).catch(e => {
      console.log('Error en traer nombres');
    });
  }
}
