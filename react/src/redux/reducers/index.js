import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import messages from './messages';
import patient from './patient';
import allPatients from './allPatients';
import masterDiagnostic from './masterDiagnostic';
import masterMedicine from './masterMedicine';
import { CLEAR } from '../actions/types';

const appReducer = combineReducers({
    auth,
    errors,
    messages,
    patient,
    allPatients,
    masterDiagnostic,
    masterMedicine,
  })
  
const initialState = appReducer({}, {})
  
const rootReducer = (state, action) => {
    if (action.type === CLEAR) {
      state = initialState
    }
  
    return appReducer(state, action)
  }

export default rootReducer