import {Card} from 'react-bootstrap'
import './StavkaOglasneTable1.scss'
import pin from '../../pin.png'

export default function StavkaOglasneTable1({tekst,autor,vreme}){
    return(
        <Card className=" stavkaOgl karta border-info"   >
            <img src={pin} className='pin'></img>
            <Card.Body>
                <blockquote className="blockquote mb-0 text-info">
                <p>
                {tekst}
                </p>
                <footer className="blockquote-footer ">
                    Objavio: <cite title="Source Title">{autor}</cite>
                </footer>
                </blockquote>
            </Card.Body>

             <Card.Footer className='text-info'>
                    Vreme: {vreme}
            </Card.Footer>

        </Card>

    )
}