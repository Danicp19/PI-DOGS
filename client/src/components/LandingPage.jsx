import React from "react";
import {Link} from "react-router-dom"
import s from "../css/Landing.module.css"



export default function LandingPage(){
    return(                     
        <div className={s.background}>  
       
            <Link to ="/home">
                <button className={s.LandingButton}></button>
            </Link>
        </div>
    )
}