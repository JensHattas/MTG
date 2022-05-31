import axios from "axios";
import path from "path";
import { stringify } from "querystring";
const mtg = require('mtgsdk');
const express = require('express');
const ejs = require('ejs'); 
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
let doSomeDBCalls = async (Deck:any) => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        let rest:any = await client.db('MagicTheGatheringAxolotl').collection(Deck).find({});
        let Decks:any = await rest.toArray();
        return Decks;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

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
app.get('/Contact',async (req:any, res:any)=>{

    res.render('contact.ejs');
})
app.get('/DrawTest',async (req:any, res:any)=>{

    res.render('DrawTest.ejs');
})
app.listen(app.get('port'), ()=>console.log( '[server] http://localhost:' + app.get('port')));

app.get('/Decks/Deck:index', async (req:any, res:any)=>{
    let Deckchoise = 'Deck' + req.params.index;
    let DeckCollection = await doSomeDBCalls(Deckchoise);
    let Manacost:number = 0;
    for (let index = 0; index < DeckCollection.length; index++) {
        try {
            Manacost = Manacost + Number(DeckCollection[index].Manacost);
        } catch (error) {
            console.log(error);
        }
    }
    //AVERAGE MANACOST FUCTION 

    let AverageManaCost = Math.round(Manacost / DeckCollection.length);
    let cardAmount = 0;
    let Landcards = 0;
    for (let index = 0; index < DeckCollection.length; index++) {
        if (DeckCollection[index].Type.includes('LandCard')) {
            Landcards++;
        }
        cardAmount = cardAmount + parseInt(DeckCollection[index].Hoeveelheid);
    }
    DeckCollection = JSON.stringify(DeckCollection);
    res.render('index3.ejs', {DeckCollection: DeckCollection, Deckchoise: Deckchoise, AverageManaCost: AverageManaCost,cardAmount: cardAmount, Landcards: Landcards});
})
app.post('/Decks/Deck:index/JSON', async (req:any, res:any)=>{
    let Deckchoise = 'Deck' + req.params.index;
    console.log(Deckchoise);
    let DeckCollection = await doSomeDBCalls(Deckchoise);
    res.json(DeckCollection);
})
app.post('/Decks/Deck:index', async (req:any, res:any)=>{
    let Deckchoise = 'Deck' + req.params.index;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await client.db('MagicTheGatheringAxolotl').collection(Deckchoise).deleteMany({});
        res.redirect(req.get('referer'));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    } 
})


app.listen(app.get('port'), ()=>console.log( '[server] http://localhost:' + app.get('port')));
