const {Schema, model, default: mongoose} = require('mongoose');

const CartSchema = Schema({
    userId:{
        type: String, 
        required:true
    },
    productos: [
        {
            cartItem:{
                type: Schema.Types.ObjectId,
                ref: 'Producto'

            },
            quantity:{
                type: Number, 
                default: 1
            }
        }
    ]
});

// CartSchema.methods.toJSON = function() {
//     const { __v, estado, ...data } = this.toObject();
//     return data;
// }


module.exports = model('Cart', CartSchema);





