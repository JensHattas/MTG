const CardListFromDeck = document.getElementById('CardListFromDeck');
const CardList = document.getElementById('CardList');
const searchbar = document.getElementById('Searchbar');
const CardOverlay = document.getElementById('CardDetails');
const Storedcards = document.getElementById('StoredCards');
const deckarea = document.getElementById("Decks");
const SuccesAlert = document.getElementById("SuccesAlert");
const DeckCollection = document.getElementById('DeckCollection').innerHTML;
const Deckchoise = document.getElementById('Deckchoise');
let MTGCards = [];



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

const displayDeck = (DECK) => {
    const htmlString = DECK
        .map((DECK) => {
            if (DECK.ImgURL != undefined){
            return `
            <li class="cardImages">
                <a href="#CardInfo" onclick="showCardDetails('${DECK}');"><img src="${DECK.ImgURL}"></img></a>
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
