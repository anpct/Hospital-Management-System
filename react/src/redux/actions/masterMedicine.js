import { ADD_MEDICINE_MASTER, REMOVE_MEDICINE_MASTER, GET_MEDICINE_MASTER, GET_ERRORS, UPDATE_PATIENT_MEDICINE_LIST, GET_MESSAGES } from './types';
import axios from 'axios';
import { tokenConfig } from './auth';


export const getMedicineMaster = () => (dispatch, getState) => {

    axios.get(`${process.env.REACT_APP_API_URL}/api/master-medicines/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_MEDICINE_MASTER,
                payload: res.data
            })
        })
        .catch((err) => {
            const error = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })

}


export const addMedicineMaster = (data) => (dispatch, getState) => {

    const body = JSON.stringify(data);

    if (data.quantity <= 0) {
        const error = {
            msg: "Please enter a valid quantity",
            status: 10401
        };
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
        return;
    }
    if (data.rate <= 0) {
        const error = {
            msg: "Please enter a valid price",
            status: 10401
        };
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
        return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/api/master-medicines/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_MEDICINE_MASTER,
                payload: res.data
            });
            dispatch({
                type: GET_MESSAGES,
                payload: "ADDED"
            });
        })
        .catch((err) => {
            const error = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })
}

export const removeMedicineMaster = (id) => (dispatch, getState) => {

    axios.delete(`${process.env.REACT_APP_API_URL}/api/master-medicines/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: REMOVE_MEDICINE_MASTER,
                payload: id
            });
            dispatch({
                type: UPDATE_PATIENT_MEDICINE_LIST,
                payload: id
            });
            dispatch({
                type: GET_MESSAGES,
                payload: "DELETED"
            });
        })
        .catch((err) => {
            const error = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })
}