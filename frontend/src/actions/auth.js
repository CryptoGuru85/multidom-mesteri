import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    GET_ERRORS,
    LOGOUT_SUCCESS
} from './types';

export const loadUser = () => (dispatch, getState) => {
    //User Loading
    dispatch({type: USER_LOADING});

    axios.get('/accounts/user/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch({type: AUTH_ERROR})
        })

}

export const tokenConfig = getState => {
    const token = getState().auth.token

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config
}


export const login = (email, password) => dispatch => {

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request Body
    const body = JSON.stringify({email, password});

    axios.post('accounts/login/', body ,config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            console.log("Errors", err)
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        }
        )


}


export const register = (email, password) => dispatch => {

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request Body
    const body = JSON.stringify({email, password});

   return( axios.post('accounts/register/', body ,config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            return res.status
        }).catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        }
        ))
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('token')
    dispatch({type: LOGOUT_SUCCESS})
}