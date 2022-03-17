import React ,{useContext,useState} from 'react'
import PromeniStatus from './promeniStatus'
import PromenaLozinkeZgrade from './promenaLozinkeZgrade'
import UpdateStanar from './updateStanar'
import { Context } from "../../Store";
import {Button} from 'react-bootstrap'
import './stanarProfil.scss'
import {HiChevronDoubleUp} from 'react-icons/hi'


export default function StanarProfil() {
    const [state, dispatch] = useContext(Context);

    const isUpravnik=state.stanar.status==='upravnik'?true:state.stanar.status==='admin'?true:false;
    const isBlagajnikOrUpravnik=state.stanar.status==='upravnik'?true:state.stanar.status==='admin'?true:state.stanar.status==='blagajnik'?true:false;

    const [statusForm,toggleStatusForm]=useState("");
    const [lozinkaForm,toggleLozinkaForm]=useState("");

    return (
        <div className='stanarProfil'>
            <UpdateStanar />
            <div className='privilegije'>
               {isUpravnik && ( <Button className='dugme1' variant='danger'  onClick={()=>toggleLozinkaForm(true)}>Promeni lozinku zgrade</Button>)}
               {lozinkaForm && (<PromenaLozinkeZgrade />)}
               {lozinkaForm && (<div className='divIkonica'><HiChevronDoubleUp className='doubleUp' onClick={()=>toggleLozinkaForm(false)}/></div>)}
               {isBlagajnikOrUpravnik && ( <Button className='dugme1' variant='danger'  onClick={()=>toggleStatusForm(true)}>Promeni svoj status</Button>)}
               {statusForm && (<PromeniStatus />)}
               {statusForm && (<div className='divIkonica'><HiChevronDoubleUp className='doubleUp' onClick={()=>toggleStatusForm(false)}/></div>)}

            </div>
            
            
        </div>
    )
}
