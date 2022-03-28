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
    console.log(filteredCards);
    displayCards(filteredCards);
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
            return `
            <li class="cardImages">
                <img class=${cards.rarity} src="${cards.imageUrl}"></img>
            </li>
        `;
        })
        .join('');
    CardList.innerHTML = htmlString;
};