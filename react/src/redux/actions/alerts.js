import { GET_ERRORS, GET_MESSAGES } from './types';


export const pushError = (msg) => (dispatch, getState) => {
    const error ={
        msg: msg,
        status: 10401
      };
    
    dispatch({
        type: GET_ERRORS,
        payload: error
    });
}


export const pushMessage = (msg) => (dispatch, getState) => {
    dispatch({
        type: GET_MESSAGES,
        payload: msg
    });
}