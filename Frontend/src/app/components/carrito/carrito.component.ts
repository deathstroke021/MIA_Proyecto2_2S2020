import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { UsuarioInterface2 } from "../../models/user-interface";
import { CarritoInterface } from "../../models/user-interface";
import { CarritoMostrarInterface } from "../../models/user-interface";
import { TotalInterface } from "../../models/user-interface";
import { CompraInterface } from "../../models/user-interface";
import { DetalleCompraInterface } from "../../models/user-interface";
import { ModifyCreditosInterface } from "../../models/user-interface";
import { MOstrarVendedotInterface } from "../../models/user-interface";
import { BitacoraInterface} from "../../models/user-interface";


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

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
      this.creditos=this.Usuarios[0].credito;

      this.crudService.GetCarrito(this.Usuarios[0].id).subscribe((res:CarritoMostrarInterface[])=>{
        this.Carritos = res;
        //console.log(this.Carritos.length);
        

      })

      this.crudService.GetTotal(this.Usuarios[0].id).subscribe((res:TotalInterface[])=>{
        this.Totales = res;
        this.total=this.Totales[0].total;
        //console.log(this.Usuarios[0].C2);
      })

      
    })
  }

  id:string="";
  idvendedor:string="";
  cantidad:string="";
  correo:string="";
  creditos:string="";
  total:string="";
  creditovendedor:string="";
  Usuarios:UsuarioInterface2[] = [];
  Cantidades:CarritoInterface[] = [];
  C:CarritoInterface[] = [];
  Carritos:CarritoMostrarInterface[] = [];
  Totales:TotalInterface[] = [];
  Compras:CompraInterface[] = [];
  ComprasDetalle:DetalleCompraInterface[] = [];
  Credit:ModifyCreditosInterface[] = [];
  CreditV:ModifyCreditosInterface[] = [];
  Vendedores:MOstrarVendedotInterface[] = [];
  Vendedoresinf:UsuarioInterface2[] = [];
  UsuariosV:UsuarioInterface2[] = [];
  Bita:BitacoraInterface[] = [];

  CerrarSesion(){
    this.crudService.logout();
  }

  Cantidad(idproducto){
    this.crudService.ModifyCantidad(this.id,idproducto,this.cantidad)
    .subscribe((res:CarritoInterface[])=>{
      this.Cantidades = res;
      //console.log(this.username,this.firstname,this.lastname);

    })
    location.reload();
  }

  Limpiar(){
    this.crudService.CleanCarrito(this.id)
    .subscribe((res:CarritoInterface[])=>{
      this.C = res;
      //console.log(this.username,this.firstname,this.lastname);

    })
    location.reload();
  }

  Comprar(){

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    var a = parseInt(this.creditos);
    var b = parseInt(this.total);

    if(a>=b){

      var restarcredito = a - b;

      this.crudService.InsertCompra(fecha,this.id)
    .subscribe((res:CompraInterface[])=>{
      this.Compras = res;
      //console.log(this.username,this.firstname,this.lastname);


    })

    this.crudService.InsertDetalleCompra(this.id)
    .subscribe((res:DetalleCompraInterface[])=>{
      this.ComprasDetalle = res;
      //console.log(this.username,this.firstname,this.lastname);


    })

    this.crudService.ModifyCreditosComprador(this.id,restarcredito.toString())
    .subscribe((res:ModifyCreditosInterface[])=>{
      this.Credit = res;
      //console.log(this.username,this.firstname,this.lastname);

    })

    for(var i=0; i< this.Carritos.length;i++){
      console.log("datos");
      console.log(this.Carritos[i].idproducto);
      console.log(this.Carritos[i].subtotal);
      this.crudService.GetVendedor(this.Carritos[i].idproducto).subscribe((res:MOstrarVendedotInterface[])=>{
        this.Vendedores = res;
        this.idvendedor=this.Vendedores[i].idusuario;
        //console.log(this.Usuarios[0].C2);
      })

      this.crudService.GetInformationVendedor(this.idvendedor).subscribe((res:UsuarioInterface2[])=>{
        this.Vendedoresinf = res;
        this.creditovendedor=this.Vendedoresinf[i].credito;
        //console.log(this.Usuarios[0].C2);
      })

      var c = parseInt(this.creditovendedor);
      var d = parseInt(this.Carritos[i].subtotal);

      var sumarcredito = c + d;

      this.crudService.ModifyCreditosVendedor(this.idvendedor,sumarcredito.toString())
    .subscribe((res:ModifyCreditosInterface[])=>{
      this.CreditV = res;
      //console.log(this.username,this.firstname,this.lastname);

    })
      


    }

    this.crudService.Bitacora(this.correo,"Realizo compra",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })

    }else{
      console.log("Error!! No tiene los creditos suficientes.");

    }

    location.reload();

  }

}
