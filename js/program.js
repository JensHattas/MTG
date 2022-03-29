const CardList = document.getElementById('CardList');
const searchbar = document.getElementById('Searchbar');
let MTGCards = [];

searchbar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    //if searchString is H -> h
    //if searchString is h -> h
    //convert de naam eerst naad lowercase, vergelijk dan...
    //!!!!ONDERSTE IS NOG FOUT NIET AANRAKEN PLZ!!!!!!!
    const filteredCards = MTGCards.cards.filter((cards) => {
        return cards.name.toLowerCase().includes(searchString);
    });
    displayCards(filteredCards)
    displaySearchedCard(searchString)
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