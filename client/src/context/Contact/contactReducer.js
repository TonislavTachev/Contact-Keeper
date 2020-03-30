import {ADD_CONTACT,
    DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT,
    FILTER_CONTACT, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS} from "../types"

export default (state,action) =>{
    switch(action.type) {
        default:
            return state;
        case GET_CONTACTS:
            return{
                ...state,
                contacts:action.payload,
                loading:false
            }
        case CLEAR_CONTACTS:
            return{
                ...state,
                contacts:[],
                filtered:null,
                error: null,
                current:null
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts:[...state.contacts, action.payload],    //copy what's already there, because state is immutable
                loading:false
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading:false
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                current:null,
                loading:false
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current:null
            }
        case UPDATE_CONTACT:
            return{
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
                loading:false
            }
        case FILTER_CONTACT:
            return{
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);

                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
               filtered:null
            }
    }
}