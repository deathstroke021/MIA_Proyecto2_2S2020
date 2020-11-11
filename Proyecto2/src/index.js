const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//imports
const personRoutes = require('./routes/person-rotes');

//settings
app.set('port', 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use(personRoutes);

/*var smtpTransport = nodemailer.createTransport('SMTP',{
    service: 'Gmail',
    auth:{
        user:'fernandoarmira20@gmail.com',
        pass:'halo21951124'
    }   
});*/

var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user:'proyectoarchivos2s2020@gmail.com',
        pass:'archivos123'
    }   
});

var mivariable='<strong>Hola</strong>';
mivariable=mivariable+'<img src="https://es.jumpseller.com/images/learn/choosing-platform/laptop.jpg">';

var mailOptions={
    from:'Fernando Armira',
    to:'2864934620101@ingenieria.usac.edu.gt',
    subject: 'Mi asunto',
    text: 'Hola mundo',
    html: mivariable
}


app.get('/enviaremail',function(req,res){
    smtpTransport.sendMail({
        from:'Fernando Armira',
        to:'2864934620101@ingenieria.usac.edu.gt',
        subject: 'Mi asunto',
        text: 'Hola mundo',
        html: mivariable

    },
    function(error,respuesta){
        if(error){
            console.log(error);
        }else{
            res.send('Mensaje Enviado');
        }
    });

});

app.get('/verificarcorreo/:correo',function(req,res){
    const {correo} = req.params;

    smtpTransport.sendMail({
        from:'Fernando Armira',
        to: correo,
        subject: 'Verificacion de cuenta',
        text: 'Hola mundo',
        html: '<strong>Si te has registrado en la tienda en linea, etra en el siguiente enlace para verificar tu cuenta:</strong><br>' + '<a href="http://localhost:4200/verificar">Verificar cuenta</a>' + '<img src="https://es.jumpseller.com/images/learn/choosing-platform/laptop.jpg">'

    },
    function(error,respuesta){
        if(error){
            console.log(error);
        }else{
            res.send('Mensaje Enviado');
        }
    });

});

app.get('/recuperarpassword/:correo',function(req,res){
    const {correo} = req.params;

    smtpTransport.sendMail({
        from:'Fernando Armira',
        to: correo,
        subject: 'Restablecer contraseña',
        text: 'Hola mundo',
        html: '<strong>Si desea restablecer su contraseña, etre en el siguiente enlace:</strong><br>' + '<a href="http://localhost:4200/recuperar">Restablecer contraseña</a>' + '<img src="https://www.muycomputer.com/wp-content/uploads/2018/06/WiFi-password.jpg">'

    },
    function(error,respuesta){
        if(error){
            console.log(error);
        }else{
            res.send('Mensaje Enviado');
        }
    });

});

app.get('/correobloqueo/:parametro',function(req,res){
    const {parametro} = req.params;

    var param = parametro.split("-");

    smtpTransport.sendMail({
        from:'Fernando Armira',
        to: param[0],
        subject: 'Publicacion bloqueada',
        text: 'Hola mundo',
        html: '<strong>La publicacion del producto: ' + param[1] + ' ha sido bloqueada por infligir las reglas de la plataforma, para mas informacion contacte al administrador.</strong><br>' + '<img src="https://image.freepik.com/vector-gratis/mensaje-alerta-notificacion-movil-alertas-error-peligro-problema-virus-telefono-inteligente-o-notificaciones-problemas-mensajes-correo-no-deseado-inseguros_100456-461.jpg">'

    },
    function(error,respuesta){
        if(error){
            console.log(error);
        }else{
            res.send('Mensaje Enviado');
        }
    });

});


//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})
