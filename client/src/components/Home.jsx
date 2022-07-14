import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDogs, getTemperaments, filterCreated, filterTemperament ,orderByAlphabet,orderByWeight,} from "../actions";
import { Link } from "react-router-dom"
import Card from "./Card";
import Paging from "./Paging";
import SearchBar from "./SearchBar";
import s from "../css/Home.module.css"


export default function Home() {


    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)//store
    const allTemperaments = useSelector((state) => state.temperaments)
    const [sort, setSort] = useState("")//modifica el estado local
    const [currentPage, setCurrentPage] = useState(1) //pagina actual estado local
    const [dogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage//15
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)//setpagenumber
    }
   
    useEffect(() => {
        dispatch(getDogs())
    }, []) //[]no depende de nada

    useEffect(() => {
        dispatch(getTemperaments())
    }, [])


    function handleClick(e) {//evento
        e.preventDefault()
        dispatch(getDogs())
    }

  
    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }


    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByAlphabet(e.target.value))//value-input
        setCurrentPage(1)
        setSort(`Sort ${e.target.value}`)//estado
    }

    function handleWeight(e) {
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setSort(`Sort ${e.target.value}`)
    }

 
console.log(allDogs)



    function handleFilterTemperament(e) {
        e.preventDefault();
        setCurrentPage(1)
        dispatch(filterTemperament(e.target.value))
    }

    return (
        <div className={s.complete}>

            <div className={s.nav}>

                {<button className={s.all} onClick={e => { handleClick(e) }}>Load all Dogs</button>}


                <Link to="/dogs">
                    <button className={s.all} >Create Dogs</button>
                </Link>

                <SearchBar />

               
            </div>
            

            <div className={s.space}>
           {/* <p><i class="fas fa-sort-alpha-down fa-2x"></i> */}
                <select className={s.filord} onChange={e => handleSort(e)}>
                    
                    <option value="default">Order</option>
                    <option value="asc">A to Z</option>
                    <option value="des">Z to A</option>
                </select>
                {/* <i class="fas fa-balance-scale-right fa-2x"></i> */}
                <select className={s.filord} onChange={e => handleWeight(e)}>
                    <option value="default">Weight</option>
                    <option value="asc">Highest to lowest</option>
                    <option value="des">Lowest to highest</option>

                </select> 



                {/* <i class="fas fa-plus fa-2x "></i> */}
                <select className={s.filord} onChange={e => handleFilterCreated(e)}>
                    <option value="default">Filter</option>
                    <option value="all">All</option>
                    <option value="created">Added</option>
                    <option value="fromApi">Existing</option>
                </select>

                {/* <i class="fas fa-bone fa-2x"></i> */}
                <select className={s.filord} onChange={e => handleFilterTemperament(e)}>

                    {allTemperaments.map(e => {
                        return <option value={e}>{e}</option>
                    })}
                </select>


            </div>
            <div className={s.paging}>
                <Paging
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}//numero //envio todo al comp.Paging
                    paging={paging}
                />
            </div>


            <div className={s.cards}>
                {/* incluir condicionalmente un elemento */}
                {currentDogs?.length === 0 && (<div className={s.loading}>
                    <i class="fas fa-bone fa-spin fa-3x "></i>
                    <i class="fas fa-bone fa-spin fa-3x "></i>
                    <i class="fas fa-bone fa-spin fa-3x "></i>
                    </div>)}

                {
                    currentDogs?.map(elm => {
                        return (

                            <Link className={s.deco} to={"/home/" + elm.id}>
                                <Card name={elm.name} img={elm.img} 
                                
                                temperaments={elm.createdInDb ?

                                    elm.temperaments.map(e => e.name).join(", ") : elm.temperament}

                                    weight={elm.weight} weight2={elm.weight2} key={elm.id} />
                            </Link>
                            //asi seria default img={elm.img?elm.img:<img src=url.....}

                        )
                    })
                }
                
            </div>
            <div className={s.paging}>
                <Paging
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}//numero //envio todo al comp.Paging
                    paging={paging}
                />
            </div>
            

        </div>
    )
}