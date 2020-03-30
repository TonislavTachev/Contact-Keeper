import React,{useContext, Fragment, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ContactContext from '../../context/Contact/contactContext';
import AuthContext from '../../context/Auth/authContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);
    const {contacts, filtered, loading} = contactContext;

    useEffect(()=>{
       contactContext.getContacts();
    },[])

    console.log(contacts);

    if(contacts.length === 0){
        return <h4>Please add a contact</h4>
    } 

    return (
        <Fragment>
            {loading && <Spinner/>}
            {!loading && filtered !== null ? filtered.map(contact => <ContactItem key={contact.id} contact={contact}></ContactItem>): contacts.map(contact => <ContactItem key={contact.id} contact={contact}></ContactItem>)}

        </Fragment>
    )
}

export default Contacts
