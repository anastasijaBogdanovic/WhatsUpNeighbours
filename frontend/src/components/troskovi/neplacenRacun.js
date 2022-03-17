//neplacen racun sadrzi mesec, godinu, iznos dugovanja i opciju za placanje (vidljiva samo blagajniku)

import React,{useContext} from 'react'
import {Button} from 'react-bootstrap'
import {Context} from '../../Store'

export default function NeplacenRacun(props) {
    const [state, dispatch] = useContext(Context);
    const isBlagajnik=state.stanar.status==='blagajnik'?true:state.stanar.status==='admin'?true:false;
  //  console.log('i rerendered');
  //  console.log(props);
  const oznaciKaoPlacen=async ()=>{

      const response=await fetch(`http://localhost:5000/WUNTroskovi/PlatiMesec/${props.idStana}/${props.racun.mesec}/${props.racun.godina}`,{
        method:'PUT',
        credentials:'include',
        headers:{'Content-Type':'application/json'}

      });
      console.log(response);

      if(response.ok){
          console.log(await response.json());
    
          props.racun.datumPlacanja=new Date().toLocaleString();
          props.setPlaceni(prevState=>[...prevState,props.racun]);
          props.setNeplaceni(prevState=>prevState.filter(r=>r.id!==props.racun.id));
          props.setIznosDugovanja(prevState=>prevState-props.racun.iznos);
      }
  }
    return (
      
        <tr>
            <td>{props.racun.mesec}</td>
            <td>{props.racun.godina}</td>
            <td>{props.racun.iznos}</td>
            {isBlagajnik && <td><Button  variant='primary' onClick={oznaciKaoPlacen}>Oznaci kao placen</Button></td>}
            
        </tr>
    )
}
