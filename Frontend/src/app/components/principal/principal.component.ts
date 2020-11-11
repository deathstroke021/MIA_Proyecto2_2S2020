import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { UsuarioInterface2 } from "../../models/user-interface";
import { CategoriaInterface } from "../../models/user-interface";
import { ProductoInterface2 } from "../../models/user-interface";
import { CarritoInterface } from "../../models/user-interface";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

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
      
    })

    this.crudService.GetCategoria().subscribe((res:CategoriaInterface[])=>{
      this.Categoria = res;
      //console.log(this.Usuarios[0].C2);
    })
  }

  id:string="";
  palabra:string="";
  idcategoria:string="";
  cantidad:string="1";
  Usuarios:UsuarioInterface2[] = [];
  Categoria:CategoriaInterface[] = [];
  Productos:ProductoInterface2[] = [];
  Carritos:CarritoInterface[] = [];

  VerPerfil(){
    this.router.navigate(["/informacion"]);
  }

  CerrarSesion(){
    this.crudService.logout();
  }

  publicar(){
    this.router.navigate(["/prodcuto"]);
  }

  MisProducts(){
    this.router.navigate(["/misproductos"]);
  }


  Mostrar(){
    if(this.palabra=="" && this.idcategoria=="" ){
      this.crudService.GetProducts(this.id).subscribe((res:ProductoInterface2[])=>{
        this.Productos = res;
        //console.log(this.Usuarios[0].C2);
        
      })
    }
    else if(this.idcategoria!=""){
      this.crudService.GetProductscategory(this.id+ "-" + this.idcategoria).subscribe((res:ProductoInterface2[])=>{
        this.Productos = res;
        //console.log(this.Usuarios[0].C2);
        
      })
      //this.idcategoria="";
    }

    else if(this.idcategoria=="" && this.palabra!=""){
      this.crudService.GetProductsword(this.id+ "-" + this.palabra).subscribe((res:ProductoInterface2[])=>{
        this.Productos = res;
        //console.log(this.Usuarios[0].C2);
        
      })
      //this.idcategoria="";
    }

  }


  ASC(){
    if(this.palabra=="" && this.idcategoria==""){
      this.crudService.GetProductsasc(this.id).subscribe((res:ProductoInterface2[])=>{
        this.Productos = res;
        //console.log(this.Usuarios[0].C2);
        
      })
    }
    else if(this.idcategoria!=""){
      this.crudService.GetProductscategoryasc(this.id+ "-" + this.idcategoria).subscribe((res:ProductoInterface2[])=>{
        this.Productos = res;
        //console.log(this.Usuarios[0].C2);
        
      })
      
    }

    else if(this.idcategoria=="" && this.palabra!=""){
      this.crudService.GetProductswordasc(this.id+ "-" + this.palabra).subscribe((res:ProductoInterface2[])=>{
        this.Productos = res;
        //console.log(this.Usuarios[0].C2);
        
      })
      //this.idcategoria="";
    }

  }

  DESC(){
    if(this.palabra=="" && this.idcategoria==""){
      this.crudService.GetProductsdesc(this.id).subscribe((res:ProductoInterface2[])=>{
        this.Productos = res;
        //console.log(this.Usuarios[0].C2);
        
      })
    }
    else if(this.idcategoria!=""){
      this.crudService.GetProductscategorydesc(this.id+ "-" + this.idcategoria).subscribe((res:ProductoInterface2[])=>{
        this.Productos = res;
        //console.log(this.Usuarios[0].C2);
        
      })
  
    }
    else if(this.idcategoria=="" && this.palabra!=""){
      this.crudService.GetProductsworddesc(this.id+ "-" + this.palabra).subscribe((res:ProductoInterface2[])=>{
        this.Productos = res;
        //console.log(this.Usuarios[0].C2);
        
      })
      //this.idcategoria="";
    }

  }

  detalle(id){

    this.router.navigate(["/detalleproducto"]);

    this.crudService.setCurrentProduct(id);

  }

  Carro(){

    this.router.navigate(["/carrito"]);

  }

  Agregar(idproducto){
    this.crudService.InsertProduct(this.id,idproducto,this.cantidad)
    .subscribe((res:CarritoInterface[])=>{
      this.Carritos = res;
      //console.log(this.username,this.firstname,this.lastname);

    })

  }

}
