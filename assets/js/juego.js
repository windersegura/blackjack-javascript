/**
 * 2C Two of Clubs
 * 2D Two of Diamonds
 * 2H Two of Hearts
 * 2S Two of Spades
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

//Esta funcion crea una nueva baraja
const crearDeck = () => {

    for(let i = 2; i <= 10; i++){
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }

    //console.log(deck);

    deck = _.shuffle( deck );
    console.log(deck);
    return deck;
}

crearDeck();

//Esta funcion me permite tomar una carta

const pedirCarta = () => {

    if( deck.length == 0 ){
        throw 'No hay Cartas en el Deck';
    }
    let carta = deck.pop();

    console.log(carta);
    console.log(deck);

    return carta;
}

pedirCarta();

const valorCarta = ( carta ) =>{

    const valor = carta.substring(0,carta.length - 1);
    return ( isNaN(valor) ) ? 
           ( valor === 'A' ) ? 11 : 10 
           : parseInt(valor);
}

const valor = valorCarta( 'AD' );

console.log( {valor} );

