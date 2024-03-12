const mongoose = require("mongoose");

const dbConection = async () => {
  try {

    await mongoose.connect( process.env.MONGODB_CNN, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    });

    console.log('Base de datos online');

} catch (error) {
    console.log(error);
    throw new Error('Error en la conexión con la BD');
  }
}

module.exports = {
  dbConection,
}
