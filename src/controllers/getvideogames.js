  const axios = require('axios');
  require('dotenv').config();
  const {APIKEY}= process.env
  const {Genres, Platforms, Videogame} = require('../db');

  const getVideoGames = async (req, res) => {
    try {
      const pageSize = 15;
      const pageNumber = req.query.page;
      const { data } = await axios.get('https://api.rawg.io/api/games', {
        params: {
          key: "45ceb1ea70814bde8dd60ed04b9964e5",
          page: pageNumber,
          page_size: pageSize
        }
      });

      const dbVideoGames = await Videogame.findAll({
        include: [Genres, Platforms],
      });

      const allVideoGames = [...data.results.slice(0, 100), ...dbVideoGames];

      const videoGames = await Promise.all(allVideoGames.map(async (videogame) => {
        const genres = videogame.genres
          ? await Genres.findAll({
              where: { id: videogame.genres.map((genre) => genre.id) },
              attributes: ['name'],
            })
          : [];
          
        const platforms = videogame.platforms
          ? await Platforms.findAll({
              where: {
                id: videogame.platforms.map((platform) =>
                  platform.platform ? platform.platform.id : platform.id
                ),
              },
              attributes: ['name'],
            })
          : [];
          
        return {
          id: videogame.id,
          name: videogame.name,
          description: videogame.description,
          released: videogame.released,
          rating: videogame.rating,
          imagen: videogame.background_image,
          platforms: platforms.map((platform) => platform.name),
          genres: genres.map((genre) => genre.name),
        };
      }));
      
      return res.status(200).json(videoGames);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  };


  module.exports = {
    getVideoGames,
  };
