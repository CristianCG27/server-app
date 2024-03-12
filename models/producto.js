const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required:[true, 'El nombre es obligatorio'],
        unique:true
    },
    titulo:{
        type: String,
        required: true

    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    imageUrl:{
        type: String
    },
    oldPrice:{
        type: String, 
        required: true
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
    estado: {
        type: Boolean,
        default: true,
        required: true
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
    descripcion: {
        type: String
    },
    disponible:{
        type: Boolean,
        default: true
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
    }
});

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Producto', ProductoSchema);



