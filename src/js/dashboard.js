import * as UICtrl from './views/UICtrl';
import * as controller from './models/controller';
import { elements } from  './views/base';

//**** On Page Load Event listners ****//
// this function builds the tasj list and fills in the admin details
document.onload = controller.populatePage();


//**** Modal Event listners ****//

document.querySelector(elements.modal).addEventListener('click', (e) => {
    //Event listner to hide the modal 
    if(e.target.classList.contains('modal-show')) {
        UICtrl.hideModal();
    } else if(e.target.closest(elements.modalClose)) {
        UICtrl.hideModal();
    } else if(e.target.closest(elements.modalCopy)) {
        //Event listner to copy some text

        //parsing the span element to be copied by the function
        controller.copyText(e.target.closest(elements.modalCopy).previousElementSibling);
    };
});


//**** Sorting Event listners ****//
document.querySelectorAll(elements.taskTab).forEach(tab => {
    tab.addEventListener('click', () => {
        controller.filterList(tab);
    });
});

