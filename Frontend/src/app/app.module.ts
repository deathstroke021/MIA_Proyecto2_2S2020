import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CRUDComponent } from './components/crud/crud.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { UserService } from "./services/user.service";
import { RegistroComponent } from './components/registro/registro.component';
import { VerificarComponent } from './components/verificar/verificar.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { AdministadorComponent } from './components/administador/administador.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { BitacoraComponent } from './components/bitacora/bitacora.component';
import { Bitacora2Component } from './components/bitacora2/bitacora2.component';
import { ProdcutoComponent } from './components/prodcuto/prodcuto.component';
import { MisproductosComponent } from './components/misproductos/misproductos.component';
import { DetalleproductoComponent } from './components/detalleproducto/detalleproducto.component';
import { DenunciaComponent } from './components/denuncia/denuncia.component';
import { BuzonComponent } from './components/buzon/buzon.component';
import { CarritoComponent } from './components/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    CRUDComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    VerificarComponent,
    RecuperarComponent,
    AdministadorComponent,
    PrincipalComponent,
    InformacionComponent,
    CategoriaComponent,
    BitacoraComponent,
    Bitacora2Component,
    ProdcutoComponent,
    MisproductosComponent,
    DetalleproductoComponent,
    DenunciaComponent,
    BuzonComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
