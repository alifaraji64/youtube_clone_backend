function handleError(errorMsg:string,errNo:number):string{
     if(errNo == 1062){
        const splittedError = errorMsg.split(' ');
        return 'this '+splittedError[splittedError.length-1].toString()+' is already in use'
    }
    if(errNo == 1054){
        return 'not found this item';
    }
    return errNo.toString();
}
export  {handleError}