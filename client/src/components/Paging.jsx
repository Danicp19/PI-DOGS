import React from "react";
import s from "../css/Paging.module.css"

export default function Paging({ dogsPerPage, allDogs, paging }) {
    const pageNumbers = []
    //dividir videogames por los que quiero por pagina
    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) { //cantidad de casillas paginadas
        pageNumbers.push(i);

    }
    return (
        <nav>
            <ul className={s.pagination}>

                {pageNumbers && pageNumbers.map(number => (

                    <li className={s.button} key={number}>
                        <a  onClick={() => paging(number)}>{number}</a>

                    </li>
                )
                )}
                
            </ul>
        </nav>
    )

}