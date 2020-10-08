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

document.querySelector(elements.cancelPayment).addEventListener('click', () => {
    controller.hidePay();
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

        if(form.elements[0].checked) {
            document.querySelectorAll(elements.ipadCarrier).forEach(el => {
                el.style.display = 'none'; 
            });
            document.querySelectorAll(elements.iphoneCarrier).forEach(el => {
                el.style.display = 'block'; 
            });
        } else if(form.elements[1].checked) {
            document.querySelectorAll(elements.iphoneCarrier).forEach(el => {
                el.style.display = 'none'; 
            });
            document.querySelectorAll(elements.ipadCarrier).forEach(el => {
                el.style.display = 'block'; 
            });
        };
        
        if(checkPhone.value === 'on' && carImei.value.length >= 15 && form.checkValidity()) {
            controller.enableField(btn);
        } else {
            controller.disableField(btn);
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
        } else {
            controller.disableField(btn);
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

        if(form.elements[0].checked) {
            document.querySelectorAll(elements.ipadUnlock).forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll(elements.iphoneUnlock).forEach(el => {
                el.style.display = 'block'; 
            });
        } else if(form.elements[1].checked) {
            document.querySelectorAll(elements.iphoneUnlock).forEach(el => {
                el.style.display = 'none'; 
            });
            document.querySelectorAll(elements.ipadUnlock).forEach(el => {
                el.style.display = 'block';
            });
        };
        
        if(checkPhone.value === 'on' && carImei.value.length >= 15 && form.checkValidity()) {
            controller.enableField(btn);
        } else {
            controller.disableField(btn);
        };
    });
});

[elements.carrierForm, elements.imeiForm, elements.unlockingForm].forEach(el => {
    document.querySelector(el).addEventListener('submit', e => {
        e.preventDefault();
        //TODO:
        //grab the values form the form
        switch (e.target.id) {
            case 'form-carrier':
                const phoneModel = e.target['carrier-model'].value;
                const modelName = e.target['carrier-model'][e.target['carrier-model'].selectedIndex].innerText;
                const carNetwork = e.target['carrier-network'].value;
                const carImei = e.target['carrier-imei'].value;

                new controller.Pay('carrier', phoneModel, modelName, carNetwork, carImei).calcPrice().insertPay();
                
                break;
            case 'form-imei':
                const imeiNetwork = e.target['imei-network'].value;
                const imeiImei = e.target['imei-imei'].value;

                new controller.Pay('imei', null, null, imeiNetwork, imeiImei).calcPrice().insertPay();
                
                break;
            case 'form-unlocking':
                const unlockingModel = e.target['unlocking-model'].value;
                const modName = e.target['unlocking-model'][e.target['unlocking-model'].selectedIndex].innerText;
                const unlockingImei = e.target['unlocking-imei'].value;

                new controller.Pay('unlocking', unlockingModel, modName, null, unlockingImei).calcPrice().insertPay();
                
            break;
        }

        controller.showPay();
        e.target.reset();
    });
});