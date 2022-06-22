const { Router } = require('express');
require("dotenv").config();
const axios = require("axios")
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {

    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

    const apiInfo = apiUrl.data.map(elm => {

        return {
            id: elm.id,
            name: elm.name,
            img: elm.image.url,
            life_span: elm.life_span,
            weight2: elm.weight.metric,//split("-"),//esta
            weight: elm.weight.imperial,//.split("-"),//libras
            height: elm.height.imperial,//inches
            temperament: elm.temperament,
            // h:elm.weight.imperial.split("-")[0]
            // description: elm.description,  //se necesita la ruta id: //lo que necesito
            // released: elm.released,
            // rating: elm.rating,
            // platforms: elm.platforms,//.map(elm => elm) ,//por que devuelve un arreglo tambn con id ?--
            //para los details platforms: elm.platforms.map(elm => elm.platform.name).join(", "),
            //         genres: elm.genres.map(elm => elm.name).join(", ")

        }
    })
    return apiInfo


}


const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"], //pra que haga la relacion si no incluyo el modelo al crear vg no me trae el vg con genre
            through: {
                attributes: [] // comprobacion que va siempre ocultar obj anidado no deseadp de los results
            }
        }
    })
}

const getAllDogs = async () => {

    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const totalInfo = apiInfo.concat(dbInfo)
    return totalInfo                                            //arrays
}

router.get('/dogs?', async (req, res) => {

    const name = req.query.name
    let dogsTotal = await getAllDogs()
    const api = await getApiInfo()
    const db = await getDbInfo()
    if (name) {
        try {
            let response = await api.filter(elm => elm.name.toLowerCase().includes(name.toLowerCase()))
            const infoDb = await db.filter(elm => elm.name.toLowerCase().includes(name.toLowerCase()));
            const results = infoDb.concat(response)
            return res.send(results)
        } catch (error) {
            return console.log("No se encontro el Dog")
        }
    } else {
        res.status(200).send(dogsTotal)
    }
});
// router.get('/dogs?', async (req, res) => {

//     const dogsDb = await getDbInfo()
//     let dogsTotal = await getAllDogs()
//     const name = req.query.name

//     if (name) {
//         try {
//             let response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
//             const info = response.data.map(elm => {
//                 return {
//                     id: elm.id,
//                     name: elm.name,
//                     // img: elm.image.url,
//                     img: elm.reference_image_id,
//                     life_span: elm.life_span,
//                     weight: elm.weight.metric,
//                     weight2:elm.weight.imperial,
//                     height: elm.height,
//                     temperament: elm.temperament

//                 }
//             });

//             const infoDb = await dogsDb.filter(elm => elm.name.toLowerCase().includes(name.toLowerCase()));
//             const results = infoDb.concat(info).splice(0, 15)
//             return res.send(results)
//         } catch (error) {
//             return console.log("No se encontro el Dog")
//         }
//     } else {
//         res.status(200).send(dogsTotal)
//     }
// });

router.get('/dogs', async (req, res) => {

    let dogsTotal = await getAllDogs()
    res.status(200).send(dogsTotal)

});


router.get("/dogs/:id", async (req, res) => {
    const { id } = req.params //destructurado

    try {
        if (id.includes("-")) {
            const dogDb = await Dog.findOne({
                where: { id },
                include: {
                    model: Temperament,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })
            const info = {

                name: dogDb.name,
                img: dogDb.img,
                temperaments: dogDb.temperaments,
                height: dogDb.height,
                weight: dogDb.weight,
                life_span: dogDb.life_span,
                createdInDb: true

                // platforms: videogameDb.platforms,
                // genres: videogameDb.genres.map(elm => elm.name).join(", ")
            }
            res.status(200).json(info)

        } else {
            const dogApi = await getApiInfo()
            let result = dogApi.filter(el => el.id == id)
            res.status(200).json(result)

        }
    } catch (error) {
        res.status(404).send("No se encontro el Dog")
    }
})






router.get("/temperaments", async (req, res) => {

    try {
        const apiTemperaments = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const temperamentList = apiTemperaments.data.map(elm => elm.temperament)

        const temps = temperamentList.toString().split(",").filter(elm => elm.length > 0)
        //""false

        temps.forEach(elm => {
            let i = elm.trim()
            Temperament.findOrCreate({  //para que solo haya uno de cada uno
                where: {
                    name: i
                }
            })
        })
        const Alltemperaments = await Temperament.findAll()
        res.status(200).json(Alltemperaments)//.s
    } catch (error) {
        res.status(404).json({ error })//.s
    }
})


router.post('/dogs', async (req, res) => {//llega por body

    let {
        name,
        img,
        life_span,
        weight1,
        weight2,
        height1,
        height2,
        temperaments,
        createdInDb,

    } = req.body
    //temperaments = temperaments.join(",")//str

    let dogCreated = await Dog.create(
        {
            name,
            img,
            life_span,
            weight: weight1 + " - " + weight2,
            weight2: Math.round(weight1 * 0.453592)  + " - " + Math.round(weight2 * 0.453592),
            height: height1 + " - " + height2,
            createdInDb,
        }
    )
    let temperamentsCreatedDb = await Temperament.findAll( //otra relacion que coincida con el body
        {
            where: {
                name: temperaments//del body
            }
        }
    )
    dogCreated.addTemperament(temperamentsCreatedDb)
    res.status(200).send("Dog creado con exito!")
});


module.exports = router;
