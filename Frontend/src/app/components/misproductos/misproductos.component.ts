import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { UsuarioInterface2 } from "../../models/user-interface";
import { ProductoInterface2 } from "../../models/user-interface";


@Component({
  selector: 'app-misproductos',
  templateUrl: './misproductos.component.html',
  styleUrls: ['./misproductos.component.css']
})
export class MisproductosComponent implements OnInit {

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

      this.crudService.GetProductsInformation(this.Usuarios[0].id).subscribe((res:ProductoInterface2[])=>{
        this.Productos = res;
        //console.log(this.Usuarios[0].C2);
      })
      
    })
  }
  id:string="";
  Usuarios:UsuarioInterface2[] = [];
  Productos:ProductoInterface2[] = [];

  CerrarSesion(){
    this.crudService.logout();
  }
}
