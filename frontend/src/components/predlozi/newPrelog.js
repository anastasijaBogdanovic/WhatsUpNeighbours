import React, {useState,useContext} from 'react'
import {Form, Button, FormGroup,FormControl,FormLabel} from 'react-bootstrap'
import './newPredlog.scss'
import { Context } from "../../Store";

export default function NewPredlog(props) {
    const [formDisplay,setFormDisplay]=useState("");
    const [naslov,setNaslov]=useState("");
    const [tekst,setTekst]=useState("");
    const [state, dispatch] = useContext(Context);
    const toggleForm=()=>{
        setFormDisplay('true');
    }
    const f=props.setState;

   const dodajPredlog=async (props)=>{
       if(naslov==="" || tekst==="")
       {
           alert("Morate popuniti sva polja!")
       }
       else{
        const noviPredlog={
            naslov:naslov,
            opis:tekst,
            imeAutora:state.stanar.ime+" "+state.stanar.prezime,
            datumObjave:new Date().toLocaleString(),
            brojZa:0,
            brojProtiv:0
        }


       
        

       const response=await fetch('http://localhost:5000/WUNPredlozi/KreirajPredlog',{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                naslov:naslov,
                opis:tekst,
                brZa:0,
                brProtiv:0,
                datumObjave:new Date(new Date().getTime()-(new Date().getTimezoneOffset()*60000)).toJSON(),
                idAutora:state.stanar.id
            })

        });
        const content=await response.json();
        console.log(content);

        f(
            prevState=>{
            noviPredlog.id=content.id;
            console.log(noviPredlog.id);
            return [noviPredlog,...prevState]
        })

        setNaslov("");
        setTekst("");
        setFormDisplay("");

    }
}

    return (
        <div className='formaNewPredlog'>
            <Button variant='danger' onClick={toggleForm}>Kreiraj novi predlog</Button>
       {formDisplay &&
        <Form>
            <FormGroup>
                <FormLabel>Unesite naslov predloga: </FormLabel>
                <FormControl type='text' value={naslov}  onChange={e=>setNaslov(e.target.value)}/>
            </FormGroup>
          <FormGroup>
              <FormLabel>Unesite sadrzaj predloga: </FormLabel>
              <textarea  rows='6' value={tekst} onChange={e=>setTekst(e.target.value)}></textarea>
          </FormGroup>

          <Button variant="danger" onClick={dodajPredlog}>
                Kreiraj predlog
           </Button>

            
        </Form>
       }
       </div>
    )
}

