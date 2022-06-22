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

app.get('/',async (req:any, res:any)=>{

    res.render('index4.ejs');
})
app.get('/Home',async (request:any, response:any)=>{
    response.render('index.ejs');
})
app.post('/Home',async(req:any, res:any)=>{
    
    let Deckchoise = req.body.DeckChoise;
    let Hoeveelheid = req.body.Hoeveelheid;
    let Naam = req.body.Naam;
    let ImgURL  = req.body.ImgURL;
    let Manacost = req.body.manaCost;
    let Power = req.body.Power;
    let Toughness = req.body.Toughness;
    let Type = req.body.Type;
    let Id = req.body.Id;
    try {
        await client.connect();
        await client.db('MagicTheGatheringAxolotl').collection(Deckchoise).updateOne({Naam: Naam}, {$set:{Hoeveelheid: Hoeveelheid, Naam: Naam, ImgURL: ImgURL, Manacost: Manacost, Power: Power, Toughness: Toughness,Type: Type, Id: Id}},{upsert:true});
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


app.post('/',async (req:any, res:any)=>{

    res.render('index4.ejs');
})

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
    //AVERAGE MANACOST FUCTION --v
    let AverageManaCost = Math.round(Manacost / DeckCollection.length);
    let cardAmount = 0;
    let Landcards = 0;

    for (let index = 0; index < DeckCollection.length; index++) {
        if (DeckCollection[index].Type.includes('Land')) {
            Landcards++;
        }
        cardAmount = cardAmount + parseInt(DeckCollection[index].Hoeveelheid);
    }
    DeckCollection = JSON.stringify(DeckCollection);
    res.render('index3.ejs', {DeckCollection: DeckCollection, Deckchoise: Deckchoise, AverageManaCost: AverageManaCost,cardAmount: cardAmount, Landcards: Landcards});
})
app.post('/Decks/Deck:index/JSON', async (req:any, res:any)=>{
    let Deckchoise = 'Deck' + req.params.index;
    let DeckCollection = await doSomeDBCalls(Deckchoise);
    res.json(DeckCollection);
})
app.post('/Decks/Deck:index/DeleteAll', async (req:any, res:any)=>{
    let Deckchoise = 'Deck' + req.params.index;
    try {
        await client.connect();
        await client.db('MagicTheGatheringAxolotl').collection(Deckchoise).deleteMany({});
        res.redirect(req.get('referer'));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    } 
})
app.post('/Decks/Deck:index/Delete',async(req:any, res:any)=>{
    
    let Deckchoise:string = req.body.DeckChoise;
    let Hoeveelheid:number = parseInt(req.body.Hoeveelheid);
    let Naam:string = req.body.Naam;
    let ImgURL:string  = req.body.ImgURL;
    let Manacost:number = req.body.manaCost;
    let Power:number = req.body.Power;
    let Toughness:number = req.body.Toughness;
    let Type:string = req.body.Type;
    let HoeveelheidInDeck:number = parseInt(req.body.HoeveelheidInDeck);
    try {
        await client.connect();
        if (HoeveelheidInDeck - Hoeveelheid <= 0) {
            await client.db('MagicTheGatheringAxolotl').collection(Deckchoise).deleteOne({Naam: Naam});
        } else {
            Hoeveelheid = HoeveelheidInDeck - Hoeveelheid;
            await client.db('MagicTheGatheringAxolotl').collection(Deckchoise).updateOne({Naam: Naam}, {$set:{Hoeveelheid: Hoeveelheid, Naam: Naam, ImgURL: ImgURL, Manacost: Manacost, Power: Power, Toughness: Toughness,Type: Type}},{upsert:true});
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    } 
    res.redirect(req.get('referer'));
})
app.post('/Decks/Deck:index/Add',async(req:any, res:any)=>{
    let Deckchoise:string = req.body.DeckChoise2;
    let Hoeveelheid:number = parseInt(req.body.Hoeveelheid2);
    let Naam:string = req.body.Naam2;
    let ImgURL:string  = req.body.ImgURL2;
    let Manacost:number = req.body.manaCost2;
    let Power:number = req.body.Power2;
    let Toughness:number = req.body.Toughness2;
    let Type:string = req.body.Type2;
    let Id:number = req.body.Id2;
    let HoeveelheidInDeck:number = parseInt(req.body.HoeveelheidInDeck2);
    try {
        await client.connect();
        if (HoeveelheidInDeck + Hoeveelheid > 4) {
            Hoeveelheid = 4;
            await client.db('MagicTheGatheringAxolotl').collection(Deckchoise).updateOne({Naam: Naam}, {$set:{Hoeveelheid: Hoeveelheid, Naam: Naam, ImgURL: ImgURL, Manacost: Manacost, Power: Power, Toughness: Toughness,Type: Type, Id: Id}},{upsert:true});
        }
        else{
            Hoeveelheid = Number(Hoeveelheid) + HoeveelheidInDeck;
            await client.db('MagicTheGatheringAxolotl').collection(Deckchoise).updateOne({Naam: Naam}, {$set:{Hoeveelheid: Hoeveelheid, Naam: Naam, ImgURL: ImgURL, Manacost: Manacost, Power: Power, Toughness: Toughness,Type: Type, Id: Id}},{upsert:true});
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    } 
    res.redirect(req.get('referer'));
})
//Heroku poort instellingen
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));
//, ()=>console.log( '[server] http://localhost:' + app.get('port'));
