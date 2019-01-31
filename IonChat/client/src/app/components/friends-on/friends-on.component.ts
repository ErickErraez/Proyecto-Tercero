import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends-on',
  templateUrl: './friends-on.component.html',
  styleUrls: ['./friends-on.component.scss']
})
export class FriendsOnComponent implements OnInit {

  amigos: any = [];
  prueba: any = {};

  constructor() { 

    for(let index = 0; index < 18; index++){
      this.prueba.nombre = 'juan' + index;
      this.amigos.push(this.prueba);}
  }

  ngOnInit() {
  }

}
