import axios from "axios";
import path from "path";
const mtg = require('mtgsdk');
const express = require('express');
const ejs= require('ejs'); 
const bodyParser = require('body-parser');
const app = express();
app.set('port',3000);
//app.use(express.urlencoded({ extended:true}))
//app.use(express.json({ extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs'); // EJS als view engine
app.use(express.static(path.join(__dirname,"public")));
app.get('/',async (request:any, response:any)=>{
    response.render('index.ejs');
    
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
app.post('/',async(req:any, res:any)=>{
    
    let Deckchoise = req.body.DeckChoise;
    let Hoeveelheid = req.body.Hoeveelheid;
    let Naam = req.body.Naam;
    let ImgURL  = req.body.ImgURL;
    let Manacost = req.body.manaCost;
    let Power = req.body.Power;
    let Toughness = req.body.Toughness;
    let Type = req.body.Type;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        //await client.db('MagicTheGatheringAxolotl').collection('Deck1').remove({});
        await client.db('MagicTheGatheringAxolotl').collection(Deckchoise).updateOne({Naam: Naam}, {$set:{Hoeveelheid: Hoeveelheid, Naam: Naam, ImgURL: ImgURL, Manacost: Manacost, Power: Power, Toughness: Toughness,Type: Type}},{upsert:true});
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    } 
    res.render('index.ejs');
})
app.get('/Decks',async (req:any, res:any)=>{

    res.render('index2.ejs');
})
app.get('/Decks/Deck:index', async (req:any, res:any)=>{
    let Deckchoise = 'Deck' + req.params.index;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        //await client.db('MagicTheGatheringAxolotl').collection('Deck1').remove({});
        let Deck = await client.db('MagicTheGatheringAxolotl').collection(Deckchoise).find({});
        let DeckCollection = await Deck.toArray();
        res.render('index3.ejs', {Deckcollection: DeckCollection, Deckchoise: Deckchoise});
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    } 
})
app.listen(app.get('port'), ()=>console.log( '[server] http://localhost:' + app.get('port')));