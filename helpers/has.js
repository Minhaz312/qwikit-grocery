export const has = (data,key) => {
    if(data[key]==="" || data[key]===null || data[key]==="null" || data[key]===undefined){
        return false;
    }else{
        return true;
    }
}