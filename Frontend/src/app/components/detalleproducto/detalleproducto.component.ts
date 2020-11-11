import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { UsuarioInterface2 } from "../../models/user-interface";
import { ProductoInterface2 } from "../../models/user-interface";
import { PalabraInterface } from "../../models/user-interface";
import { ComentarioInterface } from "../../models/user-interface";
import { ComentarioMostrarInterface } from "../../models/user-interface";
import { FeedbackInterface } from "../../models/user-interface";
import { FeedbackMostrarInterface } from "../../models/user-interface";
import { CarritoInterface } from "../../models/user-interface";
import { BitacoraInterface} from "../../models/user-interface";

@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.component.html',
  styleUrls: ['./detalleproducto.component.css']
})
export class DetalleproductoComponent implements OnInit {

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

    this.crudService.GetDetalle(idproductCurrent).subscribe((res:ProductoInterface2[])=>{
      this.Productos = res;
      //console.log(this.Usuarios[0].C2);
    })

    this.crudService.GetDetalleWords(idproductCurrent).subscribe((res:PalabraInterface[])=>{
      this.Palabra = res;
      //console.log(this.Usuarios[0].C2);
    })

    this.crudService.GetComents(idproductCurrent).subscribe((res:ComentarioMostrarInterface[])=>{
      this.ComentariosVer = res;
      //console.log(this.Usuarios[0].C2);
    })

    this.crudService.Getlikes(idproductCurrent).subscribe((res:FeedbackMostrarInterface[])=>{
      this.CantidadLikes = res;
      //console.log(this.Usuarios[0].C2);
    })

    this.crudService.Getdislikes(idproductCurrent).subscribe((res:FeedbackMostrarInterface[])=>{
      this.CantidadDislikes = res;
      //console.log(this.Usuarios[0].C2);
    })


  }

  id:string="";
  idproducto:string="";
  textcomentario:string="";
  correo:string="";
  estado:string="";
  cantidad:string="1";
  Usuarios:UsuarioInterface2[] = [];
  Productos:ProductoInterface2[] = [];
  Palabra:PalabraInterface[] = [];
  Comentarios:ComentarioInterface[] = [];
  ComentariosVer:ComentarioMostrarInterface[] = [];
  Likes:FeedbackInterface[] = [];
  CantidadLikes:FeedbackMostrarInterface[] = [];
  CantidadDislikes:FeedbackMostrarInterface[] = [];
  Carritos:CarritoInterface[] = [];
  Bita:BitacoraInterface[] = [];

  CerrarSesion(){
    this.crudService.logout();
  }

  Comentar(){

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();


    this.crudService.InsertComentario(this.textcomentario,fecha,this.id,this.idproducto)
    .subscribe((res:ComentarioInterface[])=>{
      this.Comentarios = res;
      //console.log(this.username,this.firstname,this.lastname);
      this.textcomentario="";

    })

    this.crudService.Bitacora(this.correo,"Comentario en una publicacion",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })

    location.reload();

  }

  Denunciar(){
    this.router.navigate(["/denuncia"]);
  }

  Like(){
    this.estado="like";
    this.crudService.InsertFeedback(this.id,this.idproducto,this.estado)
    .subscribe((res:FeedbackInterface[])=>{
      this.Likes = res;
      //console.log(this.username,this.firstname,this.lastname);

    })
    location.reload();
  }

  Dislike(){

    this.estado="dislike";
    this.crudService.InsertFeedback(this.id,this.idproducto,this.estado)
    .subscribe((res:FeedbackInterface[])=>{
      this.Likes = res;
      //console.log(this.username,this.firstname,this.lastname);

    })
    location.reload();
  }

  Agregar(){
    this.crudService.InsertProduct(this.id,this.idproducto,this.cantidad)
    .subscribe((res:CarritoInterface[])=>{
      this.Carritos = res;
      //console.log(this.username,this.firstname,this.lastname);

    })

  }
}
