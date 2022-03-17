import React from 'react'

//placen racun sadrzi mesec, godinu, iznos i datum placanja
export default function PlacenRacun(props) {
    return (
        <tr>
            <td>{props.racun.mesec}</td>
            <td>{props.racun.godina}</td>
            <td>{props.racun.iznos}</td>
            <td>{new Date(props.racun.datumPlacanja).toLocaleString()}</td>
            
        </tr>
    )
}
