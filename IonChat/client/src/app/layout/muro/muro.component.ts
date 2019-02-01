import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/services/CRUD/publication.service';
import { Publication } from 'src/app/models/Publication';
import { Http } from '@angular/http';
import { UserService } from 'src/app/services/CRUD/user.service';

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.scss']
})
export class MuroComponent implements OnInit {
  content: String;
  fecha: any;
  publication: Publication;
  // tslint:disable-next-line:max-line-length
  constructor(private publicationService: PublicationService, private userService: UserService, private http: Http, public router: Router, public authDataServise: AuthService) {
    this.publication = new Publication;
  }

  ngOnInit() {

  }

  publicar() {
    // tslint:disable-next-line:max-line-length
    const x = JSON.parse(sessionStorage.getItem('user'));
    this.publication.content = this.content;
    this.publication.idUser = x.id;
    this.publicationService.post(this.publication).then(r => {
      console.log(r);
    }).catch(e => {
      console.log(e);
    });
  }

  getPublication() {
    this.publicationService.get().then(response => {
      console.log(response);
    }).catch(error => {

    });
  }
}
