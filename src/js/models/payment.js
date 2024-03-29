import * as controller from "./controller";
import * as UICtrl from "../views/UICtrl";
import { Data } from "./controller";
import { confirmPayAndStoreDetails, notifyAdminOfTaskViaSMS } from "../api";

// A funtion to generate the invoice and date
const invGen = id => {
    const ID = Math.floor(
        Math.random() * (9999999999 - 1000000000) + 1000000000
    );

    if (Data.invoices.length > 0) {
        Data.invoices.forEach(inv => {
            if (inv.invoiceID === id && id) {
                const ID = Math.floor(
                    Math.random() * (9999999999 - 1000000000) + 1000000000
                );
                if (id !== ID) {
                    return ID;
                } else {
                    invGen(ID);
                }
            }
        });
    }

    return ID;
};

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
        this.liveKey = "pk_live_e2c8b27dc18adf75c80952eb1e810baee9771bdc";
        this.invoiceID = invoiceParser();
        this.date = new Date().toLocaleString();
        this.email = email;
        this.lastName = lastName;
        this.firstName = firstName;
        this.amount = parseInt(amount, 10);
        // this.amount = 0.1; // ! TESTING PURPOSES
    }

    //Function to store the invoice with other neccessary infos
    storeInv() {
        // * first remove previous invoices from the Data object if any
        Data.invoices = []; // ? reset invoice

        Data.invoices.push({
            invoiceID: this.invoiceID,
            date: this.date,
            fullName: `${this.lastName} ${this.firstName}`,
            email: this.email,
            amount: this.amount,
        });

        return this;
    }

    //Function to make payment to paystack and store task details in DB
    makePayment() {
        let handler = PaystackPop.setup({
            key: this.liveKey,
            email: this.email,
            amount: this.amount * 100,
            firstname: this.firstName,
            lastname: this.lastName,
            ref: this.invoiceID,
            currency: "GHS",

            onClose: function () {
                UICtrl.popupAlert(
                    `Payment not completed. Please try again`,
                    "error"
                );
            },

            // upon payment success
            callback: function (response) {
                confirmPayAndStoreDetails(response.reference, Data.taskDetail)
                    // ? Confirm payment from backend server, store task details in DB
                    .then(taskDetails => {
                        // hide loader
                        UICtrl.hideLoader();
                        // notify of payment success
                        UICtrl.popupAlert(
                            `Payment completed! Your payment invoice/reference ID: ${response.reference}`,
                            "success",
                            10000
                        );
                        // show modal containing further instructions (TRACKING ID, etc.)
                        console.log(taskDetails.tracking_id);
                        console.log(taskDetails.task_type);
                        UICtrl.showModal(taskDetails, "home");
                        // console.log(taskDetails);

                        return new Promise(resolve => resolve(taskDetails));
                    })
                    // ? send SMS notification to admin
                    .then(taskDetails => {
                        // console.log("START taskDetails in sms notification");
                        // console.log(taskDetails);
                        // console.log("END taskDetails in sms notification");
                        notifyAdminOfTaskViaSMS(taskDetails.tracking_id);
                    })
                    .catch(error => UICtrl.popupAlert(error, "error"));
            },
        });

        handler.openIframe();

        return this;
    }
}
