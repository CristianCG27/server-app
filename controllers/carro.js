const { response, request, query } = require("express");
const { Producto, Carro } = require("../models");
//const producto = require("../models/producto");

const agregarCarro = async (req = request, res = response) => {
  const { uid } = req.params;
  const { cartItem, quantity } = req.body;

  try {
    // Check if the cart already exists for the user
    const carro = await Carro.findOne({ uid });

    if (carro) {
      // Check if the cartItem already exists in the cart
      const existingProduct = carro.productos.find(
        (producto) => producto.cartItem.toString() === cartItem
      );

      if (existingProduct) {
        // Increment the quantity if the cartItem exists
        existingProduct.quantity += quantity;
      } else {
        // Add the new product to the cart
        carro.productos.push({ cartItem, quantity: quantity });
      }

      // Save the updated cart
      await carro.save();
      res.status(200).json("Product added to cart");
    } else {
      // Create a new cart and add the product
      const newCarro = new Carro({
        uid,
        productos: [{ cartItem, quantity: quantity }],
      });

      const savedCart = await newCarro.save();
      res.status(200).json("Product added to cart");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const obtenerCarro = async (req, res = response) => {
  const { uid } = req.params;
  try {
    const carro = await Carro.findOne({ uid });
    if (carro) {
      carro.populate(
        "productos.cartItem",
        "_id name imageUrl precio categoria"
      );
      res.status(200).json(carro);
    } else {
      const newCarro = new Carro({
        uid,
      });

      await newCarro.save();
      res.status(200).json("Hola carro");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const borrarProductoCarro = async (req = request, res = response) => {
  //const {cartItemId} = req.params;

  const { uid } = req.params;
  const { cartItem, ...body } = req.body;

  try {
    const carro = await Carro.findOne({ uid });

    if (carro) {
      // Check if the cartItem already exists in the cart
      const existingProduct = carro.productos.find(
        (producto) => producto.cartItem.toString() === cartItem
      );

      if (existingProduct) {
        const updatedCart = await Carro.findOneAndUpdate(
          { "productos.cartItem": cartItem },
          { $pull: { productos: { cartItem: cartItem } } },
          { new: true }
        );
        return res.status(200).json(updatedCart);
      } else {
        return res
          .status(404)
          .json({ message: "El producto No está en el carro" });
      }
    } else {
      return res.status(404).json({ message: "No existe el producto" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete cart item" });
  }
};

//DELETE
const resetCarro = async (req, res = response) => {
  const { uid } = req.params;

  try {
    const carro = await Carro.findOneAndDelete({ uid: uid });

    res.status(200).json("Cart has been reset");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  agregarCarro,
  obtenerCarro,
  borrarProductoCarro,
  resetCarro,
};
