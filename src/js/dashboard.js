import * as UICtrl from './views/UICtrl';
import * as controller from './models/controller';
import { elements } from  './views/base';

//**** On Page Load Event listners ****//
document.onload = controller.populatePage();


//**** Modal Event listners ****//

//Event listner to show the modal
document.querySelectorAll(elements.taskItem).forEach(item => {
    item.addEventListener('click', e => {
        if(e.target.tagName === "LI") {
            //converting the htmlcollections (li's) form the DOM into an array
            const lists = [];
            Array.prototype.slice.call(e.target.parentElement.children).forEach(li => {
                lists.push(li.innerHTML);
            });

            controller.modalList(lists);
        };
    });
});

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

//**** Page Population Event listners ****//
