import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { UsuarioInterface2 } from "../../models/user-interface";
import { DenunciaInterface } from "../../models/user-interface";
import { BitacoraInterface} from "../../models/user-interface";


@Component({
  selector: 'app-denuncia',
  templateUrl: './denuncia.component.html',
  styleUrls: ['./denuncia.component.css']
})
export class DenunciaComponent implements OnInit {

  constructor(public crudService:UserService, public router:Router) { }

  ngOnInit(): void {

    let userCurrent = localStorage.getItem("usuriologueado");
    let user_json = JSON.parse(userCurrent)
    let correouser = user_json.correo;
    //console.log(userCurrent);
    console.log(correouser);

    this.crudService.GetInformation(correouser).subscribe((res:UsuarioInterface2[])=>{
      this.Usuarios = res;
      //console.log(this.Usuarios[0].C2);
      //this.foto = this.Usuarios[0].foto;
      //this.nombre = "Marzy";
      //console.log(this.imagen)
      this.id=this.Usuarios[0].id;
      this.correo=this.Usuarios[0].correo;

    })

    let idproductCurrent = localStorage.getItem("detalleproducto");
    this.idproducto=idproductCurrent;
  }

  id:string="";
  idproducto:string="";
  textdenuncia:string="";
  correo:string="";
  Usuarios:UsuarioInterface2[] = [];
  Denuncias:DenunciaInterface[] = [];
  Bita:BitacoraInterface[] = [];

  CerrarSesion(){
    this.crudService.logout();
  }

  Denunciar(){

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();


    this.crudService.InsertDenuncia(this.textdenuncia,fecha,this.id,this.idproducto)
    .subscribe((res:DenunciaInterface[])=>{
      this.Denuncias = res;
      //console.log(this.username,this.firstname,this.lastname);
      this.textdenuncia="";

    })

    this.crudService.Bitacora(this.correo,"Denunciar una publicacion",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })

  }

}
