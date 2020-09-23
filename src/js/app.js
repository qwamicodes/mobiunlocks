import * as UICtrl from './views/UICtrl';
import * as controller from './models/controller';
import { elements } from  './views/base';

//Onload page function that starts the svg magic 
document.onload = UICtrl.headerSVG();
document.onload = controller.checkNav();
document.onload = controller.tabSel(null, location.hash); 


//Onscroll function to trigger the background
document.addEventListener('scroll', controller.checkNav);

//Functionality for the tabs
document.querySelectorAll(elements.tab).forEach(tab => {
    tab.addEventListener('click', () => {
        controller.tabSel(tab);
    });
});

//Functionality for the tablets
document.querySelectorAll(elements.tablet).forEach(tablet => {
    tablet.addEventListener('click', () => {
        // controller.tabletSel(tablet);
    });
});

//Functionality for the forms
[document.querySelectorAll(elements.carrierForm, elements.imeiForm, elements.unlockingForm)].forEach(form => {
    
});