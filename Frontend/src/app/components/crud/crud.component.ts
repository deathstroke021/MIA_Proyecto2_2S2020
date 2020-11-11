import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { UserInterface } from "../../models/user-interface";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  constructor(public crudService:UserService ) { }

  ngOnInit(): void {
    this.crudService.GetUsers().subscribe((res:UserInterface[])=>{
      this.Usuarios = res;
      //console.log(this.Usuarios[0].C2);
    })
  }

  codu: string="";
  username: string="";
  firstname: string="";
  lastname: string="";

  Usuarios:UserInterface[] = [];

  addUser(){
    this.crudService.InsertUser(this.username)
    .subscribe((res:UserInterface[])=>{
      this.Usuarios = res;
      //console.log(this.username,this.firstname,this.lastname);
      this.codu="";
      this.username="";
      this.firstname="";
      this.lastname="";

    })

  }

  getDataUser(C1,C2){
    this.codu = C1;
    this.username = C2;

  }

  updateUser(){
    this.crudService.UpdateUser(this.codu,this.username)
    .subscribe((res:UserInterface[])=>{
      this.Usuarios = res;
      //console.log(this.username,this.firstname,this.lastname);
      this.codu="";
      this.username="";
      this.firstname="";
      this.lastname="";

    })
  }

  deleteUser(codu){
    this.crudService.DeleteUser(codu)
    .subscribe((res:UserInterface[])=>{
      this.Usuarios = res;
      //console.log(this.username,this.firstname,this.lastname);
      this.codu="";
      this.username="";
      this.firstname="";
      this.lastname="";

    })
  }

  CerrarSesion(){
    this.crudService.logout();
  }

}
