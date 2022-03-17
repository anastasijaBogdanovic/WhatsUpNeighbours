import React from 'react'
import {Card} from 'react-bootstrap'
import './obavestenje.scss'


//svako obavestenje ima naslov, tekst, datum, autora i status autora (upravnik ili blagajnik)
export default function Obavestenje(props) {
    console.log("I rendered")
    return (
        <Card className='obavestenjeCard'>
            <Card.Header className='obavestenjeHeder'>
                <h3>{props.obavestenje.naslov}</h3>
                <label>{props.obavestenje.imeAutora}: <i>{props.obavestenje.statusAutora}</i></label>
            </Card.Header>
            <Card.Body className='obavestenjeBody'>{props.obavestenje.tekst}</Card.Body>
            <Card.Footer className='obavestenjeFuter'>{props.obavestenje.vreme}</Card.Footer>
            
        </Card>
    )
}
