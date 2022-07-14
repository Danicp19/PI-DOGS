import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { postDog, getTemperaments } from "../actions";
import { Link, useHistory } from "react-router-dom"
import s from "../css/DogCreate.module.css"

export default function DogCreate() {

    const dispatch = useDispatch()
    const history = useHistory()//metodo para redirigir a la ruta que yo diga
    const temperaments = useSelector((state) => state.temperaments)//traer los temperamentos
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
            errors.height1 = "Min height is required"
        } else if (!input.height2) {
            errors.height2 = "Max height is required"
        } else if (!input.weight1) {
            errors.weight1 = "Min weight is required"
        } else if (!input.weight2) {
            errors.weight2 = "Max weight is required"
        }
        return errors
    }

    function handleSubmit(e) {

        e.preventDefault()

        if (!input.name) { return alert('Name is required') }
        if (!input.height1) { return alert('Min Height is required') }
        if (!input.weight1) { return alert('Min Weight is required') }
        if (!input.height2) { return alert('Max Height is required') }
        if (!input.weight2) { return alert('Max Weight is required') }
        if (!input.life_span) { return alert('Life span is required') }
        if (parseInt(input.height2) < parseInt(input.height1)) { return alert('Minimum height must be less than the maximum') }
        if (parseInt(input.weight2) < parseInt(input.weight1)) { return alert('Minimum weight must be less than the maximum') }
        if (isNaN(input.height1)) { return alert('Minimum height must be a number') }
        if (isNaN(input.height2)) { return alert('Maximum height must be a number') }
        if (isNaN(input.weight1)) { return alert('Minimum weight must be a number') }
        if (isNaN(input.weight2)) { return alert('Maximum weight must be a number') }


        if (parseInt(input.height1)<0) { return alert('Minimum height must be higher than 0') }
        if (parseInt(input.height2)<0) { return alert('Maximum height must be higher than 0') }
        if (parseInt(input.weight1)<0) { return alert('Minimum weight must be higher than 0') }
        if (parseInt(input.weight2)<0) { return alert('Maximum weight must be higher than 0') }


        if (isNaN(input.life_span)) { return alert('Life span must be a number') }
        if (input.temperaments.length === 0) { return alert('Temperaments is required') }

        dispatch(postDog(input))
        alert(`Dog ${input.name} successfully Created!!`)
        setInput({
            name: "",
            img: "",
            temperaments: [],
            life_span: "",
            weight1: "",//.split("-"),//libras
            weight2: "",//.split("-"),//libras
            height1: "",
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

            <div className={s.two} >
                {/* <div className={s.dogs}>
                    <img />
                </div> */}
                <form className={s.form} onSubmit={(e) => handleSubmit(e)}>

                    <div className={s.data}>
                        <div className={s.title}>
                            <h1 >Create your dog!</h1>
                        </div>
                        <div className={s.double}>
                            <label>Name:</label>


                            <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                            {errors.name && (
                                <p className={s.error}>{errors.name}</p>
                            )}
                        </div>
                        <br />
                        <div className={s.double}>
                            <label>Height:</label>
                            <input type="text" value={input.height1} placeholder="From..." name="height1" onChange={(e) => handleChange(e)} />
                            {errors.height1 && (
                                <p className={s.error}>{errors.height1}</p>
                            )}

                            <input type="text" value={input.height2} placeholder="To...       in" name="height2" onChange={(e) => handleChange(e)} />
                            {errors.height2 && (
                                <p className={s.error}>{errors.height2}</p>
                            )}
                        </div>
                        <br />
                        <div className={s.double}>
                            <label>Weight:</label>
                            <input type="text" value={input.weight1} placeholder="From.. " name="weight1" onChange={(e) => handleChange(e)} />
                            {errors.weight1 && (
                                <p className={s.error}>{errors.weight1}</p>
                            )}

                            <input type="text" value={input.weight2} placeholder="To...       lb" name="weight2" onChange={(e) => handleChange(e)} />
                            {errors.weight2 && (
                                <p className={s.error}>{errors.weight2}</p>
                            )}
                        </div>
                        <br />
                        <div className={s.double}>
                            <label>Life span:</label>

                            <input type="text" value={input.life_span} placeholder="...years" name="life_span" onChange={(e) => handleChange(e)} />
                            {errors.life_span && (
                                <p className={s.error}>{errors.life_span}</p>
                            )}
                        </div>
                        <br />

                        <div className={s.double}>
                            <label>Image:</label>
                            <input type="text" value={input.img} placeholder="URL:https..." name="img" onChange={(e) => handleChange(e)} />
                        </div>
                        <br />
                        <div className={s.double}>

                            <label>Temperaments:</label>
                            <select className={s.select} onChange={(e) => handleSelectTemperament(e)}>
                                {temperaments.map((elm) => (
                                    <option value={elm}>{elm}</option>
                                ))}
                            </select>
                        </div>
                        {input.temperaments.map(elm =>
                            <div className={s.option}>
                                <p>{elm}</p>
                                <button type="button" className={s.hh} onClick={() => handelDeleteTemperament(elm)}>x</button>
                            </div>

                        )}

                        <div className={s.doubleb}>
                            <button className={s.button2} type="submit"><i class="fas fa-bone fa-2x"></i></button>
                            <Link to="/home"> <button className={s.button}>Back</button></Link>
                        </div>

                    </div>
                </form>

                <div className={s.dogs}>
                    <img />
                </div>
            </div>
        </div>
    )
}



// https://media.istockphoto.com/photos/dog-watching-tv-on-the-couch-picture-id680810342?k=20&m=680810342&s=612x612&w=0&h=wQVeNcnq0CIqpGK88zA-pqmzbyK_6diiHR7kAq5PbxQ=