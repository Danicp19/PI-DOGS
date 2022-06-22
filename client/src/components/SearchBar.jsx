import React, { useState } from "react";
// import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getDogsName } from "../actions";
import s from "../css/SearchBar.module.css"


export default function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    console.log(name)
    function handleImput(e) {
        e.preventDefault()

        setName(e.target.value)//value de imput toma value de state


    }
    function handleSubmit(e) {

        if (name.length === 0) { return alert('Dog name is required') }
        else {
            e.preventDefault()
            dispatch(getDogsName(name))
        }
    }


    return (
        <div className={s.bar}>
            <input className={s.input} type="text" placeholder="Dog Name..." onChange={(e) => handleImput(e)} />
            <button name="name" className={s.button} type="submit" onClick={(e) => handleSubmit(e)}><i class="fas fa-search fa-2x"></i></button>
        </div>
    )
}