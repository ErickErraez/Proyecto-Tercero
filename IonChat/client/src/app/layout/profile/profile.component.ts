import { UserService } from './../../services/CRUD/user.service';
import { User } from './../../models/User';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  cambiandoClaves = false;
  clavesCoinciden = false;
  clave: String = '';
  claveConfirm: String = '';

  constructor(public authDataServise: AuthService, public router: Router) {
  }

  ngOnInit() {

  }



  verificarCambioClaves() {
    if (this.clave.length !== 0 || this.claveConfirm.length !== 0) {
      this.cambiandoClaves = true;
    } else {
      this.cambiandoClaves = false;
    }
    if (this.clave === this.claveConfirm) {
      this.clavesCoinciden = true;
    } else {
      this.clavesCoinciden = false;
    }
  }
  actualizarClave() {
    this.authDataServise.password_change(this.clave).then(r => {
      swal({
        title: 'Datos Guardados',
        text: 'Datos guardados satisfactoriamente. Cierre sesión y utilice su nueva contraseña',
        icon: 'success',
      });

      this.router.navigate(['/login']);
    }).catch(e => {
      console.log(e);
    });
  }
}
