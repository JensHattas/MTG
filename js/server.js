const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {MongoClient} = require('mongodb');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res)
{
    res.send("express is working")
})

app.listen(3000,function(){
    console.log("server is running on 3000")
})

const uri = "mongodb+srv://probeer:v8jXWlerpOkemLyw@cluster0.krwcq.mongodb.net/MagicTheGatheringAxolotl?retryWrites=true&w=majority";

const client = new MongoClient(uri, {useUnifiedTopology: true});

const main = async () => {
    try {
        await client.connect();
       
       
        let andie =  {card: cardObject,quantity:6};
        let result = await client.db('MagicTheGatheringAxolotl').collection('Cards').insertMany(cards);
        console.log(result.insertedId);
        

            }
            catch (e){
                console.error(e);
            }
            finally {
                await client.close();
            }

        }
        main();
                
        


// const main = async () => {
//     try {
//         await client.connect();
       
       
//         // let andie =  {name: 'Andie',age:60};
//         // let result = await client.db('MagicTheGatheringAxolotl').collection('People').insertOne(andie);
//         // console.log(result.insertedId);

//         // let people = [{name: 'George', age: 19},{name: 'James', age: 30}];
//         // result = await client.db('MagicTheGatheringAxolotl').collection('People').insertMany(people);
//         // console.log(result.insertedCount);
//         // console.log(result.insertedIds);

//         // let random = [{type : 'human'}, {pokemon: 'Pichu', weight: 10}];
//         // result = await client.db('MagicTheGatheringAxolotl').collection('People').insertMany(random);
//         // console.log(result.insertedCount);
//         // console.log(result.insertedIds);

// //await client.db('MagicTheGatheringAxolotl').collection('People').deleteMany({})

//         // await client.db('MagicTheGatheringAxolotl')
//         // .collection('People')
//         // .updateOne({name:'Sven'},{$set:{name: 'Sven',age:41}}, {upsert:true});
//         let cursor = await client.db('MagicTheGatheringAxolotl').collection('People').find({});
//         let result = await cursor.toArray();
//         console.log(result);


//     }
//     catch (e){
//         console.error(e);
//     }
//     finally {
//         await client.close();
//     }

// }
// main();