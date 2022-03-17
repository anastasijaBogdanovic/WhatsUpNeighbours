import StavkaOglasneTable1 from './StavkaOglasneTable1.js'
import './OglasnaTabla.scss'
import {Button, Form} from 'react-bootstrap';
//import pozadina1 from '../pozadina1.jpg'
import React,{useState,useRef,useEffect,useContext} from 'react';
import { Context } from "../../Store";


export default function OglasnaTabla(){
    const [state, dispatch] = useContext(Context);
    const [stavke,postaviStavke]=useState(new Array());
    const inputRef=useRef();
    useEffect(() => {
        console.log("hi");
        const asyncFetch=async ()=>{
          const response1=await fetch('http://localhost:5000/WUN/PreuzmiOglasnuTablu');
          const listaStavki=await response1.json();
          listaStavki.map(stavka=>{stavka.vreme=new Date(stavka.vreme).toLocaleString()})
          listaStavki.reverse();
          postaviStavke(listaStavki)
    
        }

      
      
        asyncFetch();
      },[] );
    

    const postaviOglas=()=>{

if(inputRef.current.value==='')
  alert('Morate uneti tekst!');
  else{
        console.log(inputRef.current.value);
        const datum=new Date().toLocaleString();
        const key=new Date()*Math.random();
        const novaStavka={id:key, tekst:inputRef.current.value, vreme:datum,autor:state.stanar.ime+" "+state.stanar.prezime}
       postaviStavke(prevState=>
            [novaStavka,...prevState]
        )
        inputRef.current.value='';
       

       fetch('http://localhost:5000/WUN/ObjaviNaOglasnojTabli',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            tekst:novaStavka.tekst,
            vreme:new Date(new Date().getTime()-(new Date().getTimezoneOffset()*60000)).toJSON(),
            idAutora:state.stanar.id
        })

       })
    }

    }
    return(
        <div className="kontOGL oglasnaTabla" >
        {stavke?
       ( <div className='stavke' >
            {stavke.map(el=>{
                console.log(el);
                return(<StavkaOglasneTable1  key={el.id} tekst={el.tekst} vreme={el.vreme} autor={el.autor} />)
            })}

        </div>):null}


        <Form className='forma'>
            <textarea ref={inputRef} rows='6' placeholder='Unesite ovde željeni tekst'></textarea>
            <Button onClick={postaviOglas} className='dugme'>Objavite na oglasnoj tabli</Button>

        </Form>
        



        </div>
    )
}