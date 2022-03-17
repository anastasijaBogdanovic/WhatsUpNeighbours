import React,{useState} from 'react'
import {Button} from 'react-bootstrap'

export default function PromenaLozinkeZgrade() {
    const [staraLozinka,setStaraLozinka]=useState("");
    const [novaLozinka,setNovaLozinka]=useState("");

    const validacija=()=>{
        if(staraLozinka.length<5)
          return false;
        if(novaLozinka.length<5)
          return false;
        return true;
    }

    const promeniLozinku=async ()=>{
        if(validacija()){
            const response=await fetch("http://localhost:5000/WUNPrivilegije/PromeniSifruZgrade",{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                credentials:'include',
                body: JSON.stringify({
                    staraSifra:staraLozinka,
                    novaSifra:novaLozinka
                  }
          
                )
    
               });
        console.log(response);
        
        if(response.status===200)
         alert ('Uspesno ste promenili sifru zgrade!');
        else if(response.status===400){
         alert('Pogresna uneta stara lozinka!');
         console.log(await response.json());
        }

           


        }
        else alert('Lozinke moraju imati po minimum 5 karaktera!')
    }

    return (
        <div className='promenaLozinke'>
           
            <label>Unesite prethodnu lozinku: </label>
            <input type='password' onChange={(ev)=>setStaraLozinka(ev.target.value)}/>
            <label>Unesite novu lozinku:</label>
            <input type='password' onChange={(ev)=>setNovaLozinka(ev.target.value)}/>
            <Button variant='success' block className='dugme' onClick={promeniLozinku}>Promeni lozinku zgrade</Button>

            
        </div>
    )
}
