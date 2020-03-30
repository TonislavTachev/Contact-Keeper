import{REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS } from '../types';

export default (state,action) =>{
    switch(action.type){
        default:
            return state;

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload); //get the token from the state and store it in localStorage
           return {
               ...state,
               ...action.payload,  //used instead of token: action.payload
               isAuthenticated: true,
               loading:false
           }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token') //remove the token from the localStorage
           return {
               ...state,
               token: null,
               isAuthenticated:false,
               loading:true,
               user: null,
               error: action.payload
           }
        case USER_LOADED:
           return {
               ...state,
               isAuthenticated: true,
               loading: false,
               user: action.payload
            }
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                loading:true,
                user: null,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
            
    }
}