import { GET_PATIENT, ADD_DIAGNOSTIC_PATIENT, ADD_MEDICINE_PATIENT, REMOVE_DIAGNOSTIC_PATIENT, REMOVE_MEDICINE_PATIENT, CLEAR_PATIENT, UPDATE_PATIENT_MEDICINE_LIST, UPDATE_PATIENT_DIAGNOSTIC_LIST } from '../actions/types';

const initialState = {
    address: "",
    admited_on: "",
    age: 0,
    city: "",
    diagnostics: [],
    id: 0,
    medicines: [],
    name: '',
    state: '',
    type_of_bed: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_PATIENT:
            return { ...payload }

        case ADD_DIAGNOSTIC_PATIENT:
            return { ...state, diagnostics: [{...payload, fresh: true}, ...state.diagnostics] }

        case ADD_MEDICINE_PATIENT:
            return { ...state, medicines: [{...payload, fresh: true}, ...state.medicines] }

        case REMOVE_DIAGNOSTIC_PATIENT:
            return { ...state, diagnostics: (state.diagnostics).filter((item) => item.id !== Number(payload)) }

        case REMOVE_MEDICINE_PATIENT:
            return { ...state, medicines: (state.medicines).filter((item) => item.id !== Number(payload))}

        case UPDATE_PATIENT_MEDICINE_LIST:
            return { ...state, medicines: (state.medicines).filter((item)=> item.medicine !== Number(payload))}

        case UPDATE_PATIENT_DIAGNOSTIC_LIST:
            return { ...state, diagnostics: (state.diagnostics).filter((item)=> item.diagnostic !== Number(payload))}

        case CLEAR_PATIENT:
            return {initialState}

        default:
            return state
    }
}
