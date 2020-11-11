const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

var fs = require('fs'); 

/*router.get("/",(req,res)=>{
    res.status(200).json({
        msg:"todo ok, base de datos conectada"
    })
})*/

router.get("/", async (req,res)=>{

    sql = "select * from T1 where C1 = 1";

    let result = await BD.Open(sql,[],false);

    console.log(result);

    res.status(200).json({
        msg:"todo ok, base de datos conectada"
    })

})

//READ
router.get('/getUsers', async (req, res) => {
    sql = "select * from T1";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "C1": user[0],
            "C2": user[1]
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})


//CREATE

router.post('/addUser', async (req, res) => {
    const {C2} = req.body;

    sql = "insert into T1(C2) values (:C2)";

    await BD.Open(sql, [C2], true);

    sql2 = "select * from T1";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "C1": user[0],
            "C2": user[1]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

})

//UPDATE
router.put("/updateUser", async (req, res) => {
    const {C1,C2} = req.body;

    sql = "update T1 set C2=:C2 where C1=:C1";

    await BD.Open(sql, [C2,C1], true);

    sql2 = "select * from T1";

    let result = await BD.Open(sql2, [], false);
    Users = [];Users

    result.rows.map(user => {
        let userSchema = {
            "C1": user[0],
            "C2": user[1]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

})

//DELETE(MOdificar)
router.delete("/deleteUser/:codu", async (req, res) => {
    const { codu } = req.params;

    sql = "update person set state=0 where codu=:codu";

    await BD.Open(sql, [codu], true);

    sql2 = "select * from T1";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "C1": user[0],
            "C2": user[1]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);



})

//DELETE
router.delete("/deleteUsers/:C1", async (req, res) => {
    const { C1 } = req.params;

    sql = "delete from T1 where C1=:C1";

    await BD.Open(sql, [C1], true);

    sql2 = "select * from T1";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "C1": user[0],
            "C2": user[1]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

})

//Login
/*
router.post('/signUp', async (req, res) => {
    const {C2} = req.body;

    sql = "select C1,C2 from T1 where C2 =:C2"

    let result = await BD.Open(sql, [C2], false);

    console.log(result.rows);

    if(result.rows.length > 0){
        res.status(201).json(
            {
                msg: true,
                Datauser:{
                    "C1": result.rows[0][0],
                    "C2": result.rows[0][1]
                }
                

            });

    }else{
        res.status(201).json({msg: false})

    }


})*/

router.post('/signUp', async (req, res) => {
    const {correo} = req.body;
    const {password} = req.body;

    sql = "select correo,password from usuario where correo =:correo and password=:password and estado_usuario_id_estado_usuario = 1"

    let result = await BD.Open(sql, [correo,password], false);

    console.log(result.rows);

    if(result.rows.length > 0){
        res.status(201).json(
            {
                msg: true,
                Datauser:{
                    "correo": result.rows[0][0],
                    "password": result.rows[0][1]
                }
                

            });

    }else{
        res.status(201).json({msg: false})

    }


})

//Registro usuarios
router.post('/registro', async (req, res) => {

    const {nombre} = req.body;
    const {apellido} = req.body;
    const {correo} = req.body;
    const {password} = req.body;
    const {fecha} = req.body;
    const {credito} = req.body;
    const {foto} = req.body;
    const {idpais} = req.body;
    const {idestadou} = req.body;
    const {idtipou} = req.body;

    sql = "select * from usuario where correo =:correo"

    let result = await BD.Open(sql, [correo], false);

    console.log(result.rows);

    if(result.rows.length > 0){
        res.status(201).json(
            {
                msg: "Error. Este usuario ya existe",    

            });

    }else{
        if(foto!="default.png"){
            fs.createReadStream('/home/fernando/Documentos/'+foto).pipe(fs.createWriteStream('/home/fernando/Documentos/HTTPServer/'+foto));
        }
    
        sql2 = "insert into usuario(nombre,apellido,correo,password,fecha,credito,foto,pais_id_pais,estado_usuario_id_estado_usuario,tipo_usuario_id_tipo_usuario) values (:nombre,:apellido,:correo,:password,:fecha,:credito,:foto,:idpais,:idestadou,:idtipou)";
    
        await BD.Open(sql2, [nombre,apellido,correo,password,fecha,credito,'http://localhost:3010/'+foto,idpais,idestadou,idtipou], true);
    
        res.status(201).json({
            msg:"usuario registrado correctamente"
        })

    }


})

//Mostrar Pais
router.get('/pais', async (req, res) => {
    sql = "select * from pais";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id": user[0],
            "pais": user[1]
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//verificacion de cuenta

router.put("/verificarcuenta/:correo", async (req, res) => {
    const {correo} = req.params;

    sql = "update usuario set estado_usuario_id_estado_usuario=1 where correo=:correo";

    await BD.Open(sql, [correo], true);

    sql2 = "select * from usuario";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id": user[0],
            "nombre": user[1],
            "apellido": user[2],
            "correo": user[3],
            "password": user[4],
            "fecha": user[5],
            "credito": user[6],
            "foto": user[7],
            "idpais": user[8],
            "idestadousuario": user[9],
            "idtipousuario": user[10]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);
    //res.send('<strong>Su cuenta ha sido verificada, inicie sesion para ingresar a su cuenta</strong><br>' + '<a href="http://localhost:4200/login">Iniciar sesion</a>' + '<img src="https://es.jumpseller.com/images/learn/choosing-platform/laptop.jpg">')

})

//restablecer password

router.put("/restablecerpassword", async (req, res) => {
    const {correo,password} = req.body;

    sql = "update usuario set password=:password where correo=:correo";

    await BD.Open(sql, [password,correo], true);

    sql2 = "select * from usuario";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "correo": user[3],
            "password": user[4],
            "fecha": user[5],
            "credito": user[6],
            "foto": user[7],
            "idpais": user[8],
            "idestadousuario": user[9],
            "idtipousuario": user[10]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);
    //res.send('<strong>Su cuenta ha sido verificada, inicie sesion para ingresar a su cuenta</strong><br>' + '<a href="http://localhost:4200/login">Iniciar sesion</a>' + '<img src="https://es.jumpseller.com/images/learn/choosing-platform/laptop.jpg">')

})

//informacion usuario
router.get("/perfil/:correo", async (req,res)=>{

    const {correo} = req.params;

    sql = "select * from usuario where correo =:correo";

    let result = await BD.Open(sql,[correo],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "apellido": user[2],
            "correo": user[3],
            "password": user[4],
            "fecha": user[5],
            "credito": user[6],
            "foto": user[7],
            "idpais": user[8],
            "idestadousuario": user[9],
            "idtipousuario": user[10]
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})

//modificar perfil
router.put("/modificarperfil", async (req, res) => {
    const {nombre, apellido, fecha, idpais, password, foto, correo} = req.body;

    sql = "update usuario set nombre=:nombre, apellido=:apellido,fecha=:fecha,pais_id_pais=:idpais,password=:password where correo=:correo";

    await BD.Open(sql, [nombre,apellido,fecha,idpais,password,correo], true);

    sql2 = "select * from usuario";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "correo": user[3],
            "password": user[4],
            "fecha": user[5],
            "credito": user[6],
            "foto": user[7],
            "idpais": user[8],
            "idestadousuario": user[9],
            "idtipousuario": user[10]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

    //}


    
    //res.send('<strong>Su cuenta ha sido verificada, inicie sesion para ingresar a su cuenta</strong><br>' + '<a href="http://localhost:4200/login">Iniciar sesion</a>' + '<img src="https://es.jumpseller.com/images/learn/choosing-platform/laptop.jpg">')

})

//modificar foto de perfil
router.put("/modificarfoto", async (req, res) => {
    const {correo,foto} = req.body;

    fs.createReadStream('/home/fernando/Documentos/'+foto).pipe(fs.createWriteStream('/home/fernando/Documentos/HTTPServer/'+foto));

    sql = "update usuario set foto=:foto where correo=:correo";

    await BD.Open(sql, ['http://localhost:3010/'+foto,correo], true);

    sql2 = "select * from usuario";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "correo": user[3],
            "password": user[4],
            "fecha": user[5],
            "credito": user[6],
            "foto": user[7],
            "idpais": user[8],
            "idestadousuario": user[9],
            "idtipousuario": user[10]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);
    //res.send('<strong>Su cuenta ha sido verificada, inicie sesion para ingresar a su cuenta</strong><br>' + '<a href="http://localhost:4200/login">Iniciar sesion</a>' + '<img src="https://es.jumpseller.com/images/learn/choosing-platform/laptop.jpg">')

})

//crear categorias

router.post('/crearcategoria', async (req, res) => {
    const {categoria} = req.body;

    sql = "insert into categoria_producto(descripcion) values (:categoria)";

    await BD.Open(sql, [categoria], true);

    sql2 = "select * from categoria_producto";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id": user[0],
            "categoria": user[1]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

})

//bitacora

router.post('/bitacora', async (req, res) => {
    const {correo,descripcion,fecha} = req.body;

    //let now= new Date();
    //console.log('La fecha actual es',now);
    //console.log('UNIX time:',now.getTime());

    sql = "insert into bitacora(correo,descripcion,fecha) values (:correo,:descripcion,:fecha)";

    await BD.Open(sql, [correo,descripcion,fecha], true);

    sql2 = "select * from bitacora";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "correo": user[1],
            "descripcion": user[2],
            "fecha": user[3]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

})

//mostrar bitacora desc
router.get('/bitacoraasc', async (req, res) => {
    sql = "select * from bitacora order by fecha asc";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "correo": user[1],
            "descripcion": user[2],
            "fecha": user[3]
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//mostrar bitacora desc
router.get('/bitacoradesc', async (req, res) => {
    sql = "select * from bitacora order by fecha desc";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "correo": user[1],
            "descripcion": user[2],
            "fecha": user[3]
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})


//Registro productos
router.post('/publicacion', async (req, res) => {

    const {nombre} = req.body;
    const {descripcion} = req.body;
    const {precio} = req.body;
    const {idusuario} = req.body;
    const {idcategoria} = req.body;
    const {idestado} = req.body;
    const {foto} = req.body;

    fs.createReadStream('/home/fernando/Documentos/productos/'+foto).pipe(fs.createWriteStream('/home/fernando/Documentos/HTTPServer/'+foto));

    sql2 = "insert into producto(nombre,descripcion,precio,usuario_id_usuario,categoria_producto_id_categoria_producto,estado_producto_id_estado,foto) values (:nombre,:descripcion,:precio,:idusuario,:idcategoria,:idestado,:foto)";

    await BD.Open(sql2, [nombre,descripcion,precio,idusuario,idcategoria,idestado,'http://localhost:3010/'+foto], true);

    res.status(201).json({
        msg:"producto registrado correctamente"
    })

})

//Mostrar Categoria
router.get('/mostrarcategoria', async (req, res) => {
    sql = "select * from categoria_producto";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id": user[0],
            "categoria": user[1]
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//agregar palabras claves
router.post('/palabra', async (req, res) => {
    const {palabra,idproducto} = req.body;

    sql = "insert into palabra_clave(palabra,producto_id_producto) values (:palabra,:idproducto)";

    await BD.Open(sql, [palabra,idproducto], true);

    sql2 = "select * from palabra_clave";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "palabra": user[1],
            "idproducto": user[2]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

})

//informacion productos publicados
router.get("/productospublicados/:idusuario", async (req,res)=>{

    const {idusuario} = req.params;

    sql = "select * from producto where usuario_id_usuario =:idusuario";

    let result = await BD.Open(sql,[idusuario],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7],
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})

//mostrar todos los productos
router.get("/productos/:idusuario", async (req,res)=>{

    const {idusuario} = req.params;

    sql = "select * from producto where usuario_id_usuario !=:idusuario and estado_producto_id_estado = 1";

    let result = await BD.Open(sql,[idusuario],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7],
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})

//mostrar todos los productos asc
router.get("/productosasc/:idusuario", async (req,res)=>{

    const {idusuario} = req.params;

    sql = "select * from producto where usuario_id_usuario !=:idusuario and estado_producto_id_estado = 1 order by precio asc";

    let result = await BD.Open(sql,[idusuario],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7],
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})

//mostrar todos los productos desc
router.get("/productosdesc/:idusuario", async (req,res)=>{

    const {idusuario} = req.params;

    sql = "select * from producto where usuario_id_usuario !=:idusuario and estado_producto_id_estado = 1 order by precio desc";

    let result = await BD.Open(sql,[idusuario],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7],
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})

//mostrar productos por categoria
router.get("/productoscategoria/:parametro", async (req,res)=>{

    //const {idusuario,idcategoria} = req.body;
    const {parametro} = req.params;

    var param = parametro.split("-");

    sql = "select * from producto where usuario_id_usuario !=:idusuario and estado_producto_id_estado = 1 and categoria_producto_id_categoria_producto =:idcategoria";

    let result = await BD.Open(sql,[param[0],param[1]],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7],
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})

//mostrar productos por categoria asc
router.get("/productoscategoriaasc/:parametro", async (req,res)=>{

    //const {idusuario,idcategoria} = req.body;
    const {parametro} = req.params;

    var param = parametro.split("-");

    sql = "select * from producto where usuario_id_usuario !=:idusuario and estado_producto_id_estado = 1 and categoria_producto_id_categoria_producto =:idcategoria order by precio asc";

    let result = await BD.Open(sql,[param[0],param[1]],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7],
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})

//mostrar productos por categoria desc
router.get("/productoscategoriadesc/:parametro", async (req,res)=>{

    //const {idusuario,idcategoria} = req.body;
    const {parametro} = req.params;

    var param = parametro.split("-");

    sql = "select * from producto where usuario_id_usuario !=:idusuario and estado_producto_id_estado = 1 and categoria_producto_id_categoria_producto =:idcategoria order by precio desc";

    let result = await BD.Open(sql,[param[0],param[1]],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7],
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})

//mostrar productos por palabra clave
router.get("/productospalabra/:parametro", async (req,res)=>{

    //const {idusuario,idcategoria} = req.body;
    const {parametro} = req.params;

    var param = parametro.split("-");

    sql ="select * from producto,palabra_clave where producto.id_producto = palabra_clave.producto_id_producto and producto.usuario_id_usuario !=:idusuario and producto.estado_producto_id_estado = 1 and palabra_clave.palabra =:palabra";

    let result = await BD.Open(sql,[param[0],param[1]],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7],
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})

//mostrar productos por palabra clave asc
router.get("/productospalabraasc/:parametro", async (req,res)=>{

    //const {idusuario,idcategoria} = req.body;
    const {parametro} = req.params;

    var param = parametro.split("-");

    sql ="select * from producto,palabra_clave where producto.id_producto = palabra_clave.producto_id_producto and producto.usuario_id_usuario !=:idusuario and producto.estado_producto_id_estado = 1 and palabra_clave.palabra =:palabra order by precio asc";

    let result = await BD.Open(sql,[param[0],param[1]],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7],
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})

//mostrar productos por palabra clave desc
router.get("/productospalabradesc/:parametro", async (req,res)=>{

    //const {idusuario,idcategoria} = req.body;
    const {parametro} = req.params;

    var param = parametro.split("-");

    sql ="select * from producto,palabra_clave where producto.id_producto = palabra_clave.producto_id_producto and producto.usuario_id_usuario !=:idusuario and producto.estado_producto_id_estado = 1 and palabra_clave.palabra =:palabra order by precio desc";

    let result = await BD.Open(sql,[param[0],param[1]],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7],
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})

//detalle producto
router.get('/detalle/:idproducto', async (req, res) => {
    const {idproducto} = req.params;

    sql = "select * from producto where id_producto =:idproducto";

    let result = await BD.Open(sql, [idproducto], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7],
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//detalle producto
router.get('/detallepalabras/:idproducto', async (req, res) => {
    const {idproducto} = req.params;

    sql = "select * from palabra_clave where producto_id_producto =:idproducto";

    let result = await BD.Open(sql, [idproducto], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "palabra":user[1],
            "idproducto": user[2],

        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//comentar
router.post('/comentario', async (req, res) => {
    const {comentario,fecha,idusuario,idproducto} = req.body;

    sql = "insert into comentario(comentario,fecha,usuario_id_usuario,producto_id_producto) values (:comentario,:fecha,:idusuario,:idproducto)";

    await BD.Open(sql, [comentario,fecha,idusuario,idproducto], true);

    sql2 = "select * from comentario";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "comentario": user[1],
            "fecha": user[2],
            "idusuario": user[3],
            "idproducto": user[4]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

})

//mostrar comentarios
router.get('/mostrarcomentarios/:idproducto', async (req, res) => {
    const {idproducto} = req.params;

    sql = "select usuario.correo,comentario.comentario,comentario.fecha from usuario,comentario where usuario.id_usuario = comentario.usuario_id_usuario and comentario.producto_id_producto =:idproducto order by fecha asc";

    let result = await BD.Open(sql, [idproducto], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "usuario":user[0],
            "comentario": user[1],
            "fecha": user[2],

        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//denunciar
router.post('/denunciar', async (req, res) => {
    const {descripcion,fecha,idusuario,idproducto} = req.body;

    sql = "insert into denuncia(descripcion,fecha,usuario_id_usuario,producto_id_producto) values (:descripcion,:fecha,:idusuario,:idproducto)";

    await BD.Open(sql, [descripcion,fecha,idusuario,idproducto], true);

    sql2 = "select * from denuncia";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "descripcion": user[1],
            "fecha": user[2],
            "idusuario": user[3],
            "idproducto": user[4]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

})

//mostrar denuncias
router.get('/mostrardenuncias', async (req, res) => {

    sql = "select usuario.correo,denuncia.descripcion,denuncia.fecha,producto.nombre,producto.id_producto from usuario,denuncia,producto where producto.id_producto = denuncia.producto_id_producto and usuario.id_usuario = producto.usuario_id_usuario order by fecha asc";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "usuario":user[0],
            "descripcion": user[1],
            "fecha": user[2],
            "producto": user[3],
            "idproducto": user[4]

        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//Bloquear publicacion
router.put("/bloquear", async (req, res) => {
    const { idproducto } = req.body;

    sql = "update producto set estado_producto_id_estado=2 where id_producto=:idproducto";

    await BD.Open(sql, [idproducto], true);

    sql2 = "select * from producto";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);



})

//Desbloquear publicacion
router.put("/desbloquear", async (req, res) => {
    const { idproducto } = req.body;

    sql = "update producto set estado_producto_id_estado=1 where id_producto=:idproducto";

    await BD.Open(sql, [idproducto], true);

    sql2 = "select * from producto";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "descripcion": user[2],
            "precio": user[3],
            "idusuario": user[4],
            "idcategoria": user[5],
            "idestado": user[6],
            "foto": user[7]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);



})

//like y dislike
router.post('/feedback', async (req, res) => {

    const {idusuario} = req.body;
    const {idproducto} = req.body;
    const {estado} = req.body;

    sql = "select * from \"Like\" where usuario_id_usuario =:idusuario and producto_id_producto =:idproducto"

    let result = await BD.Open(sql, [idusuario,idproducto], false);

    console.log(result.rows);

    if(result.rows.length > 0){
        sql2 = "update \"Like\"  set estado=:estado where usuario_id_usuario=:idusuario and producto_id_producto=:idproducto";
    
        await BD.Open(sql2, [estado,idusuario,idproducto], true);
    
        res.status(201).json({
            msg:"informacion agregada correctamente"
        })


    }else{

        sql2 = "insert into \"Like\"(usuario_id_usuario,producto_id_producto,estado) values (:idusuario,:idproducto,:estado)";
    
        await BD.Open(sql2, [idusuario,idproducto,estado], true);
    
        res.status(201).json({
            msg:"informacion agregada correctamente"
        })

    }


})


//mostrar like
router.get('/mostrarlikes/:idproducto', async (req, res) => {
    const {idproducto} = req.params;

    sql = "select count(estado)as Megusta from \"Like\" where estado = 'like' and producto_id_producto =:idproducto";
    let result = await BD.Open(sql, [idproducto], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "cantidad":user[0],

        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//mostrar dislike
router.get('/mostrardislikes/:idproducto', async (req, res) => {
    const {idproducto} = req.params;

    sql = "select count(estado)as Megusta from \"Like\" where estado = 'dislike' and producto_id_producto =:idproducto";
    let result = await BD.Open(sql, [idproducto], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "cantidad":user[0],

        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//añadir carro

router.post('/registrocarro', async (req, res) => {

    const {idusuario,idproducto,cantidad} = req.body;

    sql = "select * from carrito_de_compras where usuario_id_usuario=:idusuario and producto_id_producto=:idproducto"

    let result = await BD.Open(sql, [idusuario,idproducto], false);

    console.log(result.rows);

    if(result.rows.length > 0){
        res.status(201).json(
            {
                msg: "Error. Este producto ya ha sido agregado al carrito",    

            });

    }else{

        sql = "insert into carrito_de_compras(usuario_id_usuario,producto_id_producto,cantidad) values (:idusuario,:idproducto,:cantidad)";

        await BD.Open(sql, [idusuario,idproducto,cantidad], true);


        res.status(201).json({
            msg:"producto agregado correctamente"
        })

    }
  
    
})

//mostrar carrito
router.get('/mostrarcarrito/:idusuario', async (req, res) => {

    const {idusuario} = req.params;

    sql = "select producto.id_producto,producto.foto,producto.nombre,producto.precio,carrito_de_compras.cantidad,(producto.precio*carrito_de_compras.cantidad)as Subtotal from producto,carrito_de_compras,usuario where producto.id_producto = carrito_de_compras.producto_id_producto and usuario.id_usuario = carrito_de_compras.usuario_id_usuario and usuario.id_usuario =:idusuario";

    let result = await BD.Open(sql, [idusuario], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "idproducto":user[0],
            "foto":user[1],
            "nombre": user[2],
            "precio": user[3],
            "cantidad": user[4],
            "subtotal": user[5]

        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//agregar cantidad

router.put('/agregarcantidad', async (req, res) => {

    const {idusuario} = req.body;
    const {idproducto} = req.body;
    const {cantidad} = req.body;


        sql2 = "update carrito_de_compras set cantidad=:cantidad where usuario_id_usuario=:idusuario and producto_id_producto=:idproducto";
    
        await BD.Open(sql2, [cantidad,idusuario,idproducto], true);
    
        res.status(201).json({
            msg:"informacion agregada correctamente"
        })

})

//mostrar total
router.get('/mostrartotal/:idusuario', async (req, res) => {

    const {idusuario} = req.params;

    sql = "select sum(producto.precio*carrito_de_compras.cantidad) as total from producto,carrito_de_compras,usuario where producto.id_producto = carrito_de_compras.producto_id_producto and usuario.id_usuario = carrito_de_compras.usuario_id_usuario and usuario.id_usuario =:idusuario group by usuario.id_usuario";
    let result = await BD.Open(sql, [idusuario], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "total":user[0],

        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//limpiar carro
router.delete("/limpiarcarro/:idusuario", async (req, res) => {
    const { idusuario } = req.params;

    sql = "delete from carrito_de_compras where usuario_id_usuario=:idusuario";

    await BD.Open(sql, [idusuario], true);

    sql2 = "select * from carrito_de_compras";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "idusuario": user[0],
            "idproducto": user[1],
            "cantidad": user[2]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

})

//Compra
router.post('/compra', async (req, res) => {
    const {fecha,idusuario} = req.body;

    sql = "insert into compra(fecha,usuario_id_usuario) values (:fecha,:idusuario)";

    await BD.Open(sql, [fecha,idusuario], true);

    sql2 = "select * from compra";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "fecha": user[1],
            "idusuario": user[2]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

})

//DetalleCompra
router.post('/detallecompra', async (req, res) => {
    const {idusuario} = req.body;

    sql = "insert into detalle_compra(producto_id_producto,compra_id_compra,cantidad) select carrito_de_compras.producto_id_producto,compra.id_compra, carrito_de_compras.cantidad from carrito_de_compras, compra where carrito_de_compras.usuario_id_usuario = compra.usuario_id_usuario and compra.usuario_id_usuario =:idusuario and id_compra=(select max(id_compra) from compra where usuario_id_usuario =:idusuario)";

    await BD.Open(sql, [idusuario], true);

    sql2 = "select * from detalle_compra";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "idproducto": user[0],
            "idcompra": user[1],
            "cantidad": user[2]
        }

        Users.push(userSchema);
    })

    res.status(200).json(Users);

})

//agregar cantidad comprador

router.put('/creditoscomprador', async (req, res) => {

    const {idusuario} = req.body;
    const {credito} = req.body;

        sql2 = "update usuario set credito=:credito where id_usuario=:idusuario";
    
        await BD.Open(sql2, [credito,idusuario], true);
    
        res.status(201).json({
            msg:"informacion agregada correctamente"
        })

})

//mostrarvendedor
router.get('/mostrarvendedor/:idproducto', async (req, res) => {

    const {idproducto} = req.params;

    sql = "select producto.usuario_id_usuario from producto,usuario where producto.usuario_id_usuario = usuario.id_usuario and producto.id_producto=:idproducto";
    let result = await BD.Open(sql, [idproducto], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "idusuario":user[0],

        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);
})

//informacion usuario x2
router.get("/mostrarinformacionvendedor/:idusuario", async (req,res)=>{

    const {idusuario} = req.params;

    sql = "select * from usuario where id_usuario =:idusuario";

    let result = await BD.Open(sql,[idusuario],false);

    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "apellido": user[2],
            "correo": user[3],
            "password": user[4],
            "fecha": user[5],
            "credito": user[6],
            "foto": user[7],
            "idpais": user[8],
            "idestadousuario": user[9],
            "idtipousuario": user[10]
        }

        Users.push(userSchema);
    })

    //res.json(Users);
    res.status(200).json(Users);

})


//agregar cantidad vendedor

router.put('/creditosvendedor', async (req, res) => {

    const {idusuario} = req.body;
    const {credito} = req.body;

        sql2 = "update usuario set credito=:credito where id_usuario=:idusuario";
    
        await BD.Open(sql2, [credito,idusuario], true);
    
        res.status(201).json({
            msg:"informacion agregada correctamente"
        })

})




module.exports = router;

