import React,{useContext, Fragment} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/Auth/authContext';
import ContactContext from '../../context/Contact/contactContext';

const Navbar = ({title, icon, props}) => {

    const authContext = useContext(AuthContext);
    const {isAuthenticated, user,logout} = authContext;
    const contactContext = useContext(ContactContext);
    const {clearContacts} = contactContext;

    const Logout = () =>{
        logout();
        clearContacts();
    }

    const AuthLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a href='#!' onClick={Logout}> 
                <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>

            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon}/> {title}
            </h1>
            <ul>
               {isAuthenticated ? AuthLinks : guestLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes= {
    title:PropTypes.func.isRequired,
    icon: PropTypes.string
}


Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar
