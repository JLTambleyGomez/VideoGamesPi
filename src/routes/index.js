const { Router } = require('express');
const { getVideoGames } = require( "../controllers/getVideoGames")
const {getVideogameById}=require( "../controllers/getvideogamesById")
const {login}=require( "../controllers/Login")
const {getGenres}=require( "../controllers/getgenres")
const {PostUser}=require( "../controllers/postUser")
const {getPf}=require( "../controllers/getplatforms")
const { SearchGames } = require('../controllers/get15videogames');
const CreateVideogame = require('../controllers/postvideogames');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.get("/videogames",getVideoGames);
router.get("/login",login);
router.post("/login" , (req,res)=>{PostUser (req,res);})
router.get("/genres",getGenres);
router.get("/platforms",getPf);
router.get('/videogames/name', SearchGames);
router.get("/videogames/:idVideogame",getVideogameById);
router.post('/videogames',async(req,res) => {
    try{
 const {name,
    description,
    platforms,
    imagen,
    releaseDate,
    rating,
    genres,} = req.body;
 const newVideogame = await CreateVideogame({
    name,
    description,
    platforms,
    imagen,
    releaseDate,
    rating,
    genres,});
 res.status(201).json(newVideogame)
    }catch(error){
        res.status(500).json({error: error.message});}
}),

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
