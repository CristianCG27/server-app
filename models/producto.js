const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required:[true, 'El nombre es obligatorio'],
        unique:true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    disponible:{
        type: Boolean,
        default: true
    },
    img:{
        type: [String]
    },
    tallas: {
        type: [
            {
                talla: {
                    type: String,
                    required: false,
                },
                isSelected: {
                    type: Boolean,
                    default: false,
                    required: false,
                },
            },
        ],
        required: true,
    },
     posicion: {
        type: [
            {
                posx: {
                    type: String,
                    required: true,
                    
                },
                posy: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    productoPara: {
        type: String,
        required: true
    }
});

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = mongoose.model('Producto', ProductoSchema);



