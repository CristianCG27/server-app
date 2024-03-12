const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Producto, Categoria } = require('../models');
const categoria = require('../models/categoria');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

//GET  url/api/buscar/productos/jshas
//                    categoria/      ?id  ?nombre

const buscarUsuarios = async( termino = '', res = response ) => {
     
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regEx = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({
        $or: [{ nombre: regEx }, { correo:regEx }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    })
}


const buscarCategorias = async( termino = '', res = response ) => {
     
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regEx = new RegExp( termino, 'i' );

    const categorias = await Categoria.find({ nombre: regEx,  estado: true});

    res.json({
        results: categorias
    })
}

const buscarProductos = async( termino = '', res = response ) => {
     
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regEx = new RegExp( termino, 'i' );

    const productos = await Usuario.find({ nombre: regEx, estado: true }).populate('categoria', 'nombre');

    res.json({
        results: productos
    })
}


const buscar = (req, res=response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes( coleccion )) {
        return res.status(400).json({
            msg: `Las coleccones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            
            break;
        case 'productos':
            buscarProductos(termino, res);
            
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta búsqueda'
            })
            break;
    }


}



module.exports = {
    buscar
}