const axios = require('axios');
require('dotenv').config();
const {APIKEY}= process.env
const {Platforms } = require('../db');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPf = async (req, res) => {
    try {
        const pfCount = await Platforms.count();
        if (pfCount !== 0) {
            const pfdb = await Platforms.findAll();
            return res.status(200).json(pfdb);
        }
        else {

      const { data } = await axios.get('https://api.rawg.io/api/platforms', {
        params: {
          key: APIKEY
        }
      });
  
      const pfs = data.results.map(pf => ({
        id: pf.id,
        name: pf.name
      }));
  
      // Guardar los géneros en la base de datos
      await Platforms.bulkCreate(pfs, { ignoreDuplicates: true });

      return res.status(200).json(pfs);
  }  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  };
  

module.exports = {
  getPf,
};
