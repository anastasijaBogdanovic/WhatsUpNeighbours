import React,{useContext} from 'react';
import './message.scss'
import {Context} from '../../Store'

export default function Message(props) {
    const [state, dispatch] = useContext(Context);
    const tip=state.stanar.id===props.message.autorId?'mojaPoruka':'tudjaPoruka';
    const autor=state.stanar.id===props.message.autorId?'Ja':props.message.autor;
    return (
        <div className={'kontejnerMessage'+" "+tip}>
            
            <div className={'poruka'+" "+tip}>{props.message.tekst}</div>
            <div className='futer'><i>-{`${autor}, ${props.message.vreme}`}</i></div>
            
        </div>
    )
}

