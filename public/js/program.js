
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


const loadcards2 = () => {
//     mtg.card.where({name: x = document.getElementById("Searchbar").value})
//     .then(results => {
//     loadCard(results.toLowerCase());
// })
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
const displayDeck = (Deck) => {
    const htmlString = Deck
        .map((Deck) => {
            if (Deck.ImageURL != undefined){
            return `
            <li class="cardImages">
                <a href="#CardInfo" onclick="showCardDetails('${Deck}');"><img src="${Deck.ImageURL}"></img></a>
                <p>${Deck.Hoeveelheid}x</p>
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
                <img src="${SearchedCard.cards[0].imageUrl}"></img>
                <h2>${SearchedCard.cards[0].name}</h2>
                <p>${SearchedCard.cards[0].originalText}</p>
                <ul>
                <li>ManaCost: ${SearchedCard.cards[0].manaCost}</li>
                <li>Power: ${SearchedCard.cards[0].power}</li>
                <li>Toughness: ${SearchedCard.cards[0].toughness}</li>
                </ul>
                <p>${SearchedCard.cards[0].rarity}</p>
                <form action="/" method="post" onsubmit="alert('Card(s) are succesfully added!');">
                <label for="DeckChoise">Kies een deck:</label>
                    <select id="DeckChoise" name="DeckChoise">
                    <option value="Deck1">Deck1</option>
                    <option value="Deck2">Deck2</option>
                    <option value="Deck3">Deck3</option>
                    <option value="Deck4">Deck4</option>
                    <option value="Deck5">Deck5</option>
                    <option value="Deck6">Deck6</option>
                    </select>
                    <br>
                    <label for="Hoeveelheid">Hoeveel kaarten wil je toevoegen?:</label>
                    <input type="number" id="Hoeveelheid" name="Hoeveelheid" min="1" max="4">
                    <br>
                    <input type="hidden" id="Naam" name="Naam" value="${SearchedCard.cards[0].name}">
                    <input type="hidden" id="ImgURL" name="ImgURL" value='${SearchedCard.cards[0].imageUrl}'>
                    <input type="hidden" id="manaCost" name="manaCost" value='${SearchedCard.cards[0].manaCost}'>
                    <input type="hidden" id="Power" name="Power" value='${SearchedCard.cards[0].power}'>
                    <input type="hidden" id="Toughness" name="Toughness" value='${SearchedCard.cards[0].toughness}'>
                    <input type="hidden" id="Type" name="Type" value='${SearchedCard.cards[0].type}'>

                    <button type="submit" >Add</button>
                </form>
                <a href="#" class="close">&times;</a>
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