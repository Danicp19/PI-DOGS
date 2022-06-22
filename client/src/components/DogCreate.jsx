import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { postDog, getTemperaments } from "../actions";
import { Link, useHistory } from "react-router-dom"
import s from "../css/DogCreate.module.css"

export default function DogCreate() {

    const dispatch = useDispatch()
    const history = useHistory()//metodo para redirigir a la ruta que yo diga
    const temperaments = useSelector((state) => state.temperaments)//traer los generos
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({//post
        name: "",
        img: "",
        temperaments: [],
        life_span: "",
        weight1: "",
        weight2: "",
        height1: "",
        height2: "",

    })
    console.log(input)
    function handleChange(e) {

        setInput({
            ...input,
            [e.target.name]: e.target.value //es el name de cada target
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))


        // const { name, value } = e.target
        // setInput({
        //     ...input,
        //     [name]: value //es el name de cada target
        // })
        // setErrors(validate({
        //     ...input,
        //     [name]: value
        // }))

    }


    function handleSelectTemperament(e) {
        setInput({
            ...input,
            temperaments: input.temperaments.includes(e.target.value) ? input.temperaments : [...input.temperaments, e.target.value]

        })
    }


    function validate(input) {
        let errors = {}
        if (!input.name) {//estado local
            errors.name = "Name is required"
        } else if (!input.height1) {
            errors.height = "Min height is required"
        } else if (!input.weight1) {
            errors.weight = "Min weight is required"
        } else if (!input.height2) {
            errors.height = "Max height is required"
        } else if (!input.weight2) {
            errors.weight = "Max weight is required"
        }
        return errors
    }

    function handleSubmit(e) {

        e.preventDefault()

        if (!input.name) { return alert('Name is required') }
        if (!input.height1) { return alert('Height is required') }
        if (!input.weight1) { return alert('Weight date is required') }
        if (!input.height2) { return alert('Height is required') }
        if (!input.weight2) { return alert('Weight date is required') }
        if (!input.life_span) { return alert('Life span is required') }
        // if (input.rating < 1 || input.rating > 5) { return alert('Rating must be a number between 1-5') }
        // if (isNaN(input.rating)) { return alert('Rating must be a number') }
        // if (input.platforms.length === 0) { return alert('Platforms is required') }
        if (input.temperaments.length === 0) { return alert('Temperaments is required') }

        dispatch(postDog(input))
        alert(`Dog ${input.name} successfully Created!!`)
        setInput({
            name: "",
            img: "",
            temperaments: [],
            life_span: "",
            weight1: "",//.split("-"),//libras
            height1: "",
            weight2: "",//.split("-"),//libras
            height2: "",
        })
        history.push("/home")
    }


    function handelDeleteTemperament(elm) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(result => result !== elm)
        })

    }


    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])


    return (

        <div className={s.container}>

            <h1 >Create your dog!</h1>
            <form className={s.form} onSubmit={(e) => handleSubmit(e)}>


                <div className={s.msgarea}>

                    <div>
                        <button className={s.button2} type="submit">Create</button>
                        <Link to="/home"> <button className={s.button}>Back</button></Link>
                    </div>
                </div>



                <div className={s.data}>
                    <label>Name:</label>
                    <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                    {errors.name && (
                        <p className={s.error}>{errors.name}</p>
                    )}


                    <label>Height:</label>
                    <input type="text" value={input.height1} name="height1" onChange={(e) => handleChange(e)} />
                    {errors.height1 && (
                        <p className={s.error}>{errors.height1}</p>
                    )}

                    <input type="text" value={input.height2} name="height2" onChange={(e) => handleChange(e)} />
                    {errors.height2 && (
                        <p className={s.error}>{errors.height2}</p>
                    )}

                    <label>Weight:</label>
                    <input type="text" value={input.weight1} placeholder="from 1 to 5 ..." name="weight1" onChange={(e) => handleChange(e)} />
                    {errors.weight1 && (
                        <p className={s.error}>{errors.weight1}</p>
                    )}
                    <input type="text" value={input.weight2} placeholder="from 1 to 5 ..." name="weight2" onChange={(e) => handleChange(e)} />
                    {errors.weight2 && (
                        <p className={s.error}>{errors.weight2}</p>
                    )}

                    <label>Life span:</label>
                    <input type="text" value={input.life_span} name="life_span" onChange={(e) => handleChange(e)} />
                    {errors.life_span && (
                        <p className={s.error}>{errors.life_span}</p>
                    )}
                    <label>Image:</label>
                    <input type="text" value={input.img} placeholder="URL:https..." name="img" onChange={(e) => handleChange(e)} />

                    <div>

                        <label>Temperaments:</label>
                        <select className={s.select} onChange={(e) => handleSelectTemperament(e)}>
                            {temperaments.map((elm) => (
                                <option value={elm}>{elm}</option>
                            ))}
                        </select>
                        {input.temperaments.map(elm =>
                            <div className={s.option}>
                                <p>{elm}</p>
                                <button type="button" className={s.hh} onClick={() => handelDeleteTemperament(elm)}>x</button>
                            </div>

                        )}
                    </div>

                </div>
            </form>

        </div>
    )
}
