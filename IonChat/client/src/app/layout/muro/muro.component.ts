import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/services/CRUD/publication.service';
import { Publication } from 'src/app/models/Publication';
import { Http } from '@angular/http';

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.scss']
})
export class MuroComponent implements OnInit {
  content: String;
  publication: Publication;
  constructor(private publicationService: PublicationService, private http: Http) {
    this.publication = new Publication;
  }

  ngOnInit() {

  }

  publicar() {
    // tslint:disable-next-line:max-line-length
    const fecha_utc = new Date(1999, 10, 30);
    this.publication.content = this.content;
    this.publication.date = fecha_utc;
    this.publicationService.post(this.publication).then(response => {
      swal({
        title: 'Has realizado una publicacion',
        text: 'Correcto',
        icon: 'success',
      }).then(r => {
        this.getPublication();
      });
    }).catch();

  }

  getPublication() {
    this.publicationService.get().then(response => {
      console.log(response);
    }).catch(error => {

    });
  }

}
