import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { PasswordInterface } from "../../models/user-interface";
import { Router } from "@angular/router";
import { BitacoraInterface} from "../../models/user-interface";

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  constructor(public registroservice:UserService, public router:Router) { }

  ngOnInit(): void {
  }

  username:string="";
  password:string="";

  Correos:PasswordInterface[] = [];
  Bita:BitacoraInterface[] = [];

  RecuperarPass(){
    this.registroservice.Password(this.username,this.password)
    .subscribe((res:PasswordInterface[])=>{
      this.Correos = res;
      //console.log(this.username,this.firstname,this.lastname);
      this.router.navigate(["/login"]);

    })

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    this.registroservice.Bitacora(this.username,"Recuperacion de contraseña",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })

  }

}
