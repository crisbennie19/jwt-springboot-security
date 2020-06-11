export function getFirstDayMonth(date){
    let month:any = date.getMonth() + 1;
    let year:any = date.getFullYear();

    month = month < 10 ? '0'+ month : month;

    return year+"-"+ month + "-01"
};


export function getEndDayMonth(date){
    let month:any = date.getMonth() + 1;
    let year:any = date.getFullYear();

    month = month < 10 ? '0'+ month : month;

    return year+"-"+ month + "-30"
};

export function getDate(date){
    let month:any = new Date(date).getMonth() + 1;
    let day:any =  new Date(date).getDate();
    let year:any =   new Date(date).getFullYear();

    month = month < 10 ? '0'+ month : month;
    day = day < 10 ? '0'+day : day;

    return year + '-' + month + '-' + day
}

export function todayFullDate(){
    let month:any = new Date().getMonth() + 1;
    let day:any =  new Date().getDate();
    let year:any =   new Date().getFullYear();

    month = month < 10 ? '0'+ month : month;
    day = day < 10 ? '0'+day : day;

    return year + '-' + month + '-' + day
}
