const tictacControler = ( () => {
    return{
        // Ramdon player go first
        ramdomPlayer: () => {
            let activePlayer = (Math.random() >= 0.5) 
            activePlayer >= 0.5 ? activePlayer = 1 : activePlayer = 0;
            console.log('ramdom es: ' + activePlayer);
            return activePlayer;
        }
    }

})();

const UIController = ( () => {
    const DOMstrings = {
        gameContainer: '.game-container',
        modalContainer: '.modal-container',
        btnModalClose: '.close',
        btnModalStart: '.btn-modal',
        btnStart: '.btn-start',
        btnReset: '.btn-reset',
        playerOne:'.player-0',
        playerTwo: '.player-1',
        modal: '.modal',
        box0: '.box-0',
        box1: '.box-1', 
        box2: '.box-2',
        box3: '.box-3',
        box4: '.box-4',
        box5: '.box-5',
        box6: '.box-6',
        box7: '.box-7',
        box8: '.box-8'

    }

    return {
        displayModal: (e) => {
            console.log('Entre a displayModal');
            // let prueba = document.querySelectorAll(DOMstrings.modalContainer)[0];
            document.querySelector(DOMstrings.modalContainer).style.opacity = 1;
            document.querySelector(DOMstrings.modalContainer).style.visibility = 'visible';
            document.querySelector(DOMstrings.modal).classList.toggle('modal-close');
          
        },
        closeModal: (e) => {
            console.log('Entre a closeModal');
            document.querySelector(DOMstrings.modal).classList.toggle('modal-close');
            setTimeout(() => { // We set a timer to wait the transition effect
                document.querySelector(DOMstrings.modalContainer).style.opacity = 0;
                document.querySelector(DOMstrings.modalContainer).style.visibility = 'hidden';
            },900);
        },
        nextPlayer: (activePlayer) => {
            // siguiente jugador
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            roundScore = 0;
            //cabio la sombra del plane dependiendo del jugador activo
            document.querySelector(DOMstrings.playerOne).classList.toggle('player-active');
            document.querySelector(DOMstrings.playerTwo).classList.toggle('player-active');
            // pongo en blanco el dado
            // document.querySelector('.dice--0').style.display = 'none';
            // document.querySelector('.dice--1').style.display = 'none'
        },
        displayDOM: (obj) => {
            document.querySelector(DOMstrings.box1).textContent = "X";

        },
        getDOMstrings:() => { // Here we make "public" or make accessible the DOMstrings object for the other App Modules
            return DOMstrings;
        }
    };
    
})();

const controller = ((tictacCtrl, UICtrl) => {

    // Event listener
    const setupEventListeners = () =>{
        const DOM = UICtrl.getDOMstrings(); // Here we call DOMstrings Object to get the DOM string that we need
        document.querySelector(DOM.gameContainer).addEventListener('click', ctrlGameClick); //Game Contaner click
        //--- Btn Game Events----
        document.querySelector(DOM.btnStart).addEventListener('click', ctrlStartGame); //Start-Btn click
        document.querySelector(DOM.btnReset).addEventListener('click', ctrlResetGame); //Reset-Btn click
        //--- Modal Events----
        document.querySelector(DOM.btnModalStart).addEventListener('click', ctrlModalStart); //Btn-ModalStart
        document.querySelectorAll(DOM.btnModalClose)[0].addEventListener('click', function() {
            console.log('hola mundo');
        }); //Btn-ModalClose click
    }
    //Game Contaner click
    const ctrlGameClick = (e) => {
        console.log(e.target.classList);
        const newItem = UICtrl.displayDOM();
    };
    //Start-Btn click
    const ctrlStartGame = (e) => {
        console.log('Start');
        // UICtrl.ctrlModalStart();
    };
    //Reset-Btn click
    const ctrlResetGame = (e) => {
        console.log('Reset');
        // 1. Reset UI and reset all variables


        // 2. SelecT a ramdom Player
        tictacCtrl.ramdomPlayer()
        // 3. Display de Modal in the UI
        UICtrl.displayModal();
    };
    //Btn-ModalStart cick
    const ctrlModalStart = (e) => {
        console.log('Modal Start');
        // 1. Set de values that the player
        
        // 2. Close the Modal

    };
    //Btn-ModalClose click
    const ctrlModalClose = (e) => {
        console.log('entra ctrlModalClose');
        // 1. Reset de values that the player
        
        // 2. Close the Modal
        // UICtrl.closeModal();
    };
   

    return {        
        init: () => { 
            tictacCtrl.ramdomPlayer(); //Select a raamdom player
            // UICtrl.displayModal();
            setupEventListeners(); 
            console.log('App has started');

        }
    };

})(tictacControler,UIController);

controller.init();