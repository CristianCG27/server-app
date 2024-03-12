const {Schema, model} = require('mongoose');


const OrdenSchema = Schema({
    userId:{
        type:String, 
        required: true
    },
    customerId:{
        type:String, 
        required: true
    },
    productId:{
        type:Schema.Types.ObjectId, 
        ref:'Producto',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    subtotal:{
        type: Number,
        required: true
    },
    status_entrega:{
        type: String ,
        required: true,
        default: 'pending'
    },
    status_pago:{
        type: String ,
        required: true
    },
    total:{
        type: Number,
        required: true
    }

})

module.exports = model('Order', OrdenSchema);