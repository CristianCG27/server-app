const { response } = require("express");
const Ordenes = require("../models/orden");

const getOrdenes = async (req, res = response) => {
  const allOrdenes = await Ordenes.find();

  res.status(200).json("Hola ordenes");
  //res.status(200).json(allOrdenes);
};

const getOrdenUsuario = async (req, res = response) => {
  const { id } = req.user.id; //QUIZA ERROR 

  try {
    const ordenUsuario = await Ordenes.find(id)
      .populate({
        path: "productId",
        select: "-sizes -oldPrice -description -category", // Exclude 'sizes' and 'location' fields
      }) // Populate the 'productId' field
      .exec();

    res.status(200).json(ordenUsuario);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user orders" });
  }
};

module.exports = {
  getOrdenes,
  getOrdenUsuario,
};
