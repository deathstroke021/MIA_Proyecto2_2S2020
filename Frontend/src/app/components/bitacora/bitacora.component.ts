import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { BitacoraInterface} from "../../models/user-interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  constructor(public crudService:UserService,public router:Router) { }

  ngOnInit(): void {
    this.crudService.GetBitacoradesc().subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
      //console.log(this.Usuarios[0].C2);
      
    })
  }

  Bita:BitacoraInterface[] = [];

  CerrarSesion(){
    this.crudService.logout();
  }

  ordenasc(){
    this.router.navigate(["/bitacora2"]);
  }

  volver(){
    this.router.navigate(["/administrador"]);
  }

}
