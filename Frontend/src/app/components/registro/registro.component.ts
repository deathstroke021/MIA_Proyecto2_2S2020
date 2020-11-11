import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { UsuarioInterface } from "../../models/user-interface";
import { PaisInterface } from "../../models/user-interface";
import { BitacoraInterface} from "../../models/user-interface";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(public registroservice:UserService) { }

  ngOnInit(): void {
    this.registroservice.GetPais().subscribe((res:PaisInterface[])=>{
      this.Paises = res;
      //console.log(this.Usuarios[0].C2);
    })
  }

  id: string="";
  nombre: string="";
  apellido: string="";
  correo: string="";
  password: string="";
  cpassword: string="";
  fecha: string="";
  credito: string="10000";
  foto: string="";
  idpais: string="";
  idestadou: string="2";
  idtipou: string="2";

  Usuarios:UsuarioInterface[] = [];
  Paises:PaisInterface[] = [];
  Bita:BitacoraInterface[] = [];

  registrarUsuario(){
    if(this.foto==""){
      var nombre = "default.png"
    }else{
      var res = this.foto.split("\\");
      var nombre = res[2];
    }
    
    if(this.password == this.cpassword){
      this.registroservice.VerificarCorreo(this.correo).subscribe();
      this.registroservice.registro(this.nombre,this.apellido,this.correo,this.password,this.fecha,this.credito,nombre,this.idpais,this.idestadou,this.idtipou)
    .subscribe((res:UsuarioInterface[])=>{
      this.Usuarios = res;
      //console.log(this.username,this.firstname,this.lastname);
      this.nombre="";
      this.apellido="";
      this.correo="";
      this.password="";
      this.cpassword="";
      this.fecha="";
      this.foto="";
      this.idpais="";

    })

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    this.registroservice.Bitacora(this.correo,"Registro de una cuenta",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })

    }else{
      console.log("La contraseña no coincide");
      //console.log(nombre)
      //console.log(this.idpais)
      console.log(this.fecha)
    }
    

  }

}
