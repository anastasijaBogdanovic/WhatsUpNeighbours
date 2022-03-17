import React,{useState,useContext} from 'react'
import {Button} from 'react-bootstrap'
import { Context } from "../../Store";


export default function PromeniStatus() {
    const [state, dispatch] = useContext(Context);
    const [jmbg,setJmbg]=useState("");
    const validation=()=>{
        if(!jmbg || jmbg.length!=13)
         return false;
        return true;
    }
    const promeniStatus=async ()=>{

        if(validation()){
            const response=await fetch('http://localhost:5000/WUNPrivilegije/PromeniStatus/'+jmbg,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                credentials:'include',
               
    

            });

            if(response.status===200){
                alert('Uspesno stw promenili svoj status i dodelili ga drugom stanaru!');
                const content1=await response.json();
                dispatch({type:'SET_STANAR',payload:content1});

            }
            else alert('Nesto je poslo po zlu, pokusajte ponovo!')

        }
        else alert('Morate uneti 13-tocifreni maticni broj!')

    }
    return (
        <div className='promenaStatusa'>
            <label>Unesite maticni broj stanara koji preuzima vas status:</label>
            <input type='text' placeholder='unesite 13-cifreni jmbg stanara' onChange={(ev)=>setJmbg(ev.target.value)} />
            <Button variant='success' className='dugme' onClick={promeniStatus}>Promeni status</Button>
            
        </div>
    )
}
