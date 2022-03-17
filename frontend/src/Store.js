import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'


const initialState = {
   isAuth:false,
   stanar:{
       ime:'',
       prezime:'',
       password:'',
       brSprata:0,
       brStana:0,
       brojTelefona:0,
       email:'',
       id:0,
       jmbg:0,
       status:''
   },
   notifikacije:{
       notifikacijaOglasna:false,
       notifikacijaObavestenja:false,
       notifikacijaCet:false,
       notifikacijaPredlozi:false,
       notifikacijaSastanci:false,
       notifikacijaTroskovi:false

   },
   prevPath:'/app/oglasnaTabla'
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
   
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;