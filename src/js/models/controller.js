import * as UICtrl from '../views/UICtrl';
import { elements } from '../views/base';
import { Payment } from './payment';

export const Data = {
    invoices : []
}

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
};

export const enableField = field => {
    field.disabled = false;
};

export const disableField = field => {
    field.disabled = true;
};

export const showPay = () => {
    const pay = document.querySelector(elements.payment);

    pay.classList.add('payment-show');
};

export const hidePay = () => {
    const pay = document.querySelector(elements.payment);

    pay.classList.remove('payment-show');
};

export class Pay {
    constructor(type, model, modelName, network, imei) {
        this.type = type,
        this.model = parseInt(model, 10),
        this.modelName = modelName,
        this.network = network,
        this.imei = imei
        this.price = (0).toFixed(2);
    }

    calcPrice () {
        switch (this.type) {
            case 'carrier':
                if(this.network === 'at&t' || this.network === 'verizon') {
                    if(this.model >= 101 && this.model <= 109 ) {
                        this.price =  (170).toFixed(2);
                    } else if(this.model >= 110 && this.model <= 113) {
                        this.price =  (270).toFixed(2);
                    } else if(this.model >= 114 && this.model <= 118) {
                        this.price =  (370).toFixed(2);
                    } else if(this.model >= 119 && this.model <= 122) {
                        this.price =  (470).toFixed(2);
                    };
                } else if(this.network === 'sprint') {
                    if(this.model >= 101 && this.model <= 109 ) {
                        this.price =  (250).toFixed(2);
                    } else if(this.model >= 110 && this.model <= 113) {
                        this.price =  (350).toFixed(2);
                    } else if(this.model >= 114 && this.model <= 118) {
                        this.price =  (450).toFixed(2);
                    } else if(this.model >= 119 && this.model <= 122) {
                        this.price =  (550).toFixed(2);
                    };
                } else if(this.network === 'tmobile') {
                } else if(this.network === 'o2' || this.network === 'tesco') {
                    if(this.model >= 101 && this.model <= 109 ) {
                        this.price =  (170).toFixed(2);
                    } else if(this.model >= 110 && this.model <= 113) {
                        this.price =  (270).toFixed(2);
                    } else if(this.model >= 114 && this.model <= 118) {
                        this.price =  (370).toFixed(2);
                    } else if(this.model >= 119 && this.model <= 122) {
                        this.price =  (470).toFixed(2);
                    };
                } else if(this.network === 'metropcs') {
                    if(this.model >= 101 && this.model <= 113 ) {
                        this.price =  (700).toFixed(2);
                    } else if(this.model >= 114 && this.model <= 122) {
                        this.price =  (1000).toFixed(2);
                    };
                };
                break;
            case 'imei':
                this.price = (25).toFixed(2);
                break;
            case 'unlocking':
                if(this.model >= 106 && this.model <= 115) {
                    this.price = (800).toFixed(2);
                } else if(this.model >= 116 && this.model <= 122) {
                    this.price = (1200).toFixed(2);
                }
                break;
        };

        return this;
    }

    insertPay ()  {
        if(this.type === 'carrier') {
            let html = `
                <div class="payment__items--item">
                <span class="payment__items--main">type</span>
                <span class="payment__items--sub">${this.type}</span>
                </div>
                <div class="payment__items--item">
                <span class="payment__items--main">model</span>
                <span class="payment__items--sub">${this.modelName}</span>
                </div>
                <div class="payment__items--item">
                <span class="payment__items--main">carrier</span>
                <span class="payment__items--sub">${this.network}</span>
                </div>
                <div class="payment__items--item">
                <span class="payment__items--main">IMEI</span>
                <span class="payment__items--sub">${this.imei}</span>
                </div>
            `;
            document.querySelector(elements.paymentItems).innerHTML = html;
        } else if(this.type === 'imei') {
            let html = `
                <div class="payment__items--item">
                    <span class="payment__items--main">type</span>
                    <span class="payment__items--sub">${this.type}</span>
                </div>
                <div class="payment__items--item">
                    <span class="payment__items--main">carrier</span>
                    <span class="payment__items--sub">${this.network}</span>
                </div>
                <div class="payment__items--item">
                    <span class="payment__items--main">IMEI</span>
                    <span class="payment__items--sub">${this.imei}</span>
                </div>
            `;
            document.querySelector(elements.paymentItems).innerHTML = html;
        } else if(this.type === 'unlocking') {
        } 
   
        document.querySelectorAll(elements.paymentPrice).forEach(el => {
            el.innerHTML = `GHC ${this.price}`;
        });

        document.querySelector('#amount').value = this.price;

        const price = this.price.split('.');
        document.querySelector('.payment-price-big').innerHTML = `${price[0]}`;
        document.querySelector('.payment-price-small').innerHTML = `.${price[1]} GHC`;
    }
}

export const preparePayment = (fullname, email, amount) => {
    let firstName, lastName;

    //function to split the fullname into first and last name
    const split = name => {
        const splited = name.split(' ');
        if(splited.length <= 2) {
            firstName = splited[0];
            if(splited[1]) {
                lastName = splited[1];
            } else {
                lastName = '';
            }
        } else {
            firstName = splited[0];
            lastName = `${splited[1]} ${splited[2]}`;
        };
        return firstName, lastName;
    };

    split(fullname);
    
    //parsing the details into the payment class
    new Payment(email, amount, firstName, lastName).storeInv().makePayment();
};