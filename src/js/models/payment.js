import * as controller from './controller';
import * as UICtrl from '../views/UICtrl';
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
    this.liveKey = 'pk_live_e2c8b27dc18adf75c80952eb1e810baee9771bdc';
    this.invoiceID = invoiceParser();
    this.date = new Date().toLocaleString();
    this.email = email;
    this.amount = parseInt(amount, 10);
    this.lastName = lastName;
    this.firstName = firstName;
  }

  //Function to store the invoice with other neccessary infos
  storeInv() {
    // * first remove previous invoices from the Data object if any
    Data.invoices = []; // ? reset invoice
    // console.log("cleared previous invoice data")

    Data.invoices.push({
      invoiceID: this.invoiceID,
      date: this.date,
      fullName: `${this.lastName} ${this.firstName}`,
      email: this.email,
      amount: this.amount,
    });

    return this;
  }

  //Function to make payment to paystack
  makePayment() {

    console.log('Payment Class', this);
    console.log('Invoice', Data.invoices);
    console.log('Task Detail', Data.taskDetail);

    let handler = PaystackPop.setup({
      key: this.liveKey,
      email: this.email,
      amount: this.amount * 100,
      firstname: this.firstName,
      lastname: this.lastName,
      ref: this.invoiceID,
      currency: 'GHS',
      onClose: function () {
        UICtrl.popupAlert(`Payment not completed. Please try again`, 'error');
      },
      callback: function (response) {
        // make fetch call to db to create user upon payment
        UICtrl.popupAlert(`Payment completed! Your payment invoice/reference ID: ${response.reference}`, 'success');
        // ! API CALL TO BACKEND WITH TASK DETAILS STORED IN THE `Data` object.
        // controller.checkPayment(response.reference);
      }
    });

    handler.openIframe();

    return this;
  }
}
