import * as UICtrl from '../views/UICtrl';
import { elements } from '../views/base';
import { Payment } from './payment';

export const Data = {
    invoices : []
}

//funtion to run when to check if the page height is reach the limit 
export const checkNav = () => {
    window.pageYOffset >= 50 ?
        UICtrl.changeNavWhite() :
        UICtrl.changeNavTrans();
};

//funtion to the selection of the tabs 
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

//function to chect if there is a hash change
export const checkHashChange = () => {
    window.addEventListener('hashchange', e => {
        UICtrl.changeForm(location.hash);
    });
};

//function to enable a field if been passed as a parameter
export const enableField = field => {
    field.disabled = false;
};

//function to disenable a field if been passed as a parameter
export const disableField = field => {
    field.disabled = true;
};

//function that shows the payment section that pulls from the right side of the page
export const showPay = () => {
    const pay = document.querySelector(elements.payment);

    pay.classList.add('payment-show');
};

//function that hides the payment section that pulls from the right side of the page
export const hidePay = () => {
    const pay = document.querySelector(elements.payment);

    pay.classList.remove('payment-show');
};

//The class that take care of the price calc and showing the price on the UI  
export class Pay {
    constructor(type, model, modelName, network, imei) {
        this.type = type,
        this.model = parseInt(model, 10),
        this.modelName = modelName,
        this.network = network,
        this.imei = imei
        this.price = (0).toFixed(2);
    };
    
    //Method that takes care of the price calculation
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
                };
                break;
        };

        return this;
    };

    //Method that takes care of the inserting the price after been calc
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
            if(this.model >= 123) {
                let html = `
                    <div class="payment__items--item">
                        <span class="payment__items--sub">For All iPad iCloud unlocking</span>
                    </div>
                    <div class="payment__items--item">
                        <span class="payment__items--sub">Please contact Admin</span>
                    </div>
                    <div class="payment__items--item">
                        <span class="payment__items--sub">
                            <a target="_blank" style="color: brown" href="tel:+233203804551">+233 20 380 4551</a>
                        </span>
                    </div>
                `;
                document.querySelector(elements.paymentItems).innerHTML = html;
            } else {
                let html = `
                    <div class="payment__items--item">
                        <span class="payment__items--main">type</span>
                        <span class="payment__items--sub">${this.type}</span>
                    </div>
                    <div class="payment__items--item">
                        <span class="payment__items--main">carrier</span>
                        <span class="payment__items--sub">${this.modelName}</span>
                    </div>
                    <div class="payment__items--item">
                        <span class="payment__items--main">IMEI</span>
                        <span class="payment__items--sub">${this.imei}</span>
                    </div>
                `;
                document.querySelector(elements.paymentItems).innerHTML = html;
            };
        };
   
        document.querySelectorAll(elements.paymentPrice).forEach(el => {
            el.innerHTML = `GHC ${this.price}`;
        });

        document.querySelector('#amount').value = this.price;

        const price = this.price.split('.');
        document.querySelector('.payment-price-big').innerHTML = `${price[0]}`;
        document.querySelector('.payment-price-small').innerHTML = `.${price[1]} GHC`;
    };
};

//function that passes the information neccessary for triggering the paystack payment 
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
            };
            
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

//Function that receives the list elements and parses it into the modal
export const modalList = lists => {
    
    UICtrl.showModal(...lists);

};

//Function to copy the text from the UI
export const copyText = ele => {

    //creating a new textArea element in the DOM
    const textArea = document.createElement("textarea");

    //set the value of the new element as the content in the real element
    textArea.value = ele.textContent;

    //inserting the element into the DOM
    document.body.appendChild(textArea);

    //method to select the text in the element
    textArea.select();

    //comand to run the copy 
    document.execCommand("Copy");

    //removing the created element
    textArea.remove();
    
    //alerting the user that text has been successfully copied
    alert('copied text');
};

//function to sort out the list
export const filterList = tab => {
   // TODO:
   //set the tab selected as active
   UICtrl.removeActiveTab('dashboard__tab')
   UICtrl.setActiveTab(tab, 'dashboard__tab');

   //query all the list
   const items = Array.from(document.querySelectorAll(elements.taskItem));

   //internal function to remove the display none calss
    const addList = () => { 
        items.forEach(item => {
            item.parentElement.classList.remove('u-display-none');
        });  
    };

    //calling it whenever the tab is clicked
    addList();
   
   //sort them in removing the unneeded
    if(tab.getAttribute('data-value') === 'all') {
        addList();
    } else {
        // filtering the list using from the status
        const lists = items.filter(item => item.lastElementChild.getAttribute('data-type') !== tab.getAttribute('data-value'));
        UICtrl.removeList(lists);
    };
};