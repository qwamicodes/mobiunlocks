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
                    // ! check task type and display results accordingly
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

    const imeiCheckTaskEndpoint = `${baseBackendAPIURL}/tasks/imei/`;
    const icloudUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/icloud/`;
    const carrierUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/carrier/`;

    let allTasks = [], apiRequests = [];

    // loop over each task endpoint
    [imeiCheckTaskEndpoint, icloudUnlockTaskEndpoint, carrierUnlockTaskEndpoint].forEach(taskEndpoint => {
        // assign the Fetch API definition to a variable
        // ! The Fetch API is a Promise and so returns a Promise too. 
        const requestPromises = fetch(taskEndpoint).then(response => response.json());
        // push the Fetch API to the `apiRequests` array
        apiRequests.push(requestPromises);
    })

    /*
    ? return a Promise of a function that finally resolves into an Array of all the task objects `allTasks`
    ? The Promise concurrently makes the api requests via which the tasks are retrieved as arrays of tasks of the same type
    */
    return new Promise(resolve => {
        /* 
            This Promise.all concurrently makes the api requests to retrieve the tasks using the Fetch Promises that are in the `apiRequests` array
            and returns an array of the results (which are also arrays of task objects returned from each request) from the three api requests.
            Promise.all basically calls the Promises present in the array that is passed as an argument.
            In this case it makes requests to task endpoints which differ by type of task.
            Each of these endpoints returns an array of the tasks of a particular type.
            The returned arrays from each Fetch API request are also stored in an array to which Promise.all resolves - `taskTypes`
            The array of arrays is accessed by passing it as an argument to the `then` function of the Promise.all() Promise.
            This array of arrays is looped over and the individual arrays are also looped to retrieve individual tasks.
            Now the individual tasks are pushed to the `allTasks` array which this `getAllTasks` function shall resolve to.
            Finally, the magic that makes the difference is another `then` which is called of the previous one. This one takes no arguments and
            resolves the Promise that is returned by the `getAllTasks` async function into the `allTasks` array. 
            Therefore the `allTasks` array where all the individual tasks are put asynchronously, 
            is returned in a promise by the `getAllTasks` function.
            To access it, a variable to hold it must be passed as an argument to a `then` function called of `getAllTasks` itself.  
        */    
        Promise.all(apiRequests) // ? concurrently make requests to task endpoints stored in the array which is passed in as the argument
            //? loop through the returned array recursively to retrieve and push all individual tasks to the finally resolved array
            .then(taskTypes => {
                taskTypes.forEach(taskType => {
                    taskType.forEach(task => allTasks.push(task));
                })
            })
            .then(() => resolve(allTasks)) // resolve Promise into array of all tasks
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
            for (a in data) {
                ta.push(a);
            }
            return ta;
        })
    console.log(ta.length)
}
