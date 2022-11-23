function date(time){
    let now = new Date(time)
    return now.toLocaleDateString() + " " + now.toLocaleTimeString()
}
export default date