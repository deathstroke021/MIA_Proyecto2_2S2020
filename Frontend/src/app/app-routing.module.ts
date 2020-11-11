import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CRUDComponent } from "./components/crud/crud.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { RecuperarComponent } from "./components/recuperar/recuperar.component";
import { VerificarComponent } from "./components/verificar/verificar.component";
import { AdministadorComponent } from "./components/administador/administador.component";
import { PrincipalComponent } from "./components/principal/principal.component";
import { InformacionComponent } from "./components/informacion/informacion.component";
import { CategoriaComponent } from "./components/categoria/categoria.component";
import { BitacoraComponent } from "./components/bitacora/bitacora.component";
import { Bitacora2Component } from "./components/bitacora2/bitacora2.component";
import { ProdcutoComponent } from "./components/prodcuto/prodcuto.component";
import { MisproductosComponent } from "./components/misproductos/misproductos.component";
import { DetalleproductoComponent } from "./components/detalleproducto/detalleproducto.component";
import { DenunciaComponent } from "./components/denuncia/denuncia.component";
import { BuzonComponent } from "./components/buzon/buzon.component";
import { CarritoComponent } from "./components/carrito/carrito.component";
import { MothGuard } from "./guards/moth.guard";


const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'crud',
    component:CRUDComponent,
    canActivate:[MothGuard]
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'registro',
    component:RegistroComponent
  },
  {
    path: 'recuperar',
    component:RecuperarComponent
  },
  {
    path: 'verificar',
    component:VerificarComponent
  },
  {
    path: 'administrador',
    component:AdministadorComponent
  },
  {
    path: 'principal',
    component:PrincipalComponent
  },
  {
    path: 'informacion',
    component:InformacionComponent
  },
  {
    path: 'categoria',
    component:CategoriaComponent
  },
  {
    path: 'bitacora',
    component:BitacoraComponent
  },
  {
    path: 'bitacora2',
    component:Bitacora2Component
  },
  {
    path: 'prodcuto',
    component:ProdcutoComponent
  },
  {
    path: 'misproductos',
    component:MisproductosComponent
  },
  {
    path: 'detalleproducto',
    component:DetalleproductoComponent
  },
  {
    path: 'denuncia',
    component:DenunciaComponent
  },
  {
    path: 'buzon',
    component:BuzonComponent
  },
  {
    path: 'carrito',
    component:CarritoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
