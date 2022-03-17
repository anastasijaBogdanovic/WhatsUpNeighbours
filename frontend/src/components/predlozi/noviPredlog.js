import React, {useState} from 'react'
import {Form, Button, FormGroup,FormControl,FormLabel} from 'react-bootstrap'

export default function NoviPredlog() {
    const [formDisplay,setFormDisplay]=useState("");
    const [naslov,setNaslov]=useState("");
    const [tekst,setTekst]=useState("");
    const toggleForm=()=>{
        setFormDisplay('true');
    }

   /* const dodajPredlog=()=>{

        const noviPredlog={
            naslov:naslov,
            tekst:tekst,
            autor:'Pera Peric',
            datum:new Date().toLocaleString(),
            brojZa:0,
            brojProtiv:0
        }


        props.setState(prevState=>{
            noviPredlog.id=prevState.length;
            return [noviPredlog,...prevState]
        })

        setNaslov("");
        setTekst("");
        setFormDisplay("");
    }*/

    return (
        <div>
            <Button variant='primary' onClick={toggleForm}>Kreiraj novi predlog</Button>
       {formDisplay &&
        <Form>
            <FormGroup>
                <FormLabel>Unesite naslov predloga: </FormLabel>
                <FormControl type='text' value={naslov}  onChange={e=>setNaslov(e.target.value)}/>
            </FormGroup>
          <FormGroup>
              <FormLabel>Unesite sadrzaj predloga: </FormLabel>
              <FormControl type='tekst' value={tekst} onChange={e=>setTekst(e.target.value)}></FormControl>
          </FormGroup>

          <Button variant="primary">
                Kreiraj predlog
           </Button>

            
        </Form>
       }
       </div>
    )
}
