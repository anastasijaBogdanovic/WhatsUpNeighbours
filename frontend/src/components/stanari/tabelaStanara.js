import React from 'react'
import {Table} from 'react-bootstrap'
import ZaglavljeTabele from './zaglavljeTabele'
import RedTabele from './redTabele'

export default function TabelaStanara(props) {
    return (
        <Table striped bordered hover variant='dark'>
            <ZaglavljeTabele  />
           <tbody>
            {props.stanari.map(stanar=>{
                return(
                    <RedTabele key={stanar.id} stanar={stanar} setStanariPrikaz={props.setStanariPrikaz}/>
                )
            })}
            </tbody>
            
        </Table>
    )
}
