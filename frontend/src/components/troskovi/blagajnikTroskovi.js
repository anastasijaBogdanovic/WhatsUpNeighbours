import React,{useState} from 'react'
import DodajTroskove from './dodajTroskove'
import {Button} from 'react-bootstrap'
import RacuniZaStan from './racuniZaStan'
import './blagajnikTroskovi.scss'

export default function BlagajnikTroskovi() {
    const [brStana,setBrStana]=useState("");
    const [stan,setStan]=useState("");
    const [display,setDisplay]=useState(false);
    const [racuni, setRacuni]=useState("");
    const [iznosDuga,setIznosDuga]=useState("");

   const nadjiRacune=async ()=>{
       const response=await fetch('http://localhost:5000/WUNTroskovi/VratiStanSaDugovima/'+brStana);
       if(response.status===200){
       const content=await response.json();
       console.log(content);

       setStan(content);
       setRacuni(content.racuniRef);
       setIznosDuga(content.iznosDugovanja);
       setDisplay(true);
      
       }
       else if(response.status===204)
        alert('Uneli ste nepostojeci broj stana!')

}

  const prikaziRacune=()=>{
      
       if(display)
         return <RacuniZaStan stan={stan} racuni={racuni} iznosDugovanja={iznosDuga} />
       else return null;
  }

    return (
        <div className='blagajnik'>
           
            <h2>Troskovi stanara</h2>
            <div className='forme'>
            <DodajTroskove  />
            <div className='pogledaj'>
                <h5>Pogledajte racune za stan: </h5>
                <div>
                <label>Unesite broj stana: </label>
                <input type='number' onChange={(ev)=>setBrStana(ev.target.value)}></input>
                <Button variant='primary'onClick={nadjiRacune}>Nadji racune</Button>
                </div>
            </div>
            </div>

            {prikaziRacune()}
            
        </div>
    )
}
