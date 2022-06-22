import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from "../actions";
import { Link } from "react-router-dom"
import s from "../css/Detail.module.css"


export default function Detail(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))//id
    }, [dispatch])
    //console.log(props)
    var detailDog = useSelector((state) => state.detail)//store
    console.log(detailDog)

    //const {name, imagen, pesoMax, pesoMin, alturaMax, alturaMin, temperamento, edadMax, edadMin} = detailDog;
    let name, img, temperament, height, weight, life_span, temperaments
    if (detailDog[0]) { //una vez ya se hayan traido los datos renderizalos
        name = detailDog[0].name;
        img = detailDog[0].img;
        temperament = detailDog[0].temperament
        height = detailDog[0].height;
        weight = detailDog[0].weight;
        life_span = detailDog[0].life_span;

    } 
    if(detailDog.createdInDb){
       temperaments =detailDog.temperaments.map(e => e.name).join(" ,")
    }


    return (
        <div className={s.container}>

            <div className={s.all} >
                <div className={s.buttond}>
                    <Link to="/home">
                        <button className={s.button}>BACK</button>
                    </Link>

                </div>
                <h1 >{name || detailDog.name}</h1>
                <div className={s.dataimage}>

                    <img className={s.img} src={img || detailDog.img} alt="image is not avilable" height="300px" width="520px" />
                </div>


                <h3>Temperaments: {temperament || temperaments}</h3>
                <div className={s.data}>

                    <h3>Height:{height || detailDog.height}</h3>
                    <h3>Weight:{weight || detailDog.weight}</h3>
                </div>

                <h4>Life span: {life_span || detailDog.life_span}</h4>

            </div>

        </div>

    )

}