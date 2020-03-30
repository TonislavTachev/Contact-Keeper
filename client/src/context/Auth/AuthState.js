import React, {useReducer} from 'react'
import {AsyncStorage} from 'react-native';
import AuthContext from './authContext';
import Axios from 'axios';
import AuthReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken';
import{REGISTER_SUCCESS,
 REGISTER_FAIL,
 USER_LOADED,
 AUTH_ERROR,
 LOGIN_SUCCESS, 
 LOGIN_FAIL,
 LOGOUT,
 CLEAR_ERRORS } from '../types';
const AuthState = props => {

    const initialState = {
       token : localStorage.getItem('token'),
       isAuthenticated:false,
       loading:true,
       error: null,
       user : null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //load user 
    const loadUser = async() =>{
       
            setAuthToken(localStorage.token);
    

        try{
        const res = await Axios.get('/api/auth');
        console.log(res);
             dispatch({type: USER_LOADED, payload:res.data});
        }catch(err){
            dispatch({type:AUTH_ERROR});
        }
    }
    //register user
    const register = async(formData) =>{
        const config = {
            'Content-Type' : 'application/json',
        }

        try{
         const res = await Axios.post('http://localhost:5000/api/users',formData, config);

        //  console.log(res.data.token);

         dispatch({type: REGISTER_SUCCESS, payload: res.data.token});

         loadUser();

        } catch(err){
            
        dispatch({type:REGISTER_FAIL, payload:err.response.data.msg});
        }
    }
    //login user
    const login = async(formData)=>{

        const config = {
            'Content-Type' : 'application/json'
        }

        try{
     
           const res = await Axios.post('http://localhost:5000/api/auth', formData, config);

           dispatch({type:LOGIN_SUCCESS, payload:res.data.token});

           loadUser();

        } catch(err){
            dispatch({type:LOGIN_FAIL, payload:err.response.data.msg});
        } 

    }

    //logout
    const logout = () =>{
     
        dispatch({type:LOGOUT});
    }
    //clear_errors
    const clearError = () =>{
     dispatch({type:CLEAR_ERRORS})
    }
    return (
        <AuthContext.Provider value={{
            token : state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            loggingout:state.logginout,
            error:state.error,
            user: state.user,
            register,
            clearError,
            loadUser,
            login,
            logout

        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
