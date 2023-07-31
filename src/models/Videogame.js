const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
       
    }
    ,
   name:{
      type: DataTypes.STRING,
      allowNull: false,
   },
   description:{
      type:DataTypes.STRING,
      allowNull: false,
   },

   imagen:{
      type: DataTypes.STRING,
      allowNull: false,
   },
   
   releaseDate:{
      type: DataTypes.STRING,
      allowNull: false,
   },
   rating:{
    type: DataTypes.STRING,
    allowNull: false,
 },
}, { timestamps: false });
};
/*MODELO 1 | Videogames

ID (deben ser distintos a los que vienen de la API). *
Nombre. *
Descripción. *
Plataformas. *
Imagen. *
Fecha de lanzamiento. *
Rating. *

📍 MODELO 2 | Genres

ID. *
Nombre. */
