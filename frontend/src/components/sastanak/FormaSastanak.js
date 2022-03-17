import React, {useState} from 'react'
//import InputGroup from './inputGroup'
import {Form, Button, FormGroup,FormControl,FormLabel} from 'react-bootstrap'
import './FormaSastanak.scss'

const ACTIONS={
    NOVI_SASTANAK:'dodaj_sastanak',
    POVECAJ_BROJ_ZAINTERESOVANIH:'povecaj_br_zainteresovanih'
}
let ids=0;



export default function FormSastanak(props){

    const [povod, setPovod]=useState('');
    const [vreme,setVreme]=useState('');
    const [mesto,setMesto]=useState('');

   


    async function  handleSubmit(e){

        e.preventDefault();
        ids++;
        console.log(ids);
        const response=await fetch('http://localhost:5000/WUNSastanci/KreirajSastanak',{
            method: "POST",
            credentials:'include',
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                mesto:mesto,
                povod:povod,
                brZainteresovanih:0,
                brNezainteresovasnih:0,
                vreme:vreme,
                
            })

        });
        const content=await response.json();
        console.log(content);
        props.dispatch({type:ACTIONS.NOVI_SASTANAK, payload:{id:content.id,povod: povod,vreme:vreme.toLocaleString(),mesto: mesto,brojZainteresovanih:0,brojNezainteresovanih:0}})
        props.setForm(false);

    }
    
    return(
        <Form className='formaSastanak' onSubmit={handleSubmit}>
         <FormGroup>
            <FormLabel>Povod: </FormLabel>
            <FormControl size='sm' type='text' placeholder='Unesite povod odrzavanja sastanka' value={povod} onChange={e=>setPovod(e.target.value)}></FormControl>
        </FormGroup>
        <FormGroup>
            <FormLabel>Vreme: </FormLabel>
            <FormControl size='sm' type='datetime-local' placeholder='Unesite vreme odrzavanja sastanka' value={vreme} onChange={e=>setVreme(e.target.value)}></FormControl>
        </FormGroup>
           
        <FormGroup>
            <FormLabel>Mesto: </FormLabel>
            <FormControl size='sm' type='text' placeholder='Unesite mesto odrzavanja sastanka' value={mesto} onChange={e=>setMesto(e.target.value)}></FormControl>
        </FormGroup>
           
            <Button variant="danger" type="submit" block>
                Kreiraj sastanak
           </Button>

        </Form>
    )
}