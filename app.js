const tictacControler = ( () => {

})();

const UIController = ( () => {
    var DOMstrings = {
        container: '.container',
        startBtn: '.btn-star',
        newBtn: '.btn-new',
        box1: '.box-1', 
        box2: '.box-2',
        box3: '.box-3',
        box4: '.box-4',
        box5: '.box-5',
        box6: '.box-6',
        box7: '.box-7',
        box8: '.box-8',
        box9: '.box-9'

    }

    return {
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
        document.querySelector(DOM.container).addEventListener('click', ctrlAddItem); //Contaner click
        // document.querySelector(DOM.startBtn).addEventListener('click', ctrlStart); //Start-Btn click
        // document.querySelector(DOM.newBtn).addEventListener('click', ctrlNewGame); //New-Btn click
    }

    const ctrlAddItem = (elemet) => {
        console.log(elemet.target.classList);
        const newItem = UICtrl.displayDOM();
    };
    const ctrlStart = () => {

    };
    const ctrlNewGame = () => {
        
    };

    return {        
        init: () => { 
            setupEventListeners(); 
            console.log('App has started')
            
        }
    };

})(tictacControler,UIController);

controller.init();