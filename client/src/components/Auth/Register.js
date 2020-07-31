import React, {useState, useContext, useEffect} from 'react'
import Alert from '../../components/Alert/Alerts'
import AlertContext from '../../context/Alert/alertContext'
import {Redirect} from 'react-router-dom'
import AuthContext from '../../context/Auth/authContext'

const Register = props => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const {register, error, clearError, isAuthenticated} = authContext;
    const {setAlert} = alertContext;


    useEffect(()=>{

        if(isAuthenticated){
            props.history.push('/');
        }

        if(error === 'User already exists'){
            setAlert(error, 'danger');
            clearError();
        }

        //eslint-disable-next-line
     }, [error, isAuthenticated, props]);

    
    const [user, setUser] = useState({
        name: '',
        email:'',
        password: '',
        password2:'',
    })


    const {name, email, password, password2} = user;
   
    const onChange  = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
     }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(user.password != user.password2){
          setAlert('Passwords are not the same', 'danger');
        } else {
            register({
                name,
                email,
                password
            });
        }
    }

    return (
        <div className="form-container">

            <Alert></Alert>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={name} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' value={email} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required minLength='6'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input type='password' name='password2' value={password2} onChange={onChange} required minLength='6'/>
                </div>
                <input type='submit' value="Register" className='btn btn-primary btn-block'/>
            </form>
        </div>
    )
}

export default Register