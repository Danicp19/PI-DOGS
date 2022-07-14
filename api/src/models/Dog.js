const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {

    id: {            //para que no se repitan ids random --
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },


    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,//libras
    },
    weight2: {
      type: DataTypes.STRING,
      allowNull: false,//libras
    },
    life_span: {
      type: DataTypes.STRING,

    },
    img: {
      type: DataTypes.TEXT,
      defaultValue:"https://media.istockphoto.com/photos/dog-watching-tv-on-the-couch-picture-id680810342?k=20&m=680810342&s=612x612&w=0&h=wQVeNcnq0CIqpGK88zA-pqmzbyK_6diiHR7kAq5PbxQ="

    },
    createdInDb: {//para hacer una distincion 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }



  }, {
    timestamps: false,
  });
};
