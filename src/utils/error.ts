function handleError(errorMsg:string,errNo:number):string{
    console.log('srr msg: '+errorMsg);
     if(errNo == 1062){
        const splittedError = errorMsg.split(' ');
        return 'this '+splittedError[splittedError.length-1].toString()+' is already in use'
    }
    if(errNo == 1054){
        return 'not found this item';
    }
    console.log(errorMsg);
    return errNo.toString();
}
export  {handleError}