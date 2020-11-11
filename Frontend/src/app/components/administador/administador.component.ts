import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { BitacoraInterface} from "../../models/user-interface";

@Component({
  selector: 'app-administador',
  templateUrl: './administador.component.html',
  styleUrls: ['./administador.component.css']
})
export class AdministadorComponent implements OnInit {

  constructor(public crudService:UserService, public router:Router) { }

  ngOnInit(): void {
    /*let userCurrent = localStorage.getItem("usuriologueado");
    let user_json = JSON.parse(userCurrent)
    let correouser = user_json.correo;
    //console.log(userCurrent);
    console.log(correouser);

    this.crudService.GetInformation(correouser).subscribe((res:UsuarioInterface[])=>{
      this.Usuarios = res;
      //console.log(this.Usuarios[0].C2);
      //this.foto = this.Usuarios[0].foto;
      //this.nombre = "Marzy";
      //console.log(this.imagen)
    })*/
      
  }
  //Usuarios:UsuarioInterface[] = [];
  Bita:BitacoraInterface[] = [];

  CerrarSesion(){
    this.crudService.logout();
  }

  Categoria(){
    this.router.navigate(["/categoria"]);
  }

  MostrarBitacora(){
    this.router.navigate(["/bitacora"]);

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    this.crudService.Bitacora("fernandoarmira20@gmail.com","Reporte bitacora",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })
  }

  Buzon(){
    this.router.navigate(["/buzon"]);
  }
}
