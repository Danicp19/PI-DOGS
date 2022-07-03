import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDetail ,clearDetail} from "../actions";
import { Link } from "react-router-dom"
import s from "../css/Detail.module.css"


export default function Detail(props) {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(clearDetail())
        dispatch(getDetail(props.match.params.id))//id
        setTimeout(() => {
            setLoading(false);
        }, 500)

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
    if (detailDog.createdInDb) {
        temperaments = detailDog.temperaments.map(e => e.name).join(", ")
    }


    return (


        <div className={s.container}>

    

            {loading ? (
                <div className={s.loading}>
                    <i class="fas fa-bone fa-spin fa-3x "></i>
                    <i class="fas fa-bone fa-spin fa-3x "></i>
                    <i class="fas fa-bone fa-spin fa-3x "></i>
                </div>
            ) : (
                <div className={s.all} >
                    <div className={s.buttond}>
                        <Link to="/home">
                            <button className={s.button}>BACK</button>
                        </Link>

                    </div>
                    <div className={s.title}>
                        <i class="fas fa-paw fa-2x"></i>
                        <h1 >{name || detailDog.name}</h1>
                        <i class="fas fa-paw fa-2x"></i>
                    </div>

                    <div className={s.dataimage}>

                        <img className={s.img} src={img || detailDog.img} alt="image is not avilable" />
                    </div>

                    <div className={s.datatem}>
                        <h3 className={s.tem}> Temperaments: {temperament || temperaments}</h3>
                    </div>
                    <div className={s.data}>

                        <h3>Height: {height || detailDog.height} in</h3>
                        <h3>Weight: {weight || detailDog.weight} lb</h3>
                    </div>
                    <div className={s.span}>
                        <h3>Life span: {life_span || detailDog.life_span} years</h3>
                    </div>
                    <div className={s.dogs}>
                        <img />
                    </div>
                </div>
           
 )
            }
        </div>


           
    )

}