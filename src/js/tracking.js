import * as UICtrl from './views/UICtrl';
import * as controller from './models/controller';
import { elements } from  './views/base';
import { searchTaskByTracking } from './api';

//Event listner for the tracking search form
document.querySelector(elements.trackingForm).addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const trackingNumber = formData.get('tracking-number');

    searchTaskByTracking(trackingNumber);
    
    UICtrl.showModal('#GGI843W42', "IMEI Checking", "iPhone XS Max", "8376327532734232", "Verizon - USA", 'Machele Ahmed', 'tracking');
    
    //please dont forget to reset after submission 
    // e.target.reset()
});

document.querySelector(elements.modal).addEventListener('click', (e) => {
    //Event listner to hide the modal 
    if(e.target.classList.contains('modal-show')) {
        UICtrl.hideModal();
    } else if(e.target.closest(elements.modalClose)) {
        UICtrl.hideModal();
    };
});