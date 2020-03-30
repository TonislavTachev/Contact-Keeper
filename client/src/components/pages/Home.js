import React, {useContext, useEffect} from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../../context/Contact/ContactFilter';
import AuthContext from '../../context/Auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
   useEffect(()=>{
       authContext.loadUser();
       //eslint-disable-next-line
   },[])
    return (
        <div className='grid-2'>
            <div>
                <ContactForm/>
            </div>
            <div>
                <ContactFilter/>
                <Contacts></Contacts>
            </div>
        </div>
    )
}

export default Home
