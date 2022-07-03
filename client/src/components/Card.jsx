import React from "react";
import s from "../css/Card.module.css"


export default function Card({ name, img, temperaments, weight, weight2 }) {



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

                <img className={s.img} src={img} alt="image not found" />
                <div className={s.right}>

                    <h2><i class="fas fa-paw "></i> {name}</h2>

                    <div className={s.temperaments}> 
                        <h4 >{temperaments}</h4>
                      </div>  


                    <div className={s.weight} >
                        <i class="fas fa-balance-scale-right fa-lg"></i>

                        <div className={s.weight2} >
                            <h5>{weight} lb</h5>
                            <h5>{weight2} kg</h5> </div>

                    </div>
                </div>
            </div>

        </div >
    )
}

