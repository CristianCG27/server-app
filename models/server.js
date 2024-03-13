const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");
const fileUpload = require('express-fileupload');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth:       '/api/auth',
      buscar:     '/api/buscar',
      categorias: '/api/categorias',
      productos:  '/api/productos',
      usuarios:   '/api/usuarios',
      uploads:    '/api/uploads',
      ordenes:    '/api/ordenes',
      carro:    '/api/carro',
      //busProducto:'/api/productos/buscar' 
      

    }

    // this.usuariosPath = '/api/usuarios';
    // this.authPath = '/api/auth';

    //*Conectar a base de datos
    this.conectarDB();

    //* Middlewares
    this.middlewares();

    //* Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB(){
    await dbConection();
  }

  middlewares() {

    // CORS
    this.app.use(cors());
    
    //Parseo y lectura del body
    this.app.use(express.json());

    //Directorio público
    this.app.use(express.static("public"));

    //Carga de archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));


  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    this.app.use(this.paths.ordenes, require("../routes/ordenes"));
    this.app.use(this.paths.carro, require("../routes/carro"));
    //this.app.use(this.paths.buscProducto, require("../routes/productos/buscar"));
    
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto: ", this.port);
    });
  }
}

module.exports = Server;
