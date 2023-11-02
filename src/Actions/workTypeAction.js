function workTypeAction(payload){
    return{
        type : 'workType',
        payload :payload
    };
}
function setWorkTypeData(data){
    return {
        type : 'set-data',
        payload : data
    };
}

function setWorkTypeLoading (isLoading){
    return {
        type : 'loading',
        payload : isLoading
    };
}

function setWorkTypeError (error){
    return{
        type : 'error',
        payload : error

    };
}
function setAddWorkTypeSuccess (responsestatus){
    return{
        type : 'responseStatus',
        payload : responsestatus

    };
}
function setAddWorkTypeFail (responsestatus){
    return{
        type : 'responseStatusFail',
        payload : responsestatus

    };
}
export default workTypeAction;
export{
    workTypeAction,
    setWorkTypeData,
    setWorkTypeLoading,
    setWorkTypeError,
    setAddWorkTypeSuccess,
    setAddWorkTypeFail
}
