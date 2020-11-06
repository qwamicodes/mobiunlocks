import * as UICtrl from './views/UICtrl';
import * as controller from './models/controller';
import { elements } from  './views/base';


//Event listner for the tracking search form
document.querySelector(elements.trackingForm).addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const trackingNumber = formData.get('tracking-number');
    
    

})
