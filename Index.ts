import axios from "axios";
const mtg = require('mtgsdk');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const ejs= require('ejs'); // EJS import
app.use(bodyParser());
app.set('port',3000);
app.use(express.urlencoded({ extended:true}))
app.set('view engine', 'ejs'); // EJS als view engine
app.use(express.static("public"))
app.get('/',async (request:any, response:any)=>{
    response.render('index.ejs', {truefalse: true});
    
})
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://probeer:v8jXWlerpOkemLyw@cluster0.krwcq.mongodb.net/MagicTheGatheringAxolotl?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true });
let doSomeDBCalls = async () => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        let rest:any = await client.db('MagicTheGatheringAxolotl').collection('Deck1').find({});
        let Decks:any = await rest.toArray();
        return Decks;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
doSomeDBCalls();
// Shows all cards in the colection --------------------------^
app.post('/addDecks',async(req:any, res:any)=>{
    let Deckchoise = req.body.DeckChoise;
    let Hoeveelheid = req.body.Hoeveelheid;
    let data = JSON.stringify(req.body.objectTerug);
    console.log(data)

    //let input = {Hoeveelheid, data};
 
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await client.db('MagicTheGatheringAxolotl').collection('Deck1').insertOne({Hoeveelheid: Hoeveelheid,data : data});
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    } 
    res.render('index.ejs', {truefalse: true});
    //MOET RES RENDER NAAR DECKS PAGINA WORDEN!!!!!!!!
})


app.listen(app.get('port'), ()=>console.log( '[server] http://localhost:' + app.get('port')));