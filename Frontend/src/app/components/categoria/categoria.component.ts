import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { CategoriaInterface} from "../../models/user-interface";
import { BitacoraInterface} from "../../models/user-interface";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(public crudService:UserService) { }

  ngOnInit(): void {
  }

  categoria:string="";

  Categoria:CategoriaInterface[] = [];
  Bita:BitacoraInterface[] = [];

  CerrarSesion(){
    this.crudService.logout();
  }

  CrearCategoria(){
    this.crudService.CreateCategory(this.categoria)
    .subscribe((res:CategoriaInterface[])=>{
      this.Categoria = res;
      //console.log(this.username,this.firstname,this.lastname);
      this.categoria="";


    })

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    this.crudService.Bitacora("fernandoarmira20@gmail.com","Crear categoria",fecha)
    .subscribe((res:BitacoraInterface[])=>{
      this.Bita = res;
    })

  }

}
