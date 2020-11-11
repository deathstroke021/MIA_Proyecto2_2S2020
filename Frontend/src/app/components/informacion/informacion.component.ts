import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { UsuarioInterface } from "../../models/user-interface";
import { PaisInterface } from "../../models/user-interface";
import { ModificarInterface } from "../../models/user-interface";
import { ModificarfotoInterface } from "../../models/user-interface";
import { BitacoraInterface} from "../../models/user-interface";


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  constructor(public crudService:UserService) { }

  ngOnInit(): void {
    this.crudService.GetPais().subscribe((res:PaisInterface[])=>{
      this.Paises = res;
      //console.log(this.Usuarios[0].C2);
      
    })

    let userCurrent = localStorage.getItem("usuriologueado");
    let user_json = JSON.parse(userCurrent)
    let correouser = user_json.correo;
    //console.log(userCurrent);
    console.log(correouser);

    this.crudService.GetInformation(correouser).subscribe((res:UsuarioInterface[])=>{
      this.Usuarios = res;
      //console.log(this.Usuarios[0].C2);
      this.nombre = this.Usuarios[0].nombre;
      this.apellido = this.Usuarios[0].apellido;
      this.fecha = this.Usuarios[0].fecha;
      this.password = this.Usuarios[0].password;
      this.correo = correouser;
      //this.foto = this.Usuarios[0].foto;
      //this.nombre = "Marzy";
      //console.log(this.imagen)
      
    })
    
  }

  nombre: string= "";
  apellido: string="";
  password: string="";
  fecha: string="";
  foto: string="";
  idpais: string="";
  correo: string="";

  Usuarios:UsuarioInterface[] = [];
  Paises:PaisInterface[] = [];
  Modificar:ModificarInterface[] = [];
  Modificarfoto:ModificarfotoInterface[] = [];
  Bita:BitacoraInterface[] = [];

  CerrarSesion(){
    this.crudService.logout();
  }

  modificarUsuario(){
    //console.log(this.correo);
    this.crudService.ModifyProfile(this.nombre,this.apellido,this.fecha,this.idpais,this.password,this.foto,this.correo)
    .subscribe((res:ModificarInterface[])=>{
      this.Modificar = res;
      //console.log(this.username,this.firstname,this.lastname)

    })

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    this.crudService.Bitacora(this.correo,"Modificacion de perfil",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })

  }

  modificarImagen(){

    var res = this.foto.split("\\");
    var nombre = res[2];

    this.crudService.ModifyPhoto(this.correo,nombre)
    .subscribe((res:ModificarfotoInterface[])=>{
      this.Modificarfoto = res;
      //console.log(this.username,this.firstname,this.lastname)

    })

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    this.crudService.Bitacora(this.correo,"Modificacion de perfil",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })

    location.reload();

  }

}
