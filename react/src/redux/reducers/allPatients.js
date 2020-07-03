import { GET_ALL_PATIENTS, DELETE_PATIENT, ADD_PATIENT, UPDATE_PATIENT } from '../actions/types';

const initialState = {
    result: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_ALL_PATIENTS:
            return { ...state, result: payload }

        case DELETE_PATIENT:
            return { ...state, result: (state.result).filter((item) => item.id !== Number(payload)) }

        case ADD_PATIENT:
            return { ...state, result: [{...payload, fresh: true}, ...state.result]}

        case UPDATE_PATIENT:
            return { ...state, result: (state.result).map((item)=>{if(item.id === payload.id){return({...payload, fresh: true});}else{return(item);}})}

        default:
            return state
    }
}
