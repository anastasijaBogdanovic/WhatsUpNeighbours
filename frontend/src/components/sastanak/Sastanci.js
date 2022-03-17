import React,{useReducer,useState,useEffect,useContext} from 'react'
import FormSastanak from './FormaSastanak'
import Sastanak from './Sastanak'
import {Button} from 'react-bootstrap'
import './sastanci.scss'
import { Context } from "../../Store";
import {HiChevronDoubleUp} from 'react-icons/hi'

const ACTIONS={
    NOVI_SASTANAK:'dodaj_sastanak',
    POVECAJ_BROJ_ZAINTERESOVANIH:'povecaj_br_zainteresovanih',
    POVECAJ_BROJ_NEZAINTERESOVANIH:'povecaj_br_nezainteresovanih',
    POSTAVI_SASTANKE:'postavi sastanke'
}

function reducer(sastanci, action){
    console.log(sastanci);
    console.log(action);
    switch(action.type){
        case ACTIONS.NOVI_SASTANAK:
            
            return [action.payload,...sastanci]
        case ACTIONS.POVECAJ_BROJ_ZAINTERESOVANIH:
            return sastanci.map(sastanak=>{
                
                if(sastanak.id===action.payload.id)
                   return {...sastanak,brZainteresovanih:sastanak.brZainteresovanih++}
                else return sastanak;
            })
         case ACTIONS.POVECAJ_BROJ_NEZAINTERESOVANIH:
                return sastanci.map(sastanak=>{
                    
                    if(sastanak.id===action.payload.id)
                       return {...sastanak,brNezainteresovanih:sastanak.brNezainteresovasnih++}
                    else return sastanak;
                })
        case ACTIONS.POSTAVI_SASTANKE:
              return action.payload;
          


            
    }

}
export default function Sastanci(){


   


    const [sastanci,dispatch]=useReducer(reducer,[]);
    const [formOn,setFormOn]=useState(false);
    const [state, dispatch1] = useContext(Context);
    const isAuthorized=state.stanar.status==='upravnik'?true:state.stanar.status==='admin'?true:false;


    useEffect(() => {
        console.log("hi");
        const asyncFetch=async ()=>{
          const response1=await fetch('http://localhost:5000/WUNSastanci/VratiSastanke');
          const listaStavki=await response1.json();
          console.log('abc');
          console.log(response1);
          console.log(listaStavki);
          listaStavki.map(sastanak=>{sastanak.vreme=new Date(sastanak.vreme).toLocaleString()})
          listaStavki.reverse();
          console.log(listaStavki);
          dispatch({type:ACTIONS.POSTAVI_SASTANKE,payload:listaStavki})
          //sastanci=listaStavki;
    
        }

      
      
        asyncFetch();
      },[] );

   function toggleForm(){
      // return ( <FormSastanak dispatch={dispatch}></FormSastanak>);
      setFormOn(true);
      console.log(formOn);
      
    }

    function renderForm(){
        if(formOn)
        return<> <FormSastanak dispatch={dispatch} setForm={setFormOn} ></FormSastanak>
         <HiChevronDoubleUp  className='doubleUp' onClick={()=>{setFormOn(false)}}/>

        </>
        else return null;
         
    }

    function renderCreate(){
        if(isAuthorized)
         return <Button  onClick={toggleForm} variant='danger'>Kreiraj novi sastanak</Button>
        
        else return null;

    }
    return(
        <div className='sastanci'>
       
       {renderCreate()}
       {renderForm()}
        
        {sastanci.map(sastanak=>{
            console.log(sastanak);
            return <Sastanak  id={sastanak.id} key={sastanak.id} povod={sastanak.povod} vreme={sastanak.vreme} mesto={sastanak.mesto} brZainteresovanih={sastanak.brZainteresovanih} brNezainteresovanih={sastanak.brNezainteresovasnih} dispatch={dispatch} />
        })}
        </div>

    )
}