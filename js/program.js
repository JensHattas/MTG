const CardList = document.getElementById('CardList');
const searchbar = document.getElementById('Searchbar');
let MTGCards = [];
console.log("cringe");

searchbar.addEventListener('keyup', (e) => {
    const searchString = e.target.value;
    //console.log(e.target.value);
    //!!!!ONDERSTE IS NOG FOUT NIET AANRAKEN PLZ!!!!!!!
    const filteredCards = MTGCards.cards.filter((cards) => {
        return (cards.name.includes(searchString) || 
                cards.names.includes(searchString)
            );
    });
    console.log(filteredCards);
});
const loadCards = async () => {
    try {
        const res = await fetch('https://api.magicthegathering.io/v1/cards');
        MTGCards = await res.json();
        console.log(MTGCards.cards[0]);
        //displayCards(MTGCards);
    } catch (err) {
        console.error(err);
    }
};

/*const displayCards = (cards) => {
    const htmlString = cards
        .map((cards) => {
            return `
            <li class="character">
                <h2>${card.name}</h2>
                <img src="${card.image}"></img>
            </li>
        `;
        })
        .join('');
    CardList.innerHTML = htmlString;
};
*/
loadCards();
