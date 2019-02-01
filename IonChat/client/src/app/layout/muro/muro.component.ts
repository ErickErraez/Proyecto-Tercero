import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/services/CRUD/publication.service';
import { Publication } from 'src/app/models/Publication';
import { Http } from '@angular/http';
import swal from 'sweetalert';
import { UserService } from 'src/app/services/CRUD/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.scss']
})
export class MuroComponent implements OnInit {
  content: String;
  fecha: any;
  listPublication: any = [];
  listUsers: any = [];
  user: User;
  publication: Publication;
  x = JSON.parse(sessionStorage.getItem('user'));

  constructor(private publicationService: PublicationService, private userService: UserService,
    private http: Http, public router: Router, public authDataServise: AuthService) {
    this.publication = new Publication;
    this.fecha = new Date();
    this.getPublication();
  }

  ngOnInit() {
  }

  getUser(idUser?) {
    this.userService.get(idUser).then(response => {
      this.listUsers = response;
    }).catch(error => {
      console.log(error);
    });
  }

  publicar() {
    this.publication.content = this.content;
    this.publication.idUser = this.x.id;
    this.publication.date = this.fecha;
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

  getPublication() {
    this.publicationService.get().then(response => {
      this.getUser(response.idUser);
      this.listPublication = response;
    }).catch(error => {
      console.log(error);
    });
  }
}
