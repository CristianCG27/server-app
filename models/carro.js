const mongoose = require("mongoose");

const CarroSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    productos: [
      {
        cartItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto"
        },
        quantity: {
          type: Number,
          default: 1
        },
      },
    ],
  },
  { timestamps: true }
);

// CarroSchema.methods.toJSON = function() {
//     const { __v, ...data } = this.toObject();
//     return data;
// }

module.exports = mongoose.model("Carro", CarroSchema);
