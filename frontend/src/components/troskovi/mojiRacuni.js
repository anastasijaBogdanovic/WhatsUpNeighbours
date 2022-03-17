import React,{useState,useEffect,useContext} from 'react'
import PlacenRacun from './placenRacun'
import NeplacenRacun from './neplacenRacun'
import {Table} from 'react-bootstrap'
import './blagajnikTroskovi.scss'
import {Context} from '../../Store'

export default function MojiRacuni() {
    const [placeni,setPlaceni]=useState([]);
    const [neplaceni,setNeplaceni]=useState([]);
    const [ukupanDug,setUkupanDug]=useState([]);
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
       
        const asyncFetch=async ()=>{
          const response1=await fetch('http://localhost:5000/WUNTroskovi/PreuzmiSvojePlaceneRacune',{
              credentials:'include'
          });
          const placeniRacuni=await response1.json();
          setPlaceni(placeniRacuni);
         
          const response2=await fetch('http://localhost:5000/WUNTroskovi/PreuzmiSvojeNeplaceneRacune',{
            credentials:'include'
        });

         

        const neplaceniRacuni=await response2.json();
        setNeplaceni(neplaceniRacuni);

         
        const response3=await fetch('http://localhost:5000/WUNTroskovi/UkupanDug',{
            credentials:'include'
        });

         

        const ukupanDug=await response3.json();
        setUkupanDug(ukupanDug.message);
        
    
        }

      
      
        asyncFetch();
      },[] );
    return (
        <div className='mojiRacuni'>
            <div className='status'>
            <h2>Status troskova</h2>
            <h4>Broj vaseg stana: <i>{state.stanar.brStana}</i></h4>
            <h4>Ukupno dugovanje za vas stan: <i>{ukupanDug}</i></h4>
            </div>
            
            <Table striped bordered hover variant='dark'>
            <caption>Placeni racuni</caption>
                <thead>
                    <tr>
                    <th>Mesec</th>
                    <th>Godina</th>
                    <th>Iznos</th>
                    <th>Datum placanja: </th>
                    </tr>
                </thead>
                <tbody>
                {placeni.map(racun=>{
                return(
                    <PlacenRacun key={new Date()*Math.random()} racun={racun} />
                )
            })}

                </tbody>
            </Table >
            
            <Table  className='neplaceni' striped bordered hover variant='dark'>
                <caption>Neplaceni racuni</caption>
                <thead>
                    <tr>
                    <th>Mesec</th>
                    <th>Godina</th>
                    <th>Iznos</th>
                   
                    </tr>
                </thead>
                <tbody>
                {neplaceni.map(racun=>{
                return(
                    <NeplacenRacun key={new Date()*Math.random()} racun={racun}  setPlaceni={setPlaceni} setNeplaceni={setNeplaceni} />
                )
            })}


                </tbody>
            </Table>
        </div>
    )
}
