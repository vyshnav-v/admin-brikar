function workTypeReducer(state={
    workTypedata : [],
    workTypeerror : '',
    workTypeloading : false,
    addWorktypeStatus : false,
    addWorktypeStatusFail : false
},action){
    switch (action.type){
        case 'set-data':
            return{
                ...state,
                workTypedata :action.payload
            }
        case 'loading' :
            return{
                ...state,
                workTypeloading : action.payload
            }
        case 'error' :
            return{
                ...state,
                workTypeerror : action.payload
            }
        case 'responseStatus' :
            return{
                ...state,
                addWorktypeStatus : action.payload
            }
        case 'responseStatusFail' :
            return{
                ...state,
                addWorktypeStatusFail : action.payload
            }
        default :
            return state;

    }
}

export default workTypeReducer;