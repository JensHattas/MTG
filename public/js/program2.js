const CardListFromDeck = document.getElementById('CardListFromDeck');
const CardList = document.getElementById('CardList');
const searchbar = document.getElementById('Searchbar');
const CardOverlay = document.getElementById('CardDetails');
const Storedcards = document.getElementById('StoredCards');
const deckarea = document.getElementById("Decks");
const SuccesAlert = document.getElementById("SuccesAlert");

let MTGCards = [];



const loadCards = async () => {
    try {
        const res = await fetch('https://api.magicthegathering.io/v1/cards');
        MTGCards = await res.json();
        //console.log(MTGCards.cards[0]);
        displayCards(MTGCards.cards.sort());
    } catch (err) {
        console.error(err);
    }
};
loadCards();

const loadcards2 = () => {
    x = document.getElementById("Searchbar").value;
    loadCard(x.toLowerCase());
}


const loadCard = async (card) => {
    try {
        const res2 = await fetch(`https://api.magicthegathering.io/v1/cards?name=${card}`);
        SearchedCard = await res2.json();
        //console.log(SearchedCard)
        displayCards(SearchedCard.cards);
    } catch (err) {
        console.error(err);
    }
};

const displayCards = (cards) => {
    const htmlString = cards
        .map((cards) => {
            if (cards.imageUrl != undefined){
            return `
            <li class="cardImages">
                <a href="#CardInfo" onclick="showCardDetails('${cards.id}');"><img class=${cards.rarity} src="${cards.imageUrl}"></img></a>
            </li>
        `;
            }
            else 
            {
                console.log("error, Image not found. Card will not be displayed")
            }
        })
        .join('');
    CardList.innerHTML = htmlString;
};

const showCardDetails = async (card) => {
    try{
        const cardInfo = await fetch(`https://api.magicthegathering.io/v1/cards?id=${card}`);
        SearchedCard = await cardInfo.json();
        
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
                    <div class="col-lg-4">
                        <img src="${SearchedCard.cards[0].imageUrl}" id="cardImage"></img>
                    </div>
                    <div class="col-lg-8">
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
                            Add to Deck
                        </button>
                    </p>
                        <div class="collapse" id="collapseExample">
                            <div class="card card-body">
                                <form action="/" method="post" onsubmit="alert('Card(s) are succesfully added!');">
                                <div class="row">
                                    <div class="col-lg">    
                                        <label for="Hoeveelheid">Amount </label>
                                        <input type="number" id="Hoeveelheid" name="Hoeveelheid" min="1" max="4">
                                    </div>
                                    <div class="col-lg">
                                        <label for="DeckChoise">Add to </label>
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
                                    <input type="hidden" id="Type" name="Id" value='${card}'>
                                    <div class="col-lg">
                                        
                                        <button type="submit" >Add</button>
                                    </div>
                                    
                                </div>
                                </form>
                            </div>
                        </div>
                

            `;
    CardOverlay.innerHTML = CardDetails; 

}




//DRAWTEST
function shuffle(Deck) {
    let currentIndex = Deck.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [Deck[currentIndex], Deck[randomIndex]] = [
        Deck[randomIndex], Deck[currentIndex]];
    }
  
    return Deck;
  }
//call to shuffle array (shuffle(Deck1) bv)
