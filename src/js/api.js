/* 
? Connections to the backend 
? All API requests are made here
? The event listeners that call these functions (for API requests) are also defined here
*/ 


import * as controller from './models/controller';
import * as elements from './views/base';

const baseBackendURL = "http://127.0.0.1:8000/";
const baseBackendAPIURL = "http://127.0.0.1:8000/api/v1/";
// const baseBackendURL = "https://api.mobitechunclocks.com/";
// const baseBackendAPIURL = "https://api.mobitechunclocks.com/api/v1/";


// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~FORM DATA COLLECTION~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const submitCarrierUnlockTask = e => {
    // e is the `submit` event of the form
    e.preventDefault();
    const carrierUnlockTaskEndpoint = `${baseBackendAPIURL}/c-unlock/`;
    
    const formData = newFormData(e.target);
    formData.
}