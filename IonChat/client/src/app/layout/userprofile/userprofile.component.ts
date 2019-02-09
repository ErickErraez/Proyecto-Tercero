import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/CRUD/user.service';
import { Http } from '@angular/http';
import { User } from 'src/app/models/User';
import { Image } from 'src/app/models/Image';
import { Publication } from 'src/app/models/Publication';
import { PublicationService } from 'src/app/services/CRUD/publication.service';
import { ImageService } from 'src/app/services/CRUD/image.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  user: User;
  image: Image;
  content: String;
  srcFoto = '../../../assets/images/user.png';
  listPublication: any = [];
  publication: Publication;

  constructor(private userService: UserService, private http: Http, private publicationService: PublicationService,
    private imageService: ImageService) {
    this.getUser();
    this.image = new Image();
    this.publication = new Publication;
    this.getPublication();
    this.getProfilePicture();
  }

  ngOnInit() {
  }

  getPublication() {
    this.publicationService.get().then(response => {
      this.listPublication = response;
    }).catch(error => {
      console.log(error);
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
        this.saveImage();
      };
    }
  }
  getUser() {
    const userSearched = JSON.parse(sessionStorage.getItem('user'));
    this.userService.get(userSearched.id).then(response => {
      this.user = response;
    }).catch(error => {

    });
  }

  saveImage() {
    if (this.srcFoto === '../../../assets/images/user.png') {
      return;
    }
    if (this.image.id === 0) {
      this.image.idAlbum = 1;
      this.image.description = 'Foto Perfil';
      this.imageService.postProfile(this.image).then(r => {
        this.srcFoto = 'data:' + r.type + ';base64,' + r.attached;
        this.image.id = r.id;
        sessionStorage.setItem('profilePicture', JSON.stringify(this.image));
      }).catch(e => console.log(e));
    } else {
      this.actualizarFoto();
    }
  }

  getProfilePicture() {
    if (JSON.parse(sessionStorage.getItem('profilePicture')) !== null) {
      this.image = JSON.parse(sessionStorage.getItem('profilePicture')) as Image;
      this.srcFoto = 'data:' + this.image.type + ';base64,' + this.image.attached;
    } else {
      this.image.id = 0;
    }
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

  actualizarFoto() {
    this.imageService.put(this.image).then(r => {
      sessionStorage.setItem('profilePicture', JSON.stringify(this.image));
      this.srcFoto = 'data:' + r.type + ';base64,' + r.attached;
    }).catch(e => console.log(e));
  }

}
