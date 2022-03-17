import React from 'react'
import {Row} from 'react-bootstrap'
import './StavkaOglasneTable.scss'
//import background from '../sticky_note.png'

export default function StavkaOglasneTable({key,tekst,vreme,autor}) {
    return (
    <Row key={key} className='kontejner' style={{ backgroundImage: `url(${background})` }}>
           <blockquote className="blockquote mb-0 tekst-info">
                     <div >
        
                             {tekst}
                     </div>
                    <footer className="blockquote-footer">
                         <cite title="Source Title">{autor} , {vreme}</cite>
                    </footer>
            </blockquote>
            
</Row>
    )
}
