import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  amigos: any = [];
  prueba: any = {};

  constructor() {
    for (let index = 0; index < 18; index++) {
      this.prueba.nombre = 'amigo';
      this.prueba.mensajes = index;
      this.amigos.push(this.prueba);
    }
  }

  ngOnInit() {
  }

}
