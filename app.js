/* adding express & bodyParser */
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

const app = express()
/* let items = ['buy food','cook food', 'eat food']
let item = '' */

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'))
console.log('path',__dirname);
app.set('view engine', 'ejs')

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/todolistDB')

const itemSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,'INSERTA EL NOMBRE DEl ITEM PNDJO']
    }
})


const Item = mongoose.model('Item', itemSchema)

const item1 = new Item({
    name: 'welcome to your to DO list'
})

const item2 = new Item({
    name: 'hit the button to add new item'
})

const item3 = new Item({
    name: '<----  hit this to delete an item'
})


const defaultItems = [item1,item2,item3]
/* 
Item.insertMany(defaultItems, function(err){
     if (err){
         console.log(err)
     } else {
        console.log('succesfully saved all the list to todolistDB');
    }
 }) */




app.get('/', function(req, res) {
    
    Item.find({},function(err, items){
        res.render('list', {
        currentDayName: 'Today',
        newlistItems: items
        })
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

