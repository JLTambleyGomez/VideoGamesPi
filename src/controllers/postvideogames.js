const { Videogame } = require("../db");


const createVideogame = async ({
  
  name,
  description,
  platforms,
  imagen,
  releaseDate,
  rating,
  genres,
}) => {

  const id = Date.now() % 6000000;
  // console.log(id);

  const newVideogame = await Videogame.create({
    id,
    name,
    description,
    imagen,
    releaseDate,
    rating,
  });
  await newVideogame.addGenres(genres);
  await newVideogame.addPlatforms(platforms);

  return newVideogame;
};

module.exports = createVideogame;
