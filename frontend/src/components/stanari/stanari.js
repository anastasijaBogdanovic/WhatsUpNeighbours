import React,{useState,useEffect} from 'react'
import TabelaStanara from './tabelaStanara'
import './stanari.scss'
import {FiFilter} from 'react-icons/fi'

export default function Stanari() {

    const [stanariPrikaz,setStanariPrikaz]=useState([]);
    const [sortCriterium,setSortCriterium]=useState("ime");
    const [filterCriterium,setFilterCriterium]=useState("ime");
    const [filterValue,setFilterValue]=useState("");
    const [originalnaLista,setOriginalnaLista]=useState([]);

    useEffect(() => {
        console.log("hi");
        const asyncFetch=async ()=>{
          const response1=await fetch('http://localhost:5000/WUN/PreuzmiStanare');
          const listaStavki=await response1.json();
         
          console.log(response1);
          console.log(listaStavki);
          //listaStavki.map(stanar=>{stanar.brSprata=stanar.brSprata.toString()});
          setStanariPrikaz(listaStavki);
          setOriginalnaLista(listaStavki);
         
          console.log(listaStavki);
        
    
        }

      
      
        asyncFetch();
      },[] );


    const filter_and_sort=()=>{

        let noviNiz;
        if(filterValue===""){
            noviNiz=originalnaLista;
            console.log(noviNiz);
            console.log('cao');
        }
        else{
            console.log('cao');
           // if(filterCriterium==='brojSprata')
               //setFilterValue(prevValue=>prevValue.parseInt());
           
             noviNiz=stanariPrikaz.filter(stanar=>stanar[filterCriterium]==filterValue);
             noviNiz.forEach(stanar=>console.log(stanar[filterCriterium]));
            console.log(filterCriterium+" "+filterValue);
            
           // console.log('provara '+noviNiz===stanariPrikaz);
           // setStanariPrikaz(noviNiz);
            console.log(noviNiz);
            console.log(stanariPrikaz);
        }
       noviNiz=noviNiz.sort(compareFunction(sortCriterium));
        console.log(sortCriterium);
       console.log(noviNiz);
       console.log(noviNiz===stanariPrikaz);
       setStanariPrikaz(noviNiz.map(a=>({...a})));
       console.log(stanariPrikaz);

       // setStanariPrikaz(prevState=>prevState.sort(compareFunction(sortCriterium)));
    }

    const compareFunction=(property)=>{
      return function(a,b){
        if(property==='ime' || property==='prezime')
        {
            if(a[property]<b[property])
            return -1;
            if(a[property]>b[property])
            return 1;
            return 0;
        }
        else return a[property]-b[property];
    }
    }

    return (
        <div className='stanariKont'>
            <div className='zaglavlje'>
            <div className='sort'>
                <label>Sortiraj po: </label>
                <select name='sort' value={sortCriterium} onChange={e=>{setSortCriterium(e.target.value);console.log(sortCriterium)}} >

                    <option value='ime'>Imenu</option>
                    <option value='prezime'>Prezimenu</option>
                    <option value='brSprata'>Broju sprata</option>
                    <option value='brStana'>Broju stana</option>
                </select>
               {/*<div>{sortCriterium}</div>*/}
               
            </div>
            <div className='filter'>
                <FiFilter className='ikonicaFilter' />
                <label>Filtriraj po:</label>
                <select name='filter' value={filterCriterium} onChange={e=>setFilterCriterium(e.target.value)}>
                <option value='ime'>Imenu</option>
                    <option value='prezime'>Prezimenu</option>
                    <option value='brSprata'>Broju sprata</option>
                    <option value='brStana'>Broju stana</option>
                </select>
                <label>Filter vrednost: </label>
                <input type='text' value={filterValue} onChange={e=>setFilterValue(e.target.value)} />

            </div>
            <div>
                <button onClick={filter_and_sort}>Prikaži</button>
            </div>
            </div>

            <TabelaStanara stanari={stanariPrikaz} setStanariPrikaz={setStanariPrikaz} />
        </div>
    )
}
