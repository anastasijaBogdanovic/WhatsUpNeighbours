import React,{useState,useEffect} from 'react'
import {Table} from 'react-bootstrap'
import PlacenRacun from './placenRacun'
import NeplacenRacun from './neplacenRacun'
//potreban nam je broj stana, zatim fetch metodom prikupljamo sve racune za dat stan
//ispisuje se ukupan dug
//zatim se crtaju dve tabele: jedna za placene i jedna za neplacene racune
export default function RacuniZaStan(props) {
    const [stan,setStan]=useState(props.stan);
    const [iznosDugovanja,setIznosDugovanja]=useState(props.iznosDugovanja);
    console.log(stan);
    console.log('hi');
    console.log('racuni:'+props.racuni);
    console.log(props.racuni);
    //console.log(stan.racuniRef);

    const [placeni,setPlaceni]=useState(props.racuni.filter(racun=>racun.status==='placen'));
    const [neplaceni,setNeplaceni]=useState(props.racuni.filter(racun=>racun.status==='neplacen'));
   // console.log(neplaceni);
    useEffect(()=>{
        setPlaceni(props.racuni.filter(racun=>racun.status==='placen'));
        setNeplaceni(props.racuni.filter(racun=>racun.status==='neplacen'));
        setIznosDugovanja(props.iznosDugovanja);
    },[props.racuni,props.iznosDugovanja])
    
   // console.log(props);
   // console.log(neplaceni);
    return (
       
        <div className='racuni'>
            <h4>Ukupan dug: {iznosDugovanja}</h4>
            <h5>Placeni Racuni</h5>
            <Table striped bordered hover variant='dark'>
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
            <h5>Neplaceni racuni: </h5>
            <Table striped bordered hover variant='dark'>
                <thead>
                    <tr>
                    <th>Mesec</th>
                    <th>Godina</th>
                    <th>Iznos</th>
                    <th>Oznaci kao placen</th>
                    </tr>
                </thead>
                <tbody>
                {neplaceni.map(racun=>{
                return(
                    <NeplacenRacun key={new Date()*Math.random()} racun={racun} idStana={stan.id} setPlaceni={setPlaceni} setNeplaceni={setNeplaceni} setIznosDugovanja={setIznosDugovanja}/>
                )
            })}


                </tbody>
            </Table>
            
        </div>
    )
}
