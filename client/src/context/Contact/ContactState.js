import React,{useReducer} from 'react'
import ContactContext from './contactContext';
import uuid from 'uuid';
import ContactReducer from './contactReducer';
import axios from 'axios';
import {ADD_CONTACT,
DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT,
FILTER_CONTACT, CLEAR_FILTER, SET_ALERT, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS} from "../types"

const ContactState = props => {
    const initialState = {
        contacts : [],
        current: null,
        filtered: null,
        error: null
    } 

     const [state, dispatch] = useReducer(ContactReducer, initialState);


     //Get Contacts
     const getContacts = async() =>{
       
        try{
           
            const res = await axios.get('/api/contact');
             dispatch({type:GET_CONTACTS, payload:res.data});              
        }catch(err){

        }
          
     }
     //Clear Contacts
     const clearContacts = async()=>{

       
        dispatch({type: CLEAR_CONTACTS});
     }
     
     //Add contact
      const addContact= async(contact) =>{
        
         const config = {
             headers:{
                 'Content-Type' : 'application/json'
             }
         }
         
         try{
             
            const res = await axios.post('/api/contact', contact, config);
            console.log(res.data);
            dispatch({type: ADD_CONTACT, payload: res.data});
         }catch(err){
            dispatch({type:CONTACT_ERROR, payload:err.response.msg});
         }

      }
     //Delete contact
      const deleteContact = async(id) =>{
    
        try{
            await axios.delete(`/api/contact/${id}`)
           dispatch({type: DELETE_CONTACT, payload:id});
        } catch(err){

        }

      }
     //Set Current contact
      const setCurrent = (contact)=>{

        dispatch({type:SET_CURRENT, payload : contact});
      }
       
     //Clear current contact
      const clearCurrent = () =>{
          dispatch({type:CLEAR_CURRENT});
      }
     //Update contact
     const updateContact = async(contact) =>{
 
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }

           try{
               const res = await axios.put(`/api/contact/${contact._id}`, contact, config);
               dispatch({type:UPDATE_CONTACT, payload: res.data});
           }catch(error) {
               dispatch({type: CONTACT_ERROR, payload: error.response.msg});
           }

     }

     //Filter contact
     const filterContacts = (name) => {
        dispatch({type: FILTER_CONTACT, payload: name})
     }

     //Clear Filter
    const clearFilter = () =>{
        dispatch({type: CLEAR_FILTER});
    }
     

    return (
        <ContactContext.Provider value={{

           contacts : state.contacts,
           current: state.current,
           filtered : state.filtered,
           error : state.error,
           addContact,
           deleteContact,
           setCurrent,
           clearCurrent,
           updateContact,
           filterContacts,
           clearFilter,
           getContacts,
           clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
