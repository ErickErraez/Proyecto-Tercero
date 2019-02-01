import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: String = '';
  lastName: String = '';
  gender: String = '';
  birthdate: Date;
  email: String = '';
  busy: Promise<any>;

  constructor(public router: Router, public authDataServise: AuthService) { }

  ngOnInit() {
    this.name = '';
    this.lastName = '';
    this.gender = '';
    this.email = '';
  }

  registrar() {
    if (this.name === '' || this.lastName === '' || this.gender === '' || this.email === '') {
      swal({
        title: 'Datos Incompletos',
        text: 'Completar todos los datos',
        icon: 'error',
      });
    } else {
      // tslint:disable-next-line:max-line-length
      this.busy = this.authDataServise.register(this.name, this.lastName, this.gender, this.birthdate, this.email).then(r => {
        swal({
          title: 'Te damos la bienvenida',
          text: 'Enviamos tu contraseña a tu correo',
          icon: 'success',
        })
          .then(response => {
            this.name = '';
            this.email = '';
            this.router.navigate(['/login']);
          });
      }).catch(e => {
        console.log(e);
      });
    }
  }

}
