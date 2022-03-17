const Reducer = (state, action) => {
    console.log(state);
    console.log(action);
    console.log('pokrenuto');
    switch (action.type) {
        case 'SET_STANAR':
            return {
                ...state,
                stanar: action.payload
            };
        case 'SET_AUTH':
            return {
                ...state,
               isAuth:action.payload
            };
        case 'SET_PATH':
            return{
                ...state,
                prevPath:action.payload
            };
        case 'SET_NOTIFIKACIJE':
            return {
                ...state,
                notifikacije:action.payload
            };
        case 'SET_NOT_OGLASNA':
            return {
                ...state,
                notifikacije:{...state.notifikacije,notifikacijaOglasna:action.payload}

            };
     case 'SET_NOT_OBAVESTENJA':
                return {
                    ...state,
                    notifikacije:{...state.notifikacije,notifikacijaObavestenja:action.payload}
    
                };
        case 'SET_NOT_CET':
                    return {
                        ...state,
                        notifikacije:{...state.notifikacije,notifikacijaCet:action.payload}
        
                    };
     case 'SET_NOT_PREDLOZI':
            return {
                 ...state,
                 notifikacije:{...state.notifikacije,notifikacijaPredlozi:action.payload}
            
                        };
     case 'SET_NOT_SASTANCI':
             return {
                  ...state,
                 notifikacije:{...state.notifikacije,notifikacijaSastanci:action.payload}
                
                            };
     case 'SET_NOT_TROSKOVI':
             return {
                 ...state,
             notifikacije:{...state.notifikacije,notifikacijaTroskovi:action.payload}
                    
                                };
      
        default:
            return state;
    }
};

export default Reducer;