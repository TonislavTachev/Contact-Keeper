import React, {useContext, useEffect, useState} from 'react'
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/Auth/authContext';
import setAuthToken from '../../utils/setAuthToken';
import Spinner from '../layout/Spinner'

const PrivateRoute = ({component: Component, ...rest}) => {

    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading} = authContext;
    const [isLoaded, setLoading] = useState(true);

    useEffect(() =>{
        setLoading(false);
    })

    return (
        <Route {...rest} render={props => isAuthenticated === false && isLoaded === false ? (
            <Redirect to ='/login' />
        ) : (<Component {...rest}/>)}>
            
        </Route>
    )
}

export default PrivateRoute
