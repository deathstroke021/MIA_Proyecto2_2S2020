import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { BitacoraInterface} from "../../models/user-interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-bitacora2',
  templateUrl: './bitacora2.component.html',
  styleUrls: ['./bitacora2.component.css']
})
export class Bitacora2Component implements OnInit {

  constructor(public crudService:UserService,public router:Router) { }

  ngOnInit(): void {
    this.crudService.GetBitacoraasc().subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
      //console.log(this.Usuarios[0].C2);
      
    })
  }

  Bita:BitacoraInterface[] = [];

  CerrarSesion(){
    this.crudService.logout();
  }

  ordendesc(){
    this.router.navigate(["/bitacora"]);
  }
  volver(){
    this.router.navigate(["/administrador"]);
  }

}
