import axios from 'axios';

const setAuthToken = token =>{
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {

        //delete if there's not a token passed in
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;