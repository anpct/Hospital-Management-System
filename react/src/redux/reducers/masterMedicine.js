import { GET_MEDICINE_MASTER, ADD_MEDICINE_MASTER, REMOVE_MEDICINE_MASTER, UPDATE_MEDICINE } from '../actions/types';


const initialState = {
    master: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_MEDICINE_MASTER:
            return { ...state, master: payload }

        case ADD_MEDICINE_MASTER:
            return { ...state, master: [{...payload, fresh: true}, ...state.master] }

        case REMOVE_MEDICINE_MASTER:
            return { ...state, master: (state.master).filter((item) => item.id !== Number(payload)) }

        case UPDATE_MEDICINE:
            return { ...state, master: (state.master).map((item) => { if (item.id === payload.medicine) { return ({ ...item, quantity: (item.quantity - payload.quantity) }) } else { return (item); } }) }

        default:
            return state
    }
}
