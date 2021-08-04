/* import { GET_CHARACTERS,GET_DETAIL,GET_NAMES, FILTER_STATUS, FILTER_CREATED, FILTER_SORT, OCCUPATIONS_TYPES,POST_CHARACTER } from "../actions/actions"; */
import { GET_DOGS, FILTER_SORTNAME, SORTBY_WEIGHT, FILTER_CREATED, GET_NAMES} from "../actions/actions";
/* import { filDiets, sorts } from './functions.js' */

const initialState = {
   
    charaDeatil:{},
     dogs:[], //renderizada
     allDogs:[], // copia
     occupations:[]
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
            const created = action.payload === 'created' ? state.allDogs.filter(el => el.createdindb) : state.allDogs.filter(el => !el.createdindb)
             return {
              ...state,
                dogs: action.payload === 'All' ? state.allDogs : created
            }
       
          case GET_NAMES: return {
                  ...state, 
                 dogs: action.payload,        
             }          
                 /* case OCCUPATIONS_TYPES: 
             return {
                 ...state,
                 occupations: action.payload 
      } 
     
      case GET_DETAIL: 
            return {
              ...state,
             charaDeatil: action.payload 
      }  
      case POST_CHARACTER: 
            return {
            ...state,
          }  
      case FILTER_STATUS:
        const allCharacters = state.allCharacters
        const statusFiltered = action.payload === 'All' ? allCharacters : allCharacters.filter(el => el.status === action.payload)
        return {
            ...state,
            characters: statusFiltered
        }
        
                 */
         default: 
                  return state;
   }
}

export default rootReducer;