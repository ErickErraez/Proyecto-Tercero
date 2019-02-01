import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  fotoNombre: string;
  fotoType: string;
  fotoFile: string;
  srcFoto: string;

  constructor() {
    this.getFotoPerfil();
   }

  ngOnInit() {
  }

  CodificarArchivo(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fotoNombre = file.name;
        this.fotoType = file.type;
      //  this.fotoFile = reader.result.split(',')[1];
        this.srcFoto = 'data:' + this.fotoType + ';base64,' + this.fotoFile;
      };
    }
  }

  getFotoPerfil() {
    this.srcFoto = '../../../assets/images/user.png';
    /*this.busy = this.fotoPerfilDataService.getFiltrado('idPersona', 'coincide', this.personaLogeada.id.toString())
      .then(respuesta => {
        if (JSON.stringify(respuesta) == '[0]') {
          return;
        }
        this.fotoFile = respuesta[0].adjunto;
        this.fotoNombre = respuesta[0].nombreArchivo;
        this.fotoType = respuesta[0].tipoArchivo;
        this.srcFoto = 'data:' + this.fotoType + ';base64,' + this.fotoFile;
      })
      .catch(error => {
        this.toastr.warning('Se produjo un error', 'Actualización');
      });*/
  }

}
