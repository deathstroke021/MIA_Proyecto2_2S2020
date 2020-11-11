import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { UsuarioInterface2 } from "../../models/user-interface";
import { CategoriaInterface } from "../../models/user-interface";
import { ProductoInterface } from "../../models/user-interface";
import { ProductoInterface2 } from "../../models/user-interface";
import { PalabraInterface } from "../../models/user-interface";
import { BitacoraInterface} from "../../models/user-interface";


@Component({
  selector: 'app-prodcuto',
  templateUrl: './prodcuto.component.html',
  styleUrls: ['./prodcuto.component.css']
})
export class ProdcutoComponent implements OnInit {

  constructor(public crudService:UserService, public router:Router) { }

  ngOnInit(): void {
    let userCurrent = localStorage.getItem("usuriologueado");
    let user_json = JSON.parse(userCurrent)
    let correouser = user_json.correo;
    //console.log(userCurrent);
    console.log(correouser);
    this.correo=correouser

    this.crudService.GetInformation(correouser).subscribe((res:UsuarioInterface2[])=>{
      this.Usuarios = res;
      //console.log(this.Usuarios[0].C2);
      //this.foto = this.Usuarios[0].foto;
      this.id = this.Usuarios[0].id;
      console.log(this.Usuarios[0].id)

      this.crudService.GetProductsInformation(this.Usuarios[0].id).subscribe((res:ProductoInterface2[])=>{
        this.Productosver = res;
        //console.log(this.Usuarios[0].C2);
      })
      
    })

    this.crudService.GetCategoria().subscribe((res:CategoriaInterface[])=>{
      this.Categoria = res;
      //console.log(this.Usuarios[0].C2);
    })

    
  }

  id:string="";
  correo:string="";
  nombre: string="";
  descripcion: string="";
  precio: string="";
  idcategoria: string="";
  foto: string="";
  idestado: string ="1"
  idproducto: string = ""
  palabra: string = ""

  Usuarios:UsuarioInterface2[] = [];
  Categoria:CategoriaInterface[] = [];
  Productos:ProductoInterface[] = [];
  Bita:BitacoraInterface[] = [];
  Productosver:ProductoInterface2[] = [];
  Palabra:PalabraInterface[] = [];

  CerrarSesion(){
    this.crudService.logout();
  }

  PublicarProducto(){

    var res = this.foto.split("\\");
    var nombre = res[2];

    this.crudService.registroproducto(this.nombre,this.descripcion,this.precio,this.id,this.idcategoria,this.idestado,nombre)
    .subscribe((res:ProductoInterface[])=>{
      this.Productos = res;
      //console.log(this.username,this.firstname,this.lastname);
      this.nombre="";
      this.descripcion="";
      this.precio="";
      this.foto="";


    })

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    this.crudService.Bitacora(this.correo,"Publicacion de un producto",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })

    location.reload();

  }

  Agregartag(){

    this.crudService.InsertWord(this.palabra,this.idproducto)
    .subscribe((res:PalabraInterface[])=>{
      this.Palabra = res;
      //console.log(this.username,this.firstname,this.lastname);
      this.palabra="";

    })

  }

}
