import * as controller from './controller';
import { Data } from './controller';


// A funtion to generate the invoice and date
const invGen = id => {
  const ID = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);

  if (Data.invoices.length > 0) {
    Data.invoices.forEach(inv => {
      if (inv.invoiceID === id && id) {
        const ID = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
        if (id !== ID) {
          return ID;
        } else {
          invGen(ID);
        }
      }
    });
  }

  return ID;
}

//A funtion to push the generated inv in the Data
export const invoiceParser = () => {
  let invoiceID = invGen();

  if (Data.invoices.length > 0) {
    invoiceID = invGen(invoiceID);
  }

  return invoiceID;
};

export class Payment {
  constructor(email, amount, firstName, lastName) {
    this.liveKey = '';
    this.invoiceID = invoiceParser();
    this.date = new Date().toLocaleString();
    this.email = email;
    this.amount = parseInt(amount, 10);
    this.lastName = lastName;
    this.firstName = firstName;
  }

  //Function to store the invoice
  storeInv() {
    Data.invoices.push({
      invoiceID: this.invoiceID,
      date: this.date,
      fullName: `${this.lastName} ${this.firstName}`,
      email: this.email,
      amount: this.amount,
    });

    return this;
  }

  //Function to make payment
  makePayment() {

    console.log('Payment Class', this);
    console.log('Data', Data.invoices);

    let handler = PaystackPop.setup({
      key: this.liveKey,
      email: this.email,
      amount: this.amount * 100,
      firstname: this.firstName,
      lastname: this.lastName,
      ref: this.invoiceID,
      currency: 'GHS',
      onClose: function () {
        // controller.popupAlert('Window closed.', 'danger', 'portal');
      },
      callback: function (response) {
        // make fetch call to db to create user upon payment
        // controller.popupAlert(`Payment complete! Reference: ${response.reference}`, 'success', 'portal');
        // controller.checkPayment(response.reference);
      }
    });

    // handler.openIframe();

    return this;
  }
}
