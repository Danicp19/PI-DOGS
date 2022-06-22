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
      allowNull: true,
    },
    createdInDb: {//para hacer una distincion es mas facil acceder al videogame creado en db--
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }



  }, {
    timestamps: false,
  });
};
