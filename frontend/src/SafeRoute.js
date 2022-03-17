import React,{useContext,useEffect} from 'react'
import {Context} from './Store'
import {BrowserRouter as Router, Switch, Route,useRouteMatch,Redirect} from 'react-router-dom'

function SafeRoute(props){

    const [state, dispatch] = useContext(Context);
    const Component=props.component;

    useEffect(()=>{
        dispatch({type:'SET_PATH',payload:props.path});
    },[])

    return(
        <Route exact={props.exact} path={props.path}>
            {state.isAuth?
            (<Component></Component>):
            (<Redirect to='/pocetna' />)}

        </Route>

    )
}

export default SafeRoute;

