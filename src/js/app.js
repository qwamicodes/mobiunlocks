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

//functionality for the various forms
['change', 'keyup'].forEach(env => {
    document.querySelector(elements.carrierForm).addEventListener(env, e => {

        const form = document.querySelector(elements.carrierForm);
        const checkPhone = form['car-phone'];
        const phoneModel = form['carrier-model'];
        const carNetwork = form['carrier-network'];
        const carImei = form['carrier-imei'];
        const btn = form.elements[`${form.elements.length - 1}`];
        
        console.log(checkPhone.value)
        if(checkPhone.value === 'on' && carImei.value.length >= 15 && form.checkValidity()) {
            controller.enableField(btn);
        };
    });
});


['change', 'keyup'].forEach(env => {
    document.querySelector(elements.imeiForm).addEventListener(env, e => {

        const form = document.querySelector(elements.imeiForm);
        const imeiNetwork = form['imei-network'];
        const carImei = form['imei-imei'];
        const btn = form.elements[`${form.elements.length - 1}`];
        
        if(carImei.value.length >= 15 && form.checkValidity()) {
            controller.enableField(btn);
        };
    });
});


['change', 'keyup'].forEach(env => {
    document.querySelector(elements.unlockingForm).addEventListener(env, e => {

        const form = document.querySelector(elements.unlockingForm);
        const checkPhone = form['unlock-phone'];
        const phoneModel = form['unlocking-model'];
        const carImei = form['unlocking-imei'];
        const btn = form.elements[`${form.elements.length - 1}`];
        
        if(checkPhone.value === 'on' && carImei.value.length >= 15 && form.checkValidity()) {
            controller.enableField(btn);
        };
    });
});

[elements.carrierForm, elements.imeiForm, elements.unlockingForm].forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
    });
});