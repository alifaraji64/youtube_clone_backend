export function handleError(errorMsg:string,errNo:number):string{
    if(errNo == 1062){
        const splittedError = errorMsg.split(' ');
        return 'this '+splittedError[splittedError.length-1].toString()+' is already in use'
    }
    return 'no is not 1062';
}