"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var mtg = require('mtgsdk');
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();
app.set('port', 3000);
//app.use(express.urlencoded({ extended:true}))
//app.use(express.json({ extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs'); // EJS als view engine
app.use(express.static(path_1.default.join(__dirname, "public")));
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://probeer:v8jXWlerpOkemLyw@cluster0.krwcq.mongodb.net/MagicTheGatheringAxolotl?retryWrites=true&w=majority";
var client = new MongoClient(uri, { useUnifiedTopology: true });
var doSomeDBCalls = function (Deck) { return __awaiter(void 0, void 0, void 0, function () {
    var rest, Decks, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, 5, 7]);
                // Connect to the MongoDB cluster
                return [4 /*yield*/, client.connect()];
            case 1:
                // Connect to the MongoDB cluster
                _a.sent();
                return [4 /*yield*/, client.db('MagicTheGatheringAxolotl').collection(Deck).find({})];
            case 2:
                rest = _a.sent();
                return [4 /*yield*/, rest.toArray()];
            case 3:
                Decks = _a.sent();
                return [2 /*return*/, Decks];
            case 4:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, client.close()];
            case 6:
                _a.sent();
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
// Shows all cards in the colection --------------------------^
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render('index4.ejs');
        return [2 /*return*/];
    });
}); });
app.get('/Home', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        response.render('index.ejs');
        return [2 /*return*/];
    });
}); });
app.post('/Home', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Deckchoise, Hoeveelheid, Naam, ImgURL, Manacost, Power, Toughness, Type, Id, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Deckchoise = req.body.DeckChoise;
                Hoeveelheid = req.body.Hoeveelheid;
                Naam = req.body.Naam;
                ImgURL = req.body.ImgURL;
                Manacost = req.body.manaCost;
                Power = req.body.Power;
                Toughness = req.body.Toughness;
                Type = req.body.Type;
                Id = req.body.Id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 7]);
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.db('MagicTheGatheringAxolotl').collection(Deckchoise).updateOne({ Naam: Naam }, { $set: { Hoeveelheid: Hoeveelheid, Naam: Naam, ImgURL: ImgURL, Manacost: Manacost, Power: Power, Toughness: Toughness, Type: Type, Id: Id } }, { upsert: true })];
            case 3:
                _a.sent();
                return [3 /*break*/, 7];
            case 4:
                e_2 = _a.sent();
                console.error(e_2);
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, client.close()];
            case 6:
                _a.sent();
                return [7 /*endfinally*/];
            case 7:
                res.render('index.ejs');
                return [2 /*return*/];
        }
    });
}); });
app.get('/Decks', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render('index2.ejs');
        return [2 /*return*/];
    });
}); });
app.get('/Contact', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render('contact.ejs');
        return [2 /*return*/];
    });
}); });
app.get('/DrawTest', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render('DrawTest.ejs');
        return [2 /*return*/];
    });
}); });
app.listen(app.get('port'), function () { return console.log('[server] http://localhost:' + app.get('port')); });
app.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render('index4.ejs');
        return [2 /*return*/];
    });
}); });
app.get('/Decks/Deck:index', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Deckchoise, DeckCollection, Manacost, index, AverageManaCost, cardAmount, Landcards, index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Deckchoise = 'Deck' + req.params.index;
                return [4 /*yield*/, doSomeDBCalls(Deckchoise)];
            case 1:
                DeckCollection = _a.sent();
                Manacost = 0;
                for (index = 0; index < DeckCollection.length; index++) {
                    try {
                        Manacost = Manacost + Number(DeckCollection[index].Manacost);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                AverageManaCost = Math.round(Manacost / DeckCollection.length);
                cardAmount = 0;
                Landcards = 0;
                for (index = 0; index < DeckCollection.length; index++) {
                    if (DeckCollection[index].Type.includes('Land')) {
                        Landcards++;
                    }
                    cardAmount = cardAmount + parseInt(DeckCollection[index].Hoeveelheid);
                }
                DeckCollection = JSON.stringify(DeckCollection);
                res.render('index3.ejs', { DeckCollection: DeckCollection, Deckchoise: Deckchoise, AverageManaCost: AverageManaCost, cardAmount: cardAmount, Landcards: Landcards });
                return [2 /*return*/];
        }
    });
}); });
app.post('/Decks/Deck:index/JSON', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Deckchoise, DeckCollection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Deckchoise = 'Deck' + req.params.index;
                return [4 /*yield*/, doSomeDBCalls(Deckchoise)];
            case 1:
                DeckCollection = _a.sent();
                res.json(DeckCollection);
                return [2 /*return*/];
        }
    });
}); });
app.post('/Decks/Deck:index/DeleteAll', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Deckchoise, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Deckchoise = 'Deck' + req.params.index;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 7]);
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.db('MagicTheGatheringAxolotl').collection(Deckchoise).deleteMany({})];
            case 3:
                _a.sent();
                res.redirect(req.get('referer'));
                return [3 /*break*/, 7];
            case 4:
                e_3 = _a.sent();
                console.error(e_3);
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, client.close()];
            case 6:
                _a.sent();
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.post('/Decks/Deck:index/Delete', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Deckchoise, Hoeveelheid, Naam, ImgURL, Manacost, Power, Toughness, Type, HoeveelheidInDeck, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Deckchoise = req.body.DeckChoise;
                Hoeveelheid = parseInt(req.body.Hoeveelheid);
                Naam = req.body.Naam;
                ImgURL = req.body.ImgURL;
                Manacost = req.body.manaCost;
                Power = req.body.Power;
                Toughness = req.body.Toughness;
                Type = req.body.Type;
                HoeveelheidInDeck = parseInt(req.body.HoeveelheidInDeck);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, 8, 10]);
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                if (!(HoeveelheidInDeck - Hoeveelheid <= 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, client.db('MagicTheGatheringAxolotl').collection(Deckchoise).deleteOne({ Naam: Naam })];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                Hoeveelheid = HoeveelheidInDeck - Hoeveelheid;
                return [4 /*yield*/, client.db('MagicTheGatheringAxolotl').collection(Deckchoise).updateOne({ Naam: Naam }, { $set: { Hoeveelheid: Hoeveelheid, Naam: Naam, ImgURL: ImgURL, Manacost: Manacost, Power: Power, Toughness: Toughness, Type: Type } }, { upsert: true })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 10];
            case 7:
                e_4 = _a.sent();
                console.error(e_4);
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, client.close()];
            case 9:
                _a.sent();
                return [7 /*endfinally*/];
            case 10:
                res.redirect(req.get('referer'));
                return [2 /*return*/];
        }
    });
}); });
app.post('/Decks/Deck:index/Add', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Deckchoise, Hoeveelheid, Naam, ImgURL, Manacost, Power, Toughness, Type, Id, HoeveelheidInDeck, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Deckchoise = req.body.DeckChoise2;
                Hoeveelheid = parseInt(req.body.Hoeveelheid2);
                Naam = req.body.Naam2;
                ImgURL = req.body.ImgURL2;
                Manacost = req.body.manaCost2;
                Power = req.body.Power2;
                Toughness = req.body.Toughness2;
                Type = req.body.Type2;
                Id = req.body.Id2;
                HoeveelheidInDeck = parseInt(req.body.HoeveelheidInDeck2);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, 8, 10]);
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                if (!(HoeveelheidInDeck + Hoeveelheid > 4)) return [3 /*break*/, 4];
                Hoeveelheid = 4;
                return [4 /*yield*/, client.db('MagicTheGatheringAxolotl').collection(Deckchoise).updateOne({ Naam: Naam }, { $set: { Hoeveelheid: Hoeveelheid, Naam: Naam, ImgURL: ImgURL, Manacost: Manacost, Power: Power, Toughness: Toughness, Type: Type, Id: Id } }, { upsert: true })];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                Hoeveelheid = Number(Hoeveelheid) + HoeveelheidInDeck;
                return [4 /*yield*/, client.db('MagicTheGatheringAxolotl').collection(Deckchoise).updateOne({ Naam: Naam }, { $set: { Hoeveelheid: Hoeveelheid, Naam: Naam, ImgURL: ImgURL, Manacost: Manacost, Power: Power, Toughness: Toughness, Type: Type, Id: Id } }, { upsert: true })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 10];
            case 7:
                e_5 = _a.sent();
                console.error(e_5);
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, client.close()];
            case 9:
                _a.sent();
                return [7 /*endfinally*/];
            case 10:
                res.redirect(req.get('referer'));
                return [2 /*return*/];
        }
    });
}); });
//Heroku poort instellingen
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));
//, ()=>console.log( '[server] http://localhost:' + app.get('port'));
