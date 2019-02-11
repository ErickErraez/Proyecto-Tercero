import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/CRUD/user.service';
import { Http } from '@angular/http';
import { User } from 'src/app/models/User';
import { Image } from 'src/app/models/Image';
import { Publication } from 'src/app/models/Publication';
import { PublicationService } from 'src/app/services/CRUD/publication.service';
import { ImageService } from 'src/app/services/CRUD/image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  user: User;
  view = false;
  image: Image;
  content: String;
  srcFoto = '../../../assets/images/user.png';
  listPublication: any = [];
  publication: Publication;

  constructor(private userService: UserService, private modalService: NgbModal, private http: Http,
    private publicationService: PublicationService, private imageService: ImageService) {
    this.image = new Image();
    this.user = new User();
    this.publication = new Publication;
    this.getPublication();
    this.getUser();
  }

  ngOnInit() {
    this.getProfilePicture();
  }


  getPublication() {
    this.publicationService.get().then(response => {
      this.listPublication = response;
    }).catch(error => {
      console.log(error);
    });
  }


  getUser() {
    const userSearched = JSON.parse(sessionStorage.getItem('user'));
    this.userService.get(userSearched.id).then(response => {
      this.user = response;
    }).catch(error => {

    });
  }

  publicate() {
    this.publication.content = this.content;
    this.publication.idUser = this.user.id;
    this.publicationService.post(this.publication).then(r => {
      swal({
        title: 'Datos Guardados',
        text: 'Publicacion realizada satisfactoriamente.',
        icon: 'success',
      });
      this.content = '';
      this.getPublication();
    }).catch(e => {
      console.log(e);
    });
  }

  CodificarArchivo(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image.name = file.name;
        this.image.type = file.type;
        this.image.attached = reader.result.toString().split(',')[1];
        this.srcFoto = 'data:' + this.image.type + ';base64,' + this.image.attached;
        this.savePicture();
      };
    }
  }

  getProfilePicture() {
    this.imageService.get().then(r => {
      this.srcFoto = 'data:' + r.type + ';base64,' + r.attached;
      sessionStorage.setItem('image', JSON.stringify(r));
    }).catch(e => {

    });
  }

  savePicture() {
    this.image.idAlbum = 1;
    this.image.idUser = this.user.id;
    this.imageService.post(this.image).then(r => {
      this.srcFoto = 'data:' + r.type + ';base64,' + r.attached;
      this.image.id = r.id;
      sessionStorage.setItem('image', JSON.stringify(this.image));
    }).catch(e => console.log(e));
  }
}
