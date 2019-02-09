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
  name: String = '';
  user: User;
  passchange = false;
  lastName: String = '';
  gender: String = '';
  birthdate: Date;
  email: String = '';
  cambiandoClaves = false;
  clavesCoinciden = false;
  clave: String = '';
  claveConfirm: String = '';

  constructor(public authDataServise: AuthService, public router: Router, private userService: UserService) {

    this.getUser();
  }

  ngOnInit() {

  }

  getUser() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userService.get(this.user.id).then(r => {
      this.name = r.name;
      this.lastName = r.lastName;
      this.email = r.email;
      this.birthdate = r.birthdate;
    }).catch(e => {

    });
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

  guardar() {
    this.user.name = this.name;
    this.user.lastName = this.lastName;
    this.user.birthdate = this.birthdate;
    sessionStorage.setItem('user', JSON.stringify(this.user));
    this.userService.put(this.user).then(r => {
      if (this.cambiandoClaves && this.clavesCoinciden) {
        this.actualizarClave();
      } else {
        swal({
          title: 'Datos Guardados',
          text: 'Datos guardados satisfactoriamente.',
          icon: 'success',
        });
      }
    }).catch(e => {

    });
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
