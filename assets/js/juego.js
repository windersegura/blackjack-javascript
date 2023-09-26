/**
 * 2C Two of Clubs
 * 2D Two of Diamonds
 * 2H Two of Hearts
 * 2S Two of Spades
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias del Html
const btnPedir = document.querySelector( '#btnPedir' );
const btnDetener = document.querySelector( '#btnDetener' );
const btnNuevoJuego = document.querySelector( '#btnNuevo' );
const puntosHtml = document.querySelectorAll('small');
const jugadorCartas = document.querySelector( '#jugador-cartas' );
const computadoraCartas = document.querySelector( '#computadora-cartas' );
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

    deck = _.shuffle( deck );
    return deck;
}

crearDeck();

//Esta funcion me permite tomar una carta

const pedirCarta = () => {

    if( deck.length == 0 ){
        throw 'No hay Cartas en el Deck';
    }
    let carta = deck.pop();

    return carta;
}


const valorCarta = ( carta ) =>{

    const valor = carta.substring(0,carta.length - 1);
    return ( isNaN(valor) ) ? 
           ( valor === 'A' ) ? 11 : 10 
           : parseInt(valor);
}

//Turno cumputadora
const turnoComputadora = ( puntosMinimos ) =>{

     do{
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
    
        puntosHtml[1].innerText = puntosComputadora;
    
        //crear nueva imagen
        //<img class="carta" src="assets/cartas/10C.png" alt=""> 
        const imgCarta = document.createElement( 'img' );
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        computadoraCartas.append( imgCarta );

        if (puntosMinimos > 21){
            break;
        }

     }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ) );

     setTimeout(() =>{
        if(puntosComputadora === puntosMinimos){
            alert('Nadie Gana');
         }else if(puntosMinimos > 21){
            alert('Computadora Gana');
         }else if (puntosComputadora > 21 ){
            alert('Jugador Gana');
         } else{
            alert('Computadora Gana');
         }
     }, 10);
}


//Eventos
btnPedir.addEventListener('click', function () {
    
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );

    puntosHtml[0].innerText = puntosJugador;

    //crear nueva imagen
    //<img class="carta" src="assets/cartas/10C.png" alt=""> 
    const imgCarta = document.createElement( 'img' );
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    jugadorCartas.append( imgCarta );

    if ( puntosJugador > 21 ){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }else if ( puntosJugador === 21 ){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }
});

btnDetener.addEventListener('click', function () {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});


btnNuevoJuego.addEventListener('click', () =>{
    //location.reload();

    console.clear();
    deck = [];
    deck = crearDeck();

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    jugadorCartas.innerText = '';
    computadoraCartas.innerText = '';

});



