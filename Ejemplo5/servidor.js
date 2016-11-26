var servidor = require('http');
var url = require('url');
var fs = require('fs');

function iniciar(enrutar, manejador) {
    function arrancarServidor(requiere, respuesta) {

        var ruta = url.parse(requiere.url).pathname;

        if(ruta == "/"){
            ruta = "index.html";
        }

        console.log("Alguien se ha conectado");

        //var contenido = enrutar(manejador, ruta, respuesta);

        var index = fs.readFileSync("www/"+ruta);

        //guarda en un fichero txt lo que se muestra en consola. flag:a = abrir son reemplazar
        var registro = fs.createWriteStream('registro.txt',{'flags':'a'});
        registro.write(ruta + '\n');
        
        respuesta.writeHead(200, {"Content-Type": "text/html"});
        respuesta.write(index);
        respuesta.end();
    };

    servidor.createServer(arrancarServidor).listen(8888);
}

exports.iniciar = iniciar;