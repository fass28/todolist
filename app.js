/* adding express & bodyParser */
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const _ = require('lodash')

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
/*         required: [true,'INSERTA EL NOMBRE DEl ITEM PNDJO']
 */    }
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


const listSchema = new mongoose.Schema({
    name: String,
    items:[itemSchema]
})

const List = mongoose.model('List', listSchema)

app.get('/', function(req, res) {
    
    Item.find({},function(err, items){
        if (items.length=== 0){
            Item.insertMany(defaultItems, function(err){
                if (err){
                    console.log(err)
                } else {
                    console.log('succesfully saved all the list to todolistDB');
                }
            })
          res.redirect('/')
        } else {

            res.render('list', {
            listTitle: 'Today',
            newlistItems: items
            })
        }
    })
})

app.get('/:path', function(req,res){
    const path = _.capitalize(req.params.path)

    List.findOne({name: path}, function(err, result){
        if(result){
            res.render('list', {
                listTitle: result.name,
                newlistItems: result.items
                })
            console.log('existe')
        }else{
            console.log('no existe');
            const list = new List({
                name: path,
                items: defaultItems
            })
        
            list.save() 
            res.redirect('/' + path)
        }
    })
})




app.post('/', function(req, res){
    let  itemName = req.body.newItem
    let listName = req.body.list
    const newItemName = new Item( {
        name: itemName
        })
     
    if (listName === 'Today'){
        newItemName.save()
        res.redirect('/')
    } else {
        List.findOne({name: listName}, function(err, result){
            result.items.push(newItemName)
            result.save()
            res.redirect('/'+ listName)
        })
    }
})


app.post('/delete', function(req,res){
    const checkedId = req.body.checkbox
    const inputListName = req.body.inputListName
    
    if(inputListName === 'Today'){
        Item.deleteOne({_id: checkedId}, function(err){
            if (err){
                console.log(err);
            }else{
                console.log('item borrado satisfactoriamnte');
                res.redirect('/')
            }
        })
    }else {
        List.findOneAndUpdate({name: inputListName},{$pull:{items:{_id:checkedId}}}, function(err,result){
            if(!err){
                res.redirect('/' + inputListName)
            }
        })
    }

})



app.get('/about', function(req, res) {
    res.render('about')
})

app.listen(3000, function(){
    console.log('server running on port 3000');
})

