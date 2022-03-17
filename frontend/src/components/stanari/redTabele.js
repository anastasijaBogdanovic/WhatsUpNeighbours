import React,{useContext} from 'react'
import {Context} from '../../Store'
import {Button} from 'react-bootstrap'

//za svakog stanara se prikazuju podaci: ime, prezime, brojSprata, brojStana, email, brojTelefona
export default function RedTabele(props) {
    
    const [state, dispatch] = useContext(Context);
    const isUpravnik=state.stanar.status==='upravnik'?true:state.stanar.status==='admin'?true:false;
    const obrisiStanara=async ()=>{
        if( window.confirm(`Da li ste sigurni da zelite da obrisete stanara: ${props.stanar.ime} ${props.stanar.prezime}?`)){

            const response=await fetch('http://localhost:5000/WUNPrivilegije/ObrisiStanara/'+props.stanar.id,{
                method:'DELETE',
                headers:{'Content-Type':'application/json'},
                credentials:'include'
                
            });
            console.log(response);
            if(response.status===200){
                alert('Uspesno ste obrisali stanara!');
                props.setStanariPrikaz(prevState=>prevState.filter(stanar=>stanar.id!=props.stanar.id));
            }
            else alert('Doslo je do greske! Pokusajte ponovo!')

        }

       
        else console.log('no');
    }
    return (
        <tr>
            <td>{props.stanar.ime}</td>
            <td>{props.stanar.prezime}</td>
            <td>{props.stanar.brSprata}</td>
            <td>{props.stanar.brStana}</td>
            <td>{props.stanar.email}</td>
            <td>{props.stanar.brojTelefona}</td>
            <td>{props.stanar.status}</td>
            {isUpravnik && (<td>{props.stanar.jmbg}</td>)}
            {isUpravnik && (<td><Button variant='danger' onClick={obrisiStanara}>Obrisi</Button></td>)}
            
        </tr>
    )
}
