import axios from 'axios';
import {
        GET_PROFILE_LIST,
        GET_PROFILE,
    } from './types';
import {tokenConfig} from './auth';

export const getProfileList = (inputState) => (dispatch, getState) => {

    axios.get(`accounts/profiles/?search=${inputState.searchInput}+${inputState.locationInput}+${inputState.entityInput}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE_LIST,
                payload: res.data
            });
        }).catch(err => {
           console.log(err)
        }
        )
}

export const getProfile = (id) => (dispatch, getState) => {


    axios.get(`accounts/profile/${id}/`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        }).catch(err => {
           console.log(err)
        }
        )
}