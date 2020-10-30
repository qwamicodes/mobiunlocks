/* 
? Connections to the backend 
? All API requests are made here
? The event listeners that call these functions (for API requests) are also defined here
*/ 


import * as controller from './models/controller';
import * as elements from './views/base';

const baseBackendURL = "http://127.0.0.1:8080/";
const baseBackendAPIURL = "http://127.0.0.1:8080/api/v1/";
// const baseBackendURL = "https://api.mobitechunclocks.com/";
// const baseBackendAPIURL = "https://api.mobitechunclocks.com/api/v1/";


// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~FORM DATA COLLECTION~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const confirmPayAndStoreDetails = (paymentReference, taskDetails) => {
    /*
    This function is a heavy function that first confirms payment by sending a request with the reference
    to the backend. after payment is confirmed another request is sent to a different endpoint
    to store the task details. the endpoint to hit is determined by the `taskDetails` 
    */

    const confirmPaymentEndpoint = `${baseBackendAPIURL}payments/confirm/?reference=${paymentReference}`;

    fetch(confirmPaymentEndpoint, {
        method: 'GET',
    })
        .then(async response => {
            // JSON that contains response from payment confirmation,
            // includes payment customer details too
            const paymentData = await response.json(); 
            // if payment was made, then
            if (paymentData.payment_made === true){
                // send requests to create tasks in DB depending on task type
                switch (taskDetails.taskType) {
                    // IMEI Checking task
                    case "imei":
                        submitIMEICheckTask(paymentData.payment_info, taskDetails);
                        break;
                    
                    // Carrier Unlocking task
                    case "carrier":
                        submitCarrierUnlockTask(paymentData.payment_info, taskDetails);
                        break;
                    
                    // ICloud Unlocking task
                    case "unlocking":
                        submitICloudUnlockTask(paymentData.payment_info, taskDetails);
                        break;
                
                    default:
                        alert('error with task type');
                        break;
                }
            } else {
                alert('payment was not made')
            }
        })
}

const submitCarrierUnlockTask = (paymentDetails, taskDetails) => {
    const carrierUnlockTaskEndpoint = `${baseBackendAPIURL}tasks/carrier/`;
    
    fetch(carrierUnlockTaskEndpoint, {
        method: 'POST',
        body: {
            ...taskDetails,
            ...paymentDetails,
        },
    })
        .then(async response => {
            if (response.ok){
                const data = response.json();
                alert(data);
            } else {
                alert(response)
            }
        })
}

const submitICloudUnlockTask = (paymentDetails, taskDetails) => {
    const icloudUnlockTaskEndpoint = `${baseBackendAPIURL}tasks/icloud/`;
    
    fetch(icloudUnlockTaskEndpoint, {
        method: 'POST',
        body: {
            ...taskDetails,
            ...paymentDetails,
        },
    })
        .then(async response => {
            if (response.ok){
                const data = response.json();
                alert(data);
            } else {
                alert(response)
            }
        })
}

const submitIMEICheckTask = (paymentDetails, taskDetails) => {
    const imeiCheckTaskEndpoint = `${baseBackendAPIURL}tasks/imei/`;
    
    fetch(imeiCheckTaskEndpoint, {
        method: 'POST',
        body: {
            ...taskDetails,
            ...paymentDetails,
        },
    })
        .then(async response => {
            if (response.ok){
                const data = response.json();
                alert(data);
            } else {
                alert(response)
            }
        })
}