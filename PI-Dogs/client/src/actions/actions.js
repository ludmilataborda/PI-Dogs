import axios from "axios";

export const GET_DOGS = 'GET_DOGS';
export const FILTER_SORTNAME = 'FILTER_SORTNAME';
export const SORTBY_WEIGHT = 'SORTBY_WEIGHT';
export const FILTER_CREATED = 'FILTER_CREATED';
export const GET_NAMES = 'GET_NAMES';
/* export const GET_DETAIL ='GET_DETAIL';
export const OCCUPATIONS_TYPES = 'OCCUPATION_TYPES';
export const POST_CHARACTER = 'POST_CHARACTER'

 */


export  function getAllDogs() {
    return (dispatch) => {
       axios.get('http://localhost:3001/dogs').then((response) => {
      dispatch({type: GET_DOGS, payload: response.data});     
      });
     }
    }

 export function sortbyNames(order) {
    return {
        type: FILTER_SORTNAME,
        payload: order
    }
} 

export function sortbyWeight(order) {
    return {
        type: SORTBY_WEIGHT,
        payload: order
    }
}
export function filterByDb(value) {
    return { type:FILTER_CREATED, 
             payload:value }
}
  export function getNames(name) {
       return (dispatch) => {
        return axios.get("http://localhost:3001/dogs?name="+name)
            .then((response) => {
                dispatch({ type: GET_NAMES, payload:response.data });
            });
    }
 };
/* 
 export  function getCharaDetails(idPersonaje) {
    return (dispatch) => {
       axios.get('http://localhost:3001/character/'+idPersonaje).then((response) => {
      dispatch({type: GET_DETAIL, payload: response.data});     
      });
     }
    }
export function getClear() {
    return {
        type: GET_DETAIL, payload: []
    }
}

export function filterByStatus(value) {
    return { type:FILTER_STATUS, 
             payload:value }
}



export function getOccupations() {
    return (dispatch) => {
        return axios.get("http://localhost:3001/occupations")
          .then((response) => {
              dispatch({type: OCCUPATIONS_TYPES, payload:response.data});
          });
    }
};

export function postsCharatoBack(value) {
    return async function(dispatch) {
       const response= await axios.post('http://localhost:3001/characters', value)
          return response 
    }
}
 */