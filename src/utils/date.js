function date(time){
    let now = new Date(time)
    return now.toLocaleDateString() + " " + now.toLocaleTimeString()
}


export function compareDate(oldDateString, currentDateString= new Date() ){
    let h = Date.parse(oldDateString)
    let purchaseYear = new Date(h).getFullYear()
    let purchaseMonth = new Date(h).getMonth()
    let purchaseDay = new Date(h).getDay()
    let now = currentDateString

    let out = ""
    let year = Math.abs(now.getFullYear() - purchaseYear)
    if(year){
        out = year + " year "
    }
    let month = Math.abs(now.getMonth() - purchaseMonth)
    if(month){
        out += month +" month "
    }
    let day = Math.abs(now.getDay() - purchaseDay)
    if(day){
        out += day +" day "
    }
    return out
}
export default date