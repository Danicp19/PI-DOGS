const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: [],

}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_DOGS":
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }

        case "GET_DOGS_NAME":
            const result = action.payload

            if (result.length === 0) {
                alert("We don't have dogs with that name")
                return state
            } else {
                return {
                    ...state,
                    dogs: action.payload,
                }
            }


        // case "GET_PLATFORMS":
        //     return {
        //         ...state,
        //         result: action.payload
        //     }


        case "FILTER_CREATED":
            const allDogsFilter = state.allDogs
            const createdFilter = action.payload === "created" ? allDogsFilter.filter(elm => elm.createdInDb) : allDogsFilter.filter(elm => !elm.createdInDb)

            return {
                ...state,
                dogs: action.payload === "all" ? state.allDogs : createdFilter
            }


        case "FILTER_TEMPERAMENT":
            const dogsFilter = state.allDogs
            //array de objetos--misma referencia elm i []

            const temperamentDbFilter = action.payload === "all" ? dogsFilter : dogsFilter.filter(elm => elm.createdInDb &&
                elm.temperaments.find(temperament => temperament.name === action.payload))

            const temperamentFilter = action.payload === "all" ? dogsFilter : dogsFilter.filter((elm) => elm.temperament &&
                elm.temperament.split(", ").find((elm) => elm === action.payload))
            return {
                ...state,
                dogs: [...temperamentDbFilter, ...temperamentFilter]
            }



        case "ORDER_BY_ALPHABET":
            let array = action.payload === "asc" ?
                state.dogs.sort(function (a, b) {//array valores-0+
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1
                    } if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1
                    }
                    return 0

                }) : state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1
                    } if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                videogames: array
            }
        case "ORDER_BY_WEIGHT":
            let weightArray = action.payload === "des" ?
                state.dogs.sort(function (a, b) {//
                    if (parseInt(a.weight) > parseInt(b.weight)) {
                        return 1
                    } if (parseInt(b.weight) > parseInt(a.weight)) {
                        return -1
                    }
                    return 0

                }) : state.dogs.sort(function (a, b) {
                    if (parseInt(a.weight) > parseInt(b.weight)) {
                        return -1
                    } if (parseInt(b.weight) > parseInt(a.weight)) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                dogs: weightArray
            }
        case "POST_DOG":
            return {
                ...state,

            }

        case "GET_DOGS_DETAIL":
            return {
                ...state,
                detail: action.payload

            }
        default:
            return state
    }

}
export default rootReducer