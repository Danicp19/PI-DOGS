import axios from "axios"

export function getDogs() {
  return async function (dispatch) {
    var result = await axios.get('/dogs');
    return dispatch({
      type: "GET_DOGS",
      payload: result.data
    })
  }
}

export function getTemperaments() {
  return async function (dispatch) {
    var temp = await axios.get("/temperaments", {
    });
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: temp.data.map(elm => elm.name)
    });
  }
}


export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload
  }
}




export function clearDetail() {
  return {
     type: "CLEAR_DETAIL" 
    };
}


export function filterTemperament(payload) {
  return {
    type: "FILTER_TEMPERAMENT",
    payload
  }
}

export function orderByAlphabet(payload) {
  return {
    type: "ORDER_BY_ALPHABET",
    payload
  }
}

export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload
  }
}


export function getDogsName(payload) {//name
  return async function (dispatch) {
    try {
      var result = await axios.get("/dogs?name=" + payload)
      return dispatch({
        type: "GET_DOGS_NAME",
        payload: result.data
      })
    } catch (error) {
      console.log(error)

    }
  }
}


export function postDog(payload) {
  return async function (dispatch) {
    var data = await axios.post('/dogs', payload)
    return data

  }
}


export function getDetail(id) {
  return async function (dispatch) {
    try {
      var result = await axios.get("/dogs/" + id)
      return dispatch({
        type: "GET_DOGS_DETAIL",
        payload: result.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}