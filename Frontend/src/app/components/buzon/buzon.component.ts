import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { DenunciaMostrarInterface} from "../../models/user-interface";
import { BloqueoInterface} from "../../models/user-interface";
import { BitacoraInterface} from "../../models/user-interface";

@Component({
  selector: 'app-buzon',
  templateUrl: './buzon.component.html',
  styleUrls: ['./buzon.component.css']
})
export class BuzonComponent implements OnInit {

  constructor(public crudService:UserService) { }

  ngOnInit(): void {
    this.crudService.GetDenuncias().subscribe((res:DenunciaMostrarInterface[])=>{
      this.Denuncias = res;
      //console.log(this.Usuarios[0].C2);
    })
  }
 
  idproducto: string="";
  Denuncias:DenunciaMostrarInterface[] = [];
  Bloqueos:BloqueoInterface[] = [];
  Bita:BitacoraInterface[] = [];

  CerrarSesion(){
    this.crudService.logout();
  }

  Bloquear(idproducto,correo,producto){
    this.crudService.BloqueoCorreo(correo + "-" + producto ).subscribe();
    this.crudService.Bloqueo(idproducto)
    .subscribe((res:BloqueoInterface[])=>{
      this.Bloqueos = res;
      //console.log(this.username,this.firstname,this.lastname)

      var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    this.crudService.Bitacora("fernandoarmira20@gmail.com","Bloqueo de publicacion",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })

    })

  }

  Desbloquear(idproducto){
    this.crudService.Desbloqueo(idproducto)
    .subscribe((res:BloqueoInterface[])=>{
      this.Bloqueos = res;
      //console.log(this.username,this.firstname,this.lastname)

    })

  }

}
