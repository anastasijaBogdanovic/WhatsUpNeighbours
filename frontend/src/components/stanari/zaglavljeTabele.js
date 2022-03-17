import React,{useContext} from 'react'
import {Context} from '../../Store'

export default function ZaglavljeTabele() {
    const [state, dispatch] = useContext(Context);
    const isUpravnik=state.stanar.status==='upravnik'?true:state.stanar.status==='admin'?true:false;
    return (
        <thead>
            <tr>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Broj sprata</th>
                <th>Broj stana</th>
                <th>E-mail</th>
                <th>Broj telefona</th>
                <th>Status stanara</th>
                {isUpravnik && (<th>Maticni broj</th>)}
                {isUpravnik && (<th>Obrisi stanara</th>)}

            </tr>
            
        </thead>
    )
}
