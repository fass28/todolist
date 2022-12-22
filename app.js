/* adding express & bodyParser */
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    let today = new Date()
    let currentDay = today.getDay()
    let day = ''
    let dayEjs = ''

    if (currentDay === 6 || currentDay === 5 ){
        day = 'weekend'
    } else {
        day = 'weekday'
    }
    console.log(currentDay);
    switch (currentDay) {
        case 1:
            dayEjs = 'monday'
            break;
        case 2:
            dayEjs = 'tuesday'
            break;
        case 3:
            dayEjs = 'wendsday'
            break;
        case 4:
            dayEjs = 'thursday'
            break;
        case 5:
            dayEjs = 'friday'
            break;
        case 6:
             dayEjs = 'saturday'
             break;
        case 0:
            dayEjs = 'sunday'
            break;
        default:
            console.log('error in getting the value' + currentDay);
    }
    console.log(dayEjs);
    res.render('list', {kindOfDay: day,
        currentDayName: dayEjs})
})


app.listen(3000, function(){
    console.log('server running on port 3000');
})