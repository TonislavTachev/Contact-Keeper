import React, {useState, useEffect, useContext} from 'react'
import AlertContext from '../../context/Alert/alertContext'
import Alert from '../Alert/Alerts';
import AuthContext from '../../context/Auth/authContext'
const Login = props => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const {login, error, clearError, isAuthenticated} = authContext;
    const {setAlert} = alertContext;

    useEffect(()=>{

        if(isAuthenticated){
            props.history.push('/');
        }

        if(error === 'Invalid Credentials'){
            setAlert(error, 'danger');
            clearError();
        }

        //eslint-disable-next-line
     }, [error, isAuthenticated, props]);


    const [user, setUser] = useState({
        email:'',
        password: '',
    })

    const {email, password, } = user;
   
    const onChange  = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
     }

    const onSubmit = (e) =>{
        e.preventDefault();
         if(email == ''){
             setAlert('Please fill in your email', 'danger');
         } else {
            login({
                email: email,
                password : password
            })
         }
    }
    return (

        <div className="form-container">
            <Alert/>
            <h1>
                Account <span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' value={email} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange}/>
                </div>
                <input type='submit' value="Log in" className='btn btn-primary btn-block'/>
            </form>
        </div>
    )
}

export default Login
