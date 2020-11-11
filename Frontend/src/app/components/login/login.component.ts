import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/user-interface';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
import { BitacoraInterface} from "../../models/user-interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public moth: UserService, public router:Router) { }

  ngOnInit(): void {
  }

  username:string="";
  password:string="";

  Bita:BitacoraInterface[] = [];

  login(){
    //console.log(this.username)
    this.moth.Login(this.username,this.password).subscribe((res)=>{
      //console.log(res["msg"]);
      //console.log(res["Datauser"]);
      if(this.username=="fernandoarmira20@gmail.com" && this.password=="administrador"){
        this.router.navigate(["/administrador"]);

        var f = new Date();
        var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

        this.moth.Bitacora(this.username,"Inicio de sesion",fecha)
        .subscribe((res:BitacoraInterface[])=>{
        this.Bita = res;
        })

      }else{
        if(res["msg"]){
          let Datauser:UserInterface=res["Datauser"];
          this.moth.setCurrentUser(Datauser);
          this.router.navigate(["/principal"]);

          var f = new Date();
          var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

          this.moth.Bitacora(this.username,"Inicio de sesion",fecha)
          .subscribe((res:BitacoraInterface[])=>{
          this.Bita = res;
          })

        }else{
          console.log("Credenciales incorrectas")
        }

      }

    })

    
  }

  crearcuenta(){
    this.router.navigate(["/registro"]);
  }

  recuperarpassword(){
    this.moth.PasswordCorreo(this.username).subscribe();
    //console.log(this.username);

  }
}
