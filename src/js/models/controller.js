import * as UICtrl from '../views/UICtrl';
import { elements } from '../views/base';

export const checkNav = () => {
    window.pageYOffset >= 50 ?
        UICtrl.changeNavWhite() :
        UICtrl.changeNavTrans();
};

export const tabSel = (tab, hash = null) => {
    //TODO:
    //check if hash exists and use the controller
    if(hash && hash.includes("#/")) {
        //remove all active tabs
        UICtrl.removeActiveTab('tab');
        const tabs = document.querySelectorAll(elements.tab);
        switch (hash) {
            case '#/carrier':
                tabs.forEach(tab => {
                    if(tab.getAttribute('href') === hash) {
                        //set the active class to that tab
                        UICtrl.setActiveTab(tab, 'tab');
                        //change the form
                        UICtrl.changeForm(hash);
                    }
                });
                break;
            case '#/imei':
                tabs.forEach(tab => {
                    if(tab.getAttribute('href') === hash) {
                        //set the active class to that tab
                        UICtrl.setActiveTab(tab, 'tab');
                        //change the form
                        UICtrl.changeForm(hash);
                    }
                });
                break;
            case '#/unlocking':
                tabs.forEach(tab => {
                    if(tab.getAttribute('href') === hash) {
                        //set the active class to that tab
                        UICtrl.setActiveTab(tab, 'tab');
                        //change the form
                        UICtrl.changeForm(hash);
                    }
                });
                break;
        };
    } else if(hash === null) {
        //remove all active tabs
        UICtrl.removeActiveTab('tab');
        //set the active class to that tab
        UICtrl.setActiveTab(tab, 'tab');
        //check for hash change event
        checkHashChange();
    };
};

export const checkHashChange = () => {
    window.addEventListener('hashchange', e => {
        UICtrl.changeForm(location.hash);
    });
}

export const tabletSel = tablet => {
    //checking if the tablet is selected or vice-versa
    if(tablet.getAttribute('aria-sel') === 'true') {
        UICtrl.selElement(tablet);
        checkFields(tablet.parentElement.parentElement.parentElement);
    } else if(tablet.getAttribute('aria-sel') === 'false') {
        //Unselect all the elements
        UICtrl.unselAllElement('tablet');
        //select the element
        UICtrl.selElement(tablet);
        //check if the fields are enabled
        checkFields(tablet.parentElement.parentElement.parentElement);
    } else {
        //Unselect all the elements
        UICtrl.unselAllElement('tablet');
        //select the element
        UICtrl.selElement(tablet);
        //check if the fields are enabled
        checkFields(tablet.parentElement.parentElement.parentElement);
    };
};

export const checkFields = (form, next) => {
    
}

const disableFields = fields => {
    fields.forEach(field => {
        field.disabled = true;
    })
};

const enableField = field => {
    field.disabled = false;
};