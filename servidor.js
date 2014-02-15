var express = require("express");
var dust = require("dustjs-linkedin");
var cons = require("consolidate");

var app = express();
app.listen(8000);

//nombre logico nombre fisico(carpeta real)
//------configuración de carpetas estaticas -----
app.use("/css", express.static(__dirname+"/css"));
app.use("/css", express.directory(__dirname+"/css"));

app.use("/imagenes", express.static(__dirname+"/imagenes"));
app.use("/videos", express.static(__dirname+"/videos"));

// --- CONFIGURACION DEL SISTEMA DE TEMPLATES -----
//le decimos q sistema de templates usamos
app.engine("dust",cons.dust);
app.set("views",__dirname+"/vistas");
app.set("view engine","dust");

//para habilitar la recepción de parametros post
app.use(express.urlencoded());


// --- DEFINICION DE RUTAS ----
app.get("/inicio2", function(req, res){
	res.send("Bienvenido a mi página");
});

app.get("/", function(req, res){
	var frase = "Hola a todos";
	res.render("index",{
		frase: frase,
		datos:{
			nombre:"ismael",
			apellido:"robles"
		}
	});
});

app.post("/suscribir", function(req, res){
	console.log("el email es: " + req.body.email);
	res.send("info recibida");
});

app.get("/contacto", function(req, res){
	res.render("contacto");
});

app.post("/postcontacto", function(req, res){
	console.log("el nombre es: " + req.body.nombre);
	res.send("Contacto enviado.");
});

console.log("Hola mundo");
