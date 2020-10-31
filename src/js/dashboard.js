import * as UICtrl from './views/UICtrl';
import * as controller from './models/controller';
import { elements } from  './views/base';

//**** Modal Event listners ****/

//Event listner to show the modal
document.querySelector(elements.taskItem).addEventListener('click', e => {
    if(e.target.tagName === "LI") {
        console.log(e.target.parentElement.children)
    };
});

//Event listner to hide the modal 
document.querySelector(elements.modal).addEventListener('click', (e) => {
    if(e.target.classList.contains('modal-show')) {
        UICtrl.hideModal();
    } else if(e.target.closest(elements.modalClose)) {
        UICtrl.hideModal();
    };
});