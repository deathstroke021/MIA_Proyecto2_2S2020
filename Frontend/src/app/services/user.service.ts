import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import {map} from "rxjs/operators";
import { UserInterface } from '../models/user-interface';
import { Router } from "@angular/router";
//import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  headers: HttpHeaders= new HttpHeaders({
    "Content-Type": "application/json"
  })

  GetUsers(){
    const url = "http://localhost:3000/getUsers";
    return this.http.get(url);
  }

  InsertUser(C2: string){
    const url = "http://localhost:3000/addUser";
    return this.http.post(url,
      {
        "C2":C2,
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  UpdateUser(C1:string,C2:string){
    const url = "http://localhost:3000/updateUser";
    return this.http.put(url,
      {
        "C1":C1,
        "C2":C2,
      },
      {headers: this.headers}).pipe(map(data => data ));
  }


  DeleteUser(C1){
    const url = "http://localhost:3000/deleteUsers/" + C1;
    return this.http.delete(url).pipe(map(data => data ));
  }

  //login
  /*Login(C2){
    const url = "http://localhost:3000/signUp";
    return this.http.post(url,
      {
        "C2":C2,
      },
      {headers: this.headers}).pipe(map(data => data ));

  }*/
  Login(correo,password){
    const url = "http://localhost:3000/signUp";
    return this.http.post(url,
      {
        "correo":correo,
        "password":password
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  //set current user
  setCurrentUser(user:UserInterface){
    let user_string = JSON.stringify(user);
    localStorage.setItem("usuriologueado",user_string);

  }

  //get current user
  getCurrentUser(){
    let userCurrent = localStorage.getItem("usuriologueado");
    if(userCurrent != null){
      let user_json = JSON.parse(userCurrent);
      return user_json;

    }else{
      return null
    }
  }

  //logout
  logout(){
    localStorage.removeItem("usuriologueado");
    this.router.navigate(["/login"]);
  }

  //Registro usuarios
  registro(nombre: string,apellido: string,correo: string,password: string,fecha: string,credito: string,foto: string,idpais: string,idestadou: string,idtipou: string){
    const url = "http://localhost:3000/registro";
    return this.http.post(url,
      {
        "nombre":nombre,
        "apellido":apellido,
        "correo":correo,
        "password":password,
        "fecha":fecha,
        "credito":credito,
        "foto":foto,
        "idpais":idpais,
        "idestadou":idestadou,
        "idtipou":idtipou
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  GetPais(){
    const url = "http://localhost:3000/pais";
    return this.http.get(url);
  }

  VerificarCorreo(correo){
    const url = "http://localhost:3000/verificarcorreo/" + correo;
    return this.http.get(url,{headers: this.headers}).pipe(map(data => data ));
  }

  PasswordCorreo(correo: string){
    const url = "http://localhost:3000/recuperarpassword/" + correo;
    return this.http.get(url,{headers: this.headers}).pipe(map(data => data ));
  }

  VerificarCount(correo:string){
    const url = "http://localhost:3000/verificarcuenta/"+ correo;
    return this.http.put(url,{headers: this.headers}).pipe(map(data => data ));
  }

  Password(correo:string,password:string){
    const url = "http://localhost:3000/restablecerpassword";
    return this.http.put(url,
      {
        "correo":correo,
        "password":password,
      },
      {headers: this.headers}).pipe(map(data => data ));
  }

  GetInformation(correo:string){
    const url = "http://localhost:3000/perfil/" + correo;
    return this.http.get(url);
  }

  ModifyProfile(nombre:string,apellido:string,fecha:string,idpais:string,password:string,foto:string,correo:string){
    const url = "http://localhost:3000/modificarperfil";
    return this.http.put(url,
      {
        "nombre":nombre,
        "apellido":apellido,
        "fecha":fecha,
        "idpais":idpais,
        "password":password,
        "foto":foto,
        "correo":correo,
      },
      {headers: this.headers}).pipe(map(data => data ));
  }

  ModifyPhoto(correo:string,foto:string){
    const url = "http://localhost:3000/modificarfoto";
    return this.http.put(url,
      {
        "correo":correo,
        "foto":foto
      },
      {headers: this.headers}).pipe(map(data => data ));
  }

  CreateCategory(categoria: string){
    const url = "http://localhost:3000/crearcategoria";
    return this.http.post(url,
      {
        "categoria":categoria,
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  Bitacora(correo: string,descripcion: string,fecha: string){
    const url = "http://localhost:3000/bitacora";
    return this.http.post(url,
      {
        "correo":correo,
        "descripcion":descripcion,
        "fecha":fecha
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  GetBitacoraasc(){
    const url = "http://localhost:3000/bitacoraasc";
    return this.http.get(url);
  }

  GetBitacoradesc(){
    const url = "http://localhost:3000/bitacoradesc";
    return this.http.get(url);
  }

  registroproducto(nombre: string,descripcion: string,precio: string,idusuario: string,idcategoria: string,idestado: string,foto: string){
    const url = "http://localhost:3000/publicacion";
    return this.http.post(url,
      {
        "nombre":nombre,
        "descripcion":descripcion,
        "precio":precio,
        "idusuario":idusuario,
        "idcategoria":idcategoria,
        "idestado":idestado,
        "foto":foto
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  GetCategoria(){
    const url = "http://localhost:3000/mostrarcategoria";
    return this.http.get(url);
  }

  InsertWord(palabra: string,idproducto: string){
    const url = "http://localhost:3000/palabra";
    return this.http.post(url,
      {
        "palabra":palabra,
        "idproducto":idproducto
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  GetProductsInformation(idusuario:string){
    const url = "http://localhost:3000/productospublicados/" + idusuario;
    return this.http.get(url);
  }

  GetProducts(idusuario:string){
    const url = "http://localhost:3000/productos/" + idusuario;
    return this.http.get(url);
  }

  GetProductsasc(idusuario:string){
    const url = "http://localhost:3000/productosasc/" + idusuario;
    return this.http.get(url);
  }

  GetProductsdesc(idusuario:string){
    const url = "http://localhost:3000/productosdesc/" + idusuario;
    return this.http.get(url);
  }

  GetProductscategory(parametro:string){
    const url = "http://localhost:3000/productoscategoria/" + parametro;
    return this.http.get(url);
  }

  GetProductscategoryasc(parametro:string){
    const url = "http://localhost:3000/productoscategoriaasc/" + parametro;
    return this.http.get(url);
  }
  
  GetProductscategorydesc(parametro:string){
    const url = "http://localhost:3000/productoscategoriadesc/" + parametro;
    return this.http.get(url);
  }

  GetProductsword(parametro:string){
    const url = "http://localhost:3000/productospalabra/" + parametro;
    return this.http.get(url);
  }

  GetProductswordasc(parametro:string){
    const url = "http://localhost:3000/productospalabraasc/" + parametro;
    return this.http.get(url);
  }

  GetProductsworddesc(parametro:string){
    const url = "http://localhost:3000/productospalabradesc/" + parametro;
    return this.http.get(url);
  }

  GetDetalle(idproducto:string){
    const url = "http://localhost:3000/detalle/" + idproducto;
    return this.http.get(url);
  }

  //set current user
  setCurrentProduct(idproducto:string){
    //let user_string = JSON.stringify(user);
    localStorage.setItem("detalleproducto",idproducto);

  }
  GetDetalleWords(idproducto:string){
    const url = "http://localhost:3000/detallepalabras/" + idproducto;
    return this.http.get(url);
  }

  InsertComentario(comentario: string,fecha: string,idusuario: string,idproducto: string){
    const url = "http://localhost:3000/comentario";
    return this.http.post(url,
      {
        "comentario":comentario,
        "fecha":fecha,
        "idusuario":idusuario,
        "idproducto":idproducto
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  GetComents(idproducto:string){
    const url = "http://localhost:3000/mostrarcomentarios/" + idproducto;
    return this.http.get(url);
  }

  InsertDenuncia(descripcion: string,fecha: string,idusuario: string,idproducto: string){
    const url = "http://localhost:3000/denunciar";
    return this.http.post(url,
      {
        "descripcion":descripcion,
        "fecha":fecha,
        "idusuario":idusuario,
        "idproducto":idproducto
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  GetDenuncias(){
    const url = "http://localhost:3000/mostrardenuncias";
    return this.http.get(url);
  }

  Bloqueo(idproducto:string){
    const url = "http://localhost:3000/bloquear";
    return this.http.put(url,
      {
        "idproducto":idproducto
      },
      {headers: this.headers}).pipe(map(data => data ));
  }

  Desbloqueo(idproducto:string){
    const url = "http://localhost:3000/desbloquear";
    return this.http.put(url,
      {
        "idproducto":idproducto
      },
      {headers: this.headers}).pipe(map(data => data ));
  }

  BloqueoCorreo(parametro:string){
    const url = "http://localhost:3000/correobloqueo/" + parametro;
    return this.http.get(url,{headers: this.headers}).pipe(map(data => data ));
  }

  InsertFeedback(idusuario: string,idproducto: string,estado: string){
    const url = "http://localhost:3000/feedback";
    return this.http.post(url,
      {
        "idusuario":idusuario,
        "idproducto":idproducto,
        "estado":estado,
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  Getlikes(idproducto: string){
    const url = "http://localhost:3000/mostrarlikes/" + idproducto;
    return this.http.get(url);
  }

  Getdislikes(idproducto: string){
    const url = "http://localhost:3000/mostrardislikes/" + idproducto;
    return this.http.get(url);
  }

  InsertProduct(idusuario: string,idproducto: string,cantidad: string){
    const url = "http://localhost:3000/registrocarro";
    return this.http.post(url,
      {
        "idusuario":idusuario,
        "idproducto":idproducto,
        "cantidad":cantidad
      },
      {headers: this.headers}).pipe(map(data => data ));

  }
  GetCarrito(idusuario: string){
    const url = "http://localhost:3000/mostrarcarrito/" + idusuario;
    return this.http.get(url);
  }

  ModifyCantidad(idusuario: string,idproducto: string,cantidad: string){
    const url = "http://localhost:3000/agregarcantidad";
    return this.http.put(url,
      {
        "idusuario":idusuario,
        "idproducto":idproducto,
        "cantidad":cantidad
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  GetTotal(idusuario: string){
    const url = "http://localhost:3000/mostrartotal/" + idusuario;
    return this.http.get(url);
  }

  CleanCarrito(idusuario: string){
    const url = "http://localhost:3000/limpiarcarro/" + idusuario;
    return this.http.delete(url).pipe(map(data => data ));
  }

  InsertCompra(fecha: string, idusuario: string){
    const url = "http://localhost:3000/compra";
    return this.http.post(url,
      {
        "fecha":fecha,
        "idusuario":idusuario
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  InsertDetalleCompra(idusuario: string){
    const url = "http://localhost:3000/detallecompra";
    return this.http.post(url,
      {
        "idusuario":idusuario
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  ModifyCreditosComprador(idusuario: string,credito: string){
    const url = "http://localhost:3000/creditoscomprador";
    return this.http.put(url,
      {
        "idusuario":idusuario,
        "credito":credito
      },
      {headers: this.headers}).pipe(map(data => data ));

  }

  GetVendedor(idproducto: string){
    const url = "http://localhost:3000/mostrarvendedor/" + idproducto;
    return this.http.get(url);
  }

  GetInformationVendedor(idusuario:string){
    const url = "http://localhost:3000/mostrarinformacionvendedor/" + idusuario;
    return this.http.get(url);
  }

  ModifyCreditosVendedor(idusuario: string,credito: string){
    const url = "http://localhost:3000/creditosvendedor";
    return this.http.put(url,
      {
        "idusuario":idusuario,
        "credito":credito
      },
      {headers: this.headers}).pipe(map(data => data ));

  }


}
