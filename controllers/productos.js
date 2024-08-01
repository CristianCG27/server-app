const { response } = require("express");
const { Producto } = require("../models");

//Actualizar categoria
//borrarCategoria

const obtenerProductos = async (req, res = response) => {
  const { limite = 50, desde = 0 } = req.query;
  const query = { estado: true };

  try {
    const productos = await Producto.find().sort({ createdAt: -1})
    res.json(productos);
  } catch (error) {
    res.status(500).json(error)
  }

  // const productos = await Promise.all([
  //   //Producto.countDocuments(query),
  //   Producto.find(query)
  //     .populate("usuario", "nombre")
  //     .populate("categoria", "nombre")
  //     .skip(Number(desde))
  //     .limit(Number(limite)),
  // ]
  // );

  
};

const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);
    // .populate("usuario", "nombre")
    // .populate("categoria", "nombre");
  //const {_v, createdAt, ...productoData} = producto._doc;

  res.json(producto);
};

const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({
    nombre: body.nombre.toUpperCase(),
  });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`,
    });
  }

  //Generar la data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  // Guardar categoria
  await producto.save();
  // await producto
  //   .populate("usuario", "nombre")
  //   .populate("categoria", "nombre")
  //   .execPopulate();

  res.status(201).json(producto);
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
  ///
  await producto
    .populate("usuario", "nombre")
    .populate("categoria", "nombre")
    .execPopulate();

  res.json(producto);
};

const borrarProducto = async (req, res = response) => {
  const { id } = req.params;
  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(productoBorrado); //status 200
};

const buscarProducto = async (req, res = response) => {
  try {
    const { id } = req.params;
    const results = await Producto.aggregate(
      //minuto 39.52
      [
        {
          $search: {
            index: "zapatos",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]
    );
    res.json(results); //status 200
  } catch (error) {
    res.status(400).json("Error al obtener el producto");
  }
};



module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
  buscarProducto
};
