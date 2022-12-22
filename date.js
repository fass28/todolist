
function getDate() {
    let today = new Date()
    let options = {
        weekday : 'long',
        day : 'numeric',
        month : 'long'
    }
    let day = today.toLocaleDateString('en-US', options)
    return day
}

function getDay() {
    let today = new Date()
    let options = {
        weekday : 'long',
    }
    today = today.toLocaleDateString('en-US', options)
    return today
}

module.exports.getDate= getDate
module.exports.getDay= getDay
