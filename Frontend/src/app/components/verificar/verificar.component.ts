import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { CorreoInterface } from "../../models/user-interface";
import { Router } from "@angular/router";
import { BitacoraInterface} from "../../models/user-interface";

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.css']
})
export class VerificarComponent implements OnInit {

  constructor(public registroservice:UserService, public router:Router) { }

  ngOnInit(): void {
  }

  username:string="";
  password:string="";

  Correos:CorreoInterface[] = [];
  Bita:BitacoraInterface[] = [];


  VerificarCuenta(){

    this.registroservice.VerificarCount(this.username)
    .subscribe((res:CorreoInterface[])=>{
      this.Correos = res;
      //console.log(this.username,this.firstname,this.lastname);
      this.router.navigate(["/login"]);

    })

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    this.registroservice.Bitacora(this.username,"Verificacion de cuenta",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })

  }

}
