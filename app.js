/* adding express & bodyParser */
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
let items = ['buy food','cook food', 'eat food']
let item = ''

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'))
console.log('path',__dirname);
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    let today = new Date()
    let currentDay = today.getDay()
    let day = ''
    
    if (currentDay === 6 || currentDay === 5 ){
        day = 'weekend'
    } else {
        day = 'weekday'
    }
  
    let options = {
        weekday : 'long',
        day : 'numeric',
        month : 'long'
    }

    let dayEjs = today.toLocaleDateString('en-US', options)
    
    res.render('list', {
        kindOfDay: day,
        currentDayName: dayEjs,
        newlistItems: items
    })
})

app.post('/', function(req, res){
    item = req.body.item
    console.log('valor de item', item);
    items.push(item)
    res.redirect('/')
    console.log(items);
    
})


app.get('/about', function(req, res) {
    res.render('about')
})

app.listen(3000, function(){
    console.log('server running on port 3000');
})

