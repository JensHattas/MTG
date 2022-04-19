import { decks } from 'cards';
const deck = new decks.StandardDeck({ jokers: 2 });
deck.shuffleAll();
const hand = deck.draw(5);
const toExchange = hand.splice(2, 2);
deck.discard(toExchange);

hand.push(...deck.draw(2));