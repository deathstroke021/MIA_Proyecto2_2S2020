export interface UserInterface{
    
    C1: string,
    C2: string
    
}

export interface UsuarioInterface{
    
    nombre:string,
    apellido:string,
    correo:string,
    password:string,
    fecha:string,
    credito:string,
    foto:string,
    idpais:string,
    idestadou:string,
    idtipou:string
    
}

export interface PaisInterface{
    
    C1: string,
    C2: string
    
}

export interface CorreoInterface{
    
    correo: string
    
}

export interface PasswordInterface{
    
    correo: string
    password: string
    
}

export interface ModificarInterface{
    
    nombre:string,
    apellido:string,
    fecha:string,
    idpais:string,
    password:string,
    foto:string,
    correo:string

}

export interface ModificarfotoInterface{
    
    correo: string
    foto: string
    
}

export interface CategoriaInterface{
    
    categoria: string
    
}

export interface BitacoraInterface{
    
    correo: string
    descripcion: string
    fecha: string
    
}

export interface CategoriaInterface{
    
    id: string,
    categoria: string
    
}

export interface ProductoInterface{
    
    nombre:string,
    descripcion:string,
    precio:string,
    idusuario:string,
    idcategoria:string,
    idestado:string,
    foto:string

}

export interface UsuarioInterface2{
    id:string,
    nombre:string,
    apellido:string,
    correo:string,
    password:string,
    fecha:string,
    credito:string,
    foto:string,
    idpais:string,
    idestadou:string,
    idtipou:string
    
}

export interface ProductoInterface2{
    id:string,
    nombre:string,
    descripcion:string,
    precio:string,
    idusuario:string,
    idcategoria:string,
    idestado:string,
    foto:string,
    
}

export interface PalabraInterface{
    
    palabra: string,
    idproducto: string
    
}

export interface ComentarioInterface{
    
    correo: string
    fecha: string
    idusuario: string
    idproducto: string
    
}

export interface ComentarioMostrarInterface{
    
    correo: string
    comentario: string
    fecha: string
    
}

export interface DenunciaInterface{
    
    descripcion: string
    fecha: string
    idusuario: string
    idproducto: string
    
}

export interface DenunciaMostrarInterface{
    
    usuario: string
    descripcion: string
    fecha: string
    producto: string
    idproducto: string
    
}

export interface BloqueoInterface{
    
    idproducto: string
    
}

export interface FeedbackInterface{
    
    idusuario: string
    idproducto: string
    estado: string
    
}

export interface FeedbackMostrarInterface{
    
    cantidad: string
    
}

export interface CarritoInterface{
    
    idusuario: string
    idproducto: string
    cantidad: string
    
}

export interface CarritoMostrarInterface{
    
    idproducto: string
    foto: string
    nombre: string
    precio: string
    cantidad: string
    subtotal: string
    
}

export interface TotalInterface{
    
    total: string
    
}

export interface CompraInterface{
    
    fecha: string,
    idusuario: string
    
}

export interface DetalleCompraInterface{
    
    idusuario: string
    
}

export interface ModifyCreditosInterface{
    
    idusuario: string,
    credito: string
    
}

export interface MOstrarVendedotInterface{
    
    idusuario: string
    
}