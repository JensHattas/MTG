const CardList = document.getElementById('CardList');
const searchbar = document.getElementById('Searchbar');
let MTGCards = [];
let SearchedCard = [];

searchbar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    //if searchString is H -> h
    //if searchString is h -> h
    //convert de naam eerst naad lowercase, vergelijk dan...
    //!!!!ONDERSTE IS NOG FOUT NIET AANRAKEN PLZ!!!!!!!
    const filteredCards = MTGCards.cards.filter((cards) => {
        return cards.name.toLowerCase().includes(searchString);
    });
    loadCard(searchString);
    displayCards(filteredCards)
});


const loadCards = async () => {
    try {
        const res = await fetch('https://api.magicthegathering.io/v1/cards');
        MTGCards = await res.json();
        //console.log(MTGCards.cards[0]);
        displayCards(MTGCards.cards);
    } catch (err) {
        console.error(err);
    }
};
loadCards();

const loadCard = async (card) => {
    try {
        const res2 = await fetch(`https://api.magicthegathering.io/v1/cards?name=${card}`);
        SearchedCard = await res2.json();
        console.log(SearchedCard)
        //Returnd een array van de juiste kaarten maar ook een array van 100 kaarten omdat dat de max is;
        displayCard(SearchedCard);
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
                <img class=${cards.rarity} src="${cards.imageUrl}"></img>
            </li>
        `;
            }
            else 
            {
                console.log("error, Image not found. Card will not be showngi")
            }
        })
        .join('');
    CardList.innerHTML = htmlString;
};
