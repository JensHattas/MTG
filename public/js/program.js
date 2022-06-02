const CardListFromDeck = document.getElementById('CardListFromDeck');
const CardList = document.getElementById('CardList');
const searchbar = document.getElementById('Searchbar');
const CardOverlay = document.getElementById('CardDetails');
const Storedcards = document.getElementById('StoredCards');
const deckarea = document.getElementById("Decks");
const SuccesAlert = document.getElementById("SuccesAlert");
const DeckCollection = document.getElementById('DeckCollection').innerHTML;
const Deckchoise = document.getElementById('DeckChoise1').innerHTML;
let MTGCards = [];



const loadcards2 = () => {
    let Result = document.getElementById("Searchbar").value;
    Result.toLowerCase()

    let DeckCollectionArr = JSON.parse(DeckCollection.replace('&amp;', '&'));
    
    let newArray = [];
    let i = 0;
    for (let index = 0; index < DeckCollectionArr.length; index++) {
        let naam = DeckCollectionArr[index].Naam;
        console.log("naam: " + naam);

        if (naam.includes(Result)) {
            newArray[i] = DeckCollectionArr[index]
            i++;
        }

        console.log(newArray);
        
    }
    displayDeck(newArray);
}

const displayDeck = (DECK) => { 
    const htmlString = DECK
    .map((DECK) => {
        if (DECK.ImgURL != undefined){
            return `
            <li class="cardImages">
            <a href="#CardInfo" onclick="showCardDetails('${DECK.Id}','${DECK.Hoeveelheid}');"><img src="${DECK.ImgURL}"></img></a>
            <p style="font-weight: bold; width: 229px">${DECK.Hoeveelheid}x</p>
            </li>
            `;
        }
            else 
            {
                console.log("error, Image not found. Card will not be displayed")
            }
        })
        .join('');
        CardListFromDeck.innerHTML = htmlString;
};
displayDeck(JSON.parse(DeckCollection.replace('&amp;', '&')));

const showCardDetails = async (card, Hoeveelheid) => {
    try{
        const cardInfo = await fetch(`https://api.magicthegathering.io/v1/cards?id=${card}`);
        SearchedCard = await cardInfo.json();
        console.log(SearchedCard);
        
    }
    catch(err){
        console.log(err) 
    }
    let CardDetails =
    `
                <nav class="navbar navbar-light">
                <a class="navbar-brand" href="#"><h2>${SearchedCard.cards[0].name}</h2></a>
                <a href="#" class="close">&times;</a>
                </nav>
                <div class="row">
                <div class="col-4">
                <img src="${SearchedCard.cards[0].imageUrl}" id="cardImage"></img>
                </div>
                <div class="col-8">
                <p id="info">${SearchedCard.cards[0].originalText}</p>
                <ul>
                <li>ManaCost: ${SearchedCard.cards[0].cmc}</li>
                <li>Power: ${SearchedCard.cards[0].power}</li>
                <li>Toughness: ${SearchedCard.cards[0].toughness}</li>
                        </ul>
                        <p>Rarity: ${SearchedCard.cards[0].rarity}</p>
                        </div>
                        </div>
                        <button type="button" id="FloatButton" class="btn btn-danger">♡</button>
                        <p id="FloatButton">
                        <button  class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Remove or add from deck
                            </button>
                    </p>
                        <div class="collapse" id="collapseExample">
                        <div class="card card-body">
                        <form action="/Decks/${Deckchoise}/Delete" method="post" onsubmit="alert('Card(s) are succesfully Deleted!');">
                        <div class="row">
                        <div class="col">    
                                        <label for="Hoeveelheid">Amount </label>
                                        <input type="number" id="Hoeveelheid" name="Hoeveelheid" min="1" max="4">
                                    </div>
                                    <div class="col">
                                    <label for="DeckChoise">Delete from </label>
                                    <select id="DeckChoise" name="DeckChoise">
                                    <option value="Deck1">Deck1</option>
                                    <option value="Deck2">Deck2</option>
                                    <option value="Deck3">Deck3</option>
                                    <option value="Deck4">Deck4</option>
                                    <option value="Deck5">Deck5</option>
                                    <option value="Deck6">Deck6</option>
                                    </select>
                                    </div>
                                        <br>
                                        <input type="hidden" id="Naam" name="Naam" value="${SearchedCard.cards[0].name}">
                                        <input type="hidden" id="ImgURL" name="ImgURL" value='${SearchedCard.cards[0].imageUrl}'>
                                        <input type="hidden" id="manaCost" name="manaCost" value='${SearchedCard.cards[0].cmc}'>
                                        <input type="hidden" id="Power" name="Power" value='${SearchedCard.cards[0].power}'>
                                    <input type="hidden" id="Toughness" name="Toughness" value='${SearchedCard.cards[0].toughness}'>
                                    <input type="hidden" id="Type" name="Type" value='${SearchedCard.cards[0].type}'>
                                    <input type="hidden" id="Type" name="HoeveelheidInDeck" value='${Hoeveelheid}'>
                                    
                                    <div class="col">
                                        <button type="submit" style="btn btn-outline-danger">remove</button>
                                        </div>     
                                        </div>
                                        </form>
                        <form action="/Decks/${Deckchoise}/Add" method="post" onsubmit="alert('Card(s) are succesfully added!');">
                                        <div class="row">
                                            <div class="col">    
                                                <label for="Hoeveelheid">Amount </label>
                                                <input type="number" id="Hoeveelheid2" name="Hoeveelheid2" min="1" max="4">
                                            </div>
                                            <div class="col">
                                                <label for="DeckChoise">Add to </label>
                                                <select id="DeckChoise2" name="DeckChoise2">
                                                <option value="Deck1">Deck1</option>
                                                <option value="Deck2">Deck2</option>
                                                <option value="Deck3">Deck3</option>
                                                <option value="Deck4">Deck4</option>
                                                <option value="Deck5">Deck5</option>
                                                <option value="Deck6">Deck6</option>
                                                </select>
                                            </div>
                                                <br>
                                            <input type="hidden" id="Naam2" name="Naam2" value="${SearchedCard.cards[0].name}">
                                            <input type="hidden" id="ImgURL2" name="ImgURL2" value='${SearchedCard.cards[0].imageUrl}'>
                                            <input type="hidden" id="manaCost2" name="manaCost2" value='${SearchedCard.cards[0].cmc}'>
                                            <input type="hidden" id="Power2" name="Power2" value='${SearchedCard.cards[0].power}'>
                                            <input type="hidden" id="Toughness2" name="Toughness2" value='${SearchedCard.cards[0].toughness}'>
                                            <input type="hidden" id="Type2" name="Type2" value='${SearchedCard.cards[0].type}'>
                                            <input type="hidden" id="Type2" name="Id2" value='${card}'>
                                            <input type="hidden" id="Type2" name="HoeveelheidInDeck2" value='${Hoeveelheid}'>
                                            <div class="col">
                                                <button type="submit" >Add</button>
                                            </div>
                                                 
                                        </div>
                            </form>
                            </div>
                        </div>
                        `;
                        CardOverlay.innerHTML = CardDetails; 
                    }