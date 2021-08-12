/* import { GET_CHARACTERS,GET_DETAIL,GET_NAMES, FILTER_STATUS, FILTER_CREATED, FILTER_SORT, OCCUPATIONS_TYPES,POST_CHARACTER } from "../actions/actions"; */
import { GET_DOGS, FILTER_SORTNAME, SORTBY_WEIGHT, FILTER_CREATED, GET_NAMES,TEMPERAMENT_TYPES, POST_DOGS, GET_DETAIL, FILTER_TEMPERAMENT } from "../actions/actions";
/* import { filDiets, sorts } from './functions.js' */
import { filDogies } from './functions.js'
const initialState = {
   
    charaDeatil:{},
     dogs:[], //renderizada
     allDogs:[], // copia
     temperaments:[],
     deteail:[]
  };
  

function rootReducer(state= initialState, action){
   switch(action.type) {
     case GET_DOGS: return {
           ...state, 
            dogs: action.payload, 
           allDogs:action.payload
              
       }
      case FILTER_SORTNAME:
          const sorts = (str, arr) => {
             if(str === 'asc') {
                 return arr.sort((unaMascota, otraMascota) => unaMascota.name.localeCompare(otraMascota.name))
               }
             if(str === 'desc') {
                return arr.sort((unaMascota, otraMascota) => otraMascota.name.localeCompare(unaMascota.name))    
               }
            };
            return {
               ...state,
                dogs: sorts(action.payload, state.dogs)
             }

         case SORTBY_WEIGHT:
            const sorts2 = (str, arr) => {
                 if(str === 'asc') {
                    return arr.sort((unaMascota, otraMascota) => otraMascota.weight[1] - unaMascota.weight[1]);
                 }
                 if(str === 'desc') {
                   return arr.sort((unaMascota, otraMascota) => unaMascota.weight[1] - otraMascota.weight[1]);  
                    }
                 };
              return {
                   ...state,
                    dogs: sorts2(action.payload, state.dogs)
                 } 
               
          case FILTER_CREATED:
            const created = action.payload === 'created' ? state.dogs.filter(el => el.createdindb) : state.allDogs.filter(el => !el.createdindb)
             return {
              ...state,
                dogs: action.payload === 'All' ? state.allDogs : created
            }
       
          case GET_NAMES: return {
                  ...state, 
                 dogs: action.payload,        
             }          
         case TEMPERAMENT_TYPES: 
             return {
                 ...state,
                 temperaments: action.payload 
          } 
         case POST_DOGS: 
              return {
              ...state,
           }

         case GET_DETAIL: 
          return {
              ...state,
              deteail: action.payload 
         }  
         case FILTER_TEMPERAMENT:
         // const allD = state.allDogs
          return {
              ...state,
              dogs: action.payload === '...' ? state.allDogs : filDogies(action.payload, state.allDogs)
          }
            default: 
           return state;
   }
}

export default rootReducer;