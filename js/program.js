const CardList = document.getElementById('CardList');
const searchbar = document.getElementById('Searchbar');
const CardOverlay = document.getElementById('CardDetails');

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

// searchbar.addEventListener('keyup', (e) => {
//     const searchString = e.target.value.toLowerCase();
    
//     //if searchString is H -> h
//     //if searchString is h -> h
//     //convert de naam eerst naad lowercase, vergelijk dan...
//     //!!!!ONDERSTE IS NOG FOUT NIET AANRAKEN PLZ!!!!!!!
//     // const filteredCards = MTGCards.cards.filter((cards) => {
//     //     return cards.name.toLowerCase().includes(searchString);
//     // });
//     //DE PAGINA MAG NIET HERLADEN WORDNE
//     loadCard(searchString.toLowerCase());
//     //displayCards(filteredCards)
// });

const loadcards = () => {
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
                <p hidden>${cards.id}</p>
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
        console.log(SearchedCard.cards[0].name);
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
                <a href="#" class="close">&times;</a>
            `;
    
    CardOverlay.innerHTML = CardDetails;
    
}