/* 
? Connections to the backend 
? All API requests are made here
? The event listeners that call these functions (for API requests) are also defined here
*/


const baseBackendURL = "http://127.0.0.1:8080";
const baseBackendAPIURL = "http://127.0.0.1:8080/api/v1";
// const baseBackendURL = "https://api.mobitechunclocks.com";
// const baseBackendAPIURL = "https://api.mobitechunclocks.com/api/v1";


// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CONFIRM PAYMENT AND STORE TASK DETAILS IN DATABASE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// !! TESTING send requests to API endpoints to create tasks in DB depending on task type
export const testStoreDetails = taskDetails => {
    let paymentDetails = {
        "customer_name": "Jay",
        "customer_email": "jay@lasdf.com",
        "payment_amount": Math.trunc(Math.random() * 205),
        "payment_reference": Math.trunc(Math.random() * 1025731264223)
    };

    switch (taskDetails.taskType) {
        // IMEI Checking task

        case "imei":
            submitIMEICheckTask(paymentDetails, taskDetails);
            break;

        // Carrier Unlocking task
        case "carrier":
            submitCarrierUnlockTask(paymentDetails, taskDetails);
            break;

        // ICloud Unlocking task
        case "unlocking":
            submitICloudUnlockTask(paymentDetails, taskDetails);
            break;

        default:
            alert('error with task type');
            break;
    }

};
// !! 

export const confirmPayAndStoreDetails = (paymentReference, taskDetails) => {
    /*
    This function is a heavy function that first confirms payment by sending a request with the reference
    to the backend. after payment is confirmed another request is sent to a different endpoint
    to store the task details. The endpoint to hit is determined by the `taskDetails` 
    */

    const confirmPaymentEndpoint = `${baseBackendAPIURL}/payments/confirm/?reference=${paymentReference}`;

    fetch(confirmPaymentEndpoint, {
        method: 'GET',
    })
        .then(async response => {
            // JSON that contains response from payment confirmation,
            // includes payment customer details too
            const paymentData = await response.json();
            // if payment was made, then
            if (paymentData.payment_made === true) {
                // send requests to API endpoints to create tasks in DB depending on task type
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
};

const submitCarrierUnlockTask = (paymentDetails, taskDetails) => {
    const carrierUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/carrier/`;

    fetch(carrierUnlockTaskEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...taskDetails,
            ...paymentDetails,
        }),
    })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.log(response)
            }
        })
}

const submitICloudUnlockTask = (paymentDetails, taskDetails) => {
    const icloudUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/icloud/`;

    fetch(icloudUnlockTaskEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...taskDetails,
            ...paymentDetails,
        }),
    })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.log(response)
            }
        })
}

const submitIMEICheckTask = (paymentDetails, taskDetails) => {
    const imeiCheckTaskEndpoint = `${baseBackendAPIURL}/tasks/imei/`;

    fetch(imeiCheckTaskEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...taskDetails,
            ...paymentDetails,
        }),
    })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.log(response)
            }
        })
}

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ RETRIEVE TASK DETAIL USING TRACKING NUMBER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/* 
The tracking id entered by the user is sent to an API endpoint
*/
export const searchTaskByTracking = trackingID => {

    const taskSearchEndpoint = `${baseBackendAPIURL}/tasks/search/?tracking_id=${trackingID}`;

    fetch(taskSearchEndpoint, {
        method: 'GET',
    })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                // console.log(data); return

                // if task was found then get details
                const taskDetail = data['task_detail'];

                // if task was found and has been completed without error
                if (taskDetail['completed'] && !taskDetail['error']) {
                    alert(taskDetail['results']);
                    // switch (taskDetail['task_type']) {
                    //     case "imei":
                    //         alert(taskDetail['results']);
                    //         break;

                    //     default:
                    //         break;
                    // }
                } else if (taskDetail['error']) {
                    alert('Task error');
                } else if (!taskDetail['complete']) {
                    alert('Task incomplete');
                }

                // if task is not found
            } else if (response.status === 404) {
                alert("Task Not Found");
            }
        })

}

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ RETRIEVE ALL TASKS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const getAllTasks = async () => {
    /* 
    fetches all tasks by calling their respective endpoints
    stores these in a list of objects which is returned in the allTasks variable
    */

    // const getAllTasksEndpoint = `${baseBackendAPIURL}/tasks/all/`

    const imeiCheckTaskEndpoint = `${baseBackendAPIURL}/tasks/imei/`;
    const icloudUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/icloud/`;
    const carrierUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/carrier/`;

    let allTasks = [];
    let apiRequests = [];

    // loop over each task endpoint
    [imeiCheckTaskEndpoint, icloudUnlockTaskEndpoint, carrierUnlockTaskEndpoint].forEach(endpoint => {
        // perform get request to retrieve all tasks for each task type
        const prom = fetch(endpoint).then(response => response.json());
        apiRequests.push(prom);
    })

    return new Promise(resolve => {
        Promise.all(apiRequests) // make the api requests and returns an array of results of the three api requests
            .then(taskTypes => {
                taskTypes.forEach(taskType => {
                    taskType.forEach(task => allTasks.push(task));
                }) // push individual tasks to allTasks array.
            })
                .then(() => resolve(allTasks)) // return array of all tasks
    })
    
}


const getIMEICheckTasks = () => {
    const imeiCheckTaskEndpoint = `${baseBackendAPIURL}/tasks/imei/`;

    fetch(imeiCheckTaskEndpoint, {
        method: 'GET'
    })
        .then(async response => {
            if (response.ok) {
                return response.json(); // return task list
            } else {
                alert("error")
            }
        })
}


const getICloudUnlockTasks = () => {
    const ICloudUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/icloud/`;

    fetch(ICloudUnlockTaskEndpoint, {
        method: 'GET'
    })
        .then(async response => {
            if (response.ok) {
                return response.json(); // return task list
            } else {
                alert("error")
            }
        })
}


const getCarrierUnlockTasks = async () => {
    const CarrierUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/carrier/`;

    let ta = []

    fetch(CarrierUnlockTaskEndpoint, {
        method: 'GET'
    })
        .then(async response => {
            if (response.ok) {
                // console.log(response.json())
                return await response.json(); // return task list
            } else {
                alert("error")
            }
        })
            .then(async data => {
                // console.log(data);
                for (a in data){
                    ta.push(a);
                }
                return ta;
            })
    console.log(ta.length)
}
