const { response } = require("express");
const { Producto } = require("../models");

//Actualizar categoria
//borrarCategoria

const obtenerProductos = async (req, res = response) => {
  const { limite = 50, desde = 0 } = req.query;
  const query = { estado: true };

  try {
    const productos = await Producto.find(query).sort({ createdAt: -1})
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json(error)
  }

  // const productos = await Promise.all([
  //   Producto.countDocuments(query),
  //   Producto.find(query)
  //     .populate("usuario", "nombre")
  //     .populate("categoria", "nombre")
  //     .skip(Number(desde))
  //     .limit(Number(limite)),
  // ]
  // );

  // res.json(productos);

  
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

const actualizarPTalla = async (req, res = response) => {
  const { n } = req.body;

  if (n === 10) {
    return res.status(200).json({ message: 'No se realizaron cambios ya que n es 10.' });
  }

  try {
    const productos = await Producto.find({});

    productos.forEach(async (producto) => {
      producto.tallas.forEach((talla) => {
        talla.posicion.forEach((pos) => {
          pos.py += n;

          
          if (pos.py > 10) {
            pos.py = (pos.py % 10) || 10;// Reinicia py a 1 si excede 10
          }
        });
      });

      await producto.save();
    });

    res.status(200).json({ message: `Se actualizaron las posiciones correctamente.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar posiciones' });
  }


  // try {
  //   const result = await Producto.updateMany(
  //     {}, // Filtro vacío para seleccionar todos los documentos
  //     { $inc: { 'tallas.$[].posicion.$[].py': n } } // Incrementa el campo 'tallas.posicion.py' por n
  //   );

  //   res.json({ message: `Se actualizaron ${result.modifiedCount} documentos` });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Error al actualizar posiciones' });
  // }
};

const venderTalla = async (req, res = response) => {
  try {
    const { id, idTalla } = req.params;
    
    const producto = await Producto.findById(id);
    const talla = producto.tallas.id(idTalla);

    if (talla.cantidad > 0) {
      talla.cantidad -= 1;
      
      if (talla.cantidad === 0) {
        talla.inEstante = false;
        talla.existencia = false;
      }

      const allTallasSoldOut = producto.tallas.every((t) => t.cantidad === 0);
      if (allTallasSoldOut) {
        producto.estado = false;
      }

      await producto.save();
      res.status(200).json({ message: 'Producto vendido exitosamente.' });
    } else {
      res.status(400).json({ message: 'Cantidad insuficiente.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al vender producto.' });
  }
  
};


const anaquelTalla = async (req, res = response) => {
  try {
    const { id, idTalla, inEstante } = req.body;
    
    const producto = await Producto.findById(id);
    const talla = producto.tallas.id(idTalla);


    talla.inEstante = inEstante;
    
    await producto.save();
    res.json({message: `Anaquel Actualizado`})

  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar anaquel' });
  }
  
};

const sincronizar = async (req, res = response) => {
    const { id, idTalla } = req.params;
    const producto = await Producto.findById(id);
    const talla = producto.tallas.id(idTalla);

    console.log(talla);

    posy = talla.posicion[0].py
    //console.log(posy);

    n = (11 - posy);

    //console.log(n);



    if (n === 10) {
      return res.status(200).json({ message: 'No se realizaron cambios ya que n es 10.' });
    }
  
    try {
      const productos = await Producto.find({});
  
      productos.forEach(async (producto) => {
        producto.tallas.forEach((talla) => {
          talla.posicion.forEach((pos) => {
            pos.py += n;
  
            
            if (pos.py > 10) {
              pos.py = (pos.py % 10) || 10;// Reinicia py a 1 si excede 10
            }
          });
        });
  
        await producto.save();
      });
  
      res.status(200).json({ message: `Se actualizaron las posiciones correctamente.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar posiciones' });
    }
  
};



module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
  buscarProducto,
  actualizarPTalla,
  venderTalla,
  anaquelTalla,
  sincronizar
};
