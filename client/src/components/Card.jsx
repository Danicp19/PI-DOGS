import React from "react";
import s from "../css/Card.module.css"


export default function Card({ name, img, temperaments, weight,weight2 }) {



    // var temperaments =temperaments.map(elm => {
    //     return (
    //         elm.name
    //     )

    // }).join(", ")
    // temperaments = temperaments.map(elm => elm.temperaments.name).toString()
    // temperaments=el.temperaments[0].name ? el.temperaments.map(el => el.name) : el.temperaments
    // var temperaments= createdInDB ? temperaments.map(elm=>elm.name + ", "):temperaments 


    return (
        <div className={s.container}>

            <div className={s.card}>
                <h2><i class="fas fa-paw"></i> {name}</h2>
                <img className={s.img} src={img} alt="image not found" />
                <h5 >{temperaments}</h5>
                <i class="fas fa-balance-scale-right"></i>
                <h5>{weight} lb</h5>  
                <h5>{weight2} kg</h5>  
            </div>

        </div>
    )
}

