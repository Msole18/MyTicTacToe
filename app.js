const tictacControler = ( () => {
    const gameState = false;
    const winState = [[0, 1, 2], 
                      [3, 4, 5], 
                      [6, 7, 8], 
                      [0, 4, 8], 
                      [6, 4, 2], 
                      [2, 5, 8], 
                      [1, 4, 7], 
                      [0, 3, 6]];


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
    // let contador = 0
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
        box: '.box',
        boxImg: '.image'
        // box0: '.box-0',
        // box1: '.box-1', 
        // box2: '.box-2',
        // box3: '.box-3',
        // box4: '.box-4',
        // box5: '.box-5',
        // box6: '.box-6',
        // box7: '.box-7',
        // box8: '.box-8'

    }

    return {
        displayPrueba: (obj) => {
            console.log('antes de if: ' + obj);
            if(obj.contains('box')) {
                const indexBox = Array.from(clickedBox.parentNode.children.indexOf(clickedBox));
                console.log('dentro de if' + indexBox);
            }
        },
        displayDOM: (obj) => {
            document.querySelector(DOMstrings.box1).textContent = "X";

        },
        displayIMG: () => {
            console.log('Probando insertar imagen');
            // contador = 1
            // document.querySelector(DOMstrings.box0).textContent = 'hola'
            // if (document.querySelector('.box').contains(box-2)) {
            //         const newHTML = '<img src="back.svg" alt="">';
            //         document.querySelector(DOMstrings.box4).insertAdjacentHTML('beforeend',newHTML);
            //         contador = 0
            // }
            const newHTML = '<img src="back.svg" alt="">';
            document.querySelector(DOMstrings.box).insertAdjacentHTML('beforeend',newHTML);           
                   
        },
        //------------MODAL--------------
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
        // ------- DOM Strings
        getDOMstrings:() => { // Here we make "public" or make accessible the DOMstrings object for the other App Modules
            return DOMstrings;
        }
    };
    
})();

const controller = ((tictacCtrl, UICtrl) => {
    const DOM = UICtrl.getDOMstrings();
    const boxesElement = document.querySelectorAll(DOM.gameContainer);
    const boxesImage = document.querySelectorAll(DOM.box);
    // Event listener
    const setupEventListeners = () =>{
        //--- Boxes click Events----
        
        for (let boxes of boxesElement) {
            boxes.addEventListener('click', ctrlGameClick);
            // boxes.addEventListener('click', ctrlGameClick,  {once: true}); //Game Contaner click
        }
        
        //--- Btn Game Events----
        document.querySelector(DOM.btnStart).addEventListener('click', ctrlStartGame); //Start-Btn click
        document.querySelector(DOM.btnReset).addEventListener('click', ctrlResetGame); //Reset-Btn click
        //--- Modal Events----
        document.querySelector(DOM.btnModalStart).addEventListener('click', ctrlModalStart); //Btn-ModalStart
        document.querySelector(DOM.btnModalClose).addEventListener('click', ctrlModalClose); //Btn-ModalClose click
    }
    //Game Contaner click
    const ctrlGameClick = (e) => {
        // document.querySelector(DOMstrings.).textContent = 'mi madree!'
        
        //UICtrl.displayIMG();
        const clickedBox = e.target;
        if (clickedBox.classList.contains('card')) {
            const clickedBoxIndex = Array.from(clickedBox.parentNode.children).indexOf(clickedBox)
            console.log('Index ' + clickedBoxIndex); 
            if (clickedBoxIndex === 0) {
               
                document.querySelector('.card').style.transform = "rotateY(180deg)";
                const newHTML = '<img src="monkey.svg" alt="">';
                document.querySelector('.back').insertAdjacentHTML('beforeend',newHTML); 
            }   
        }

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
        UICtrl.closeModal();
    };
   

    return {        
        init: () => { 
            for (let boxes of boxesImage) {
                boxes.style.display = 'block';
                boxes.src = 'monkey.svg';
            }
            tictacCtrl.ramdomPlayer(); //Select a raamdom player
            // UICtrl.displayModal();
            setupEventListeners(); 
            console.log('App has started');

        }
    };

})(tictacControler,UIController);

controller.init();