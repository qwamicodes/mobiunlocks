/* 
? Connections to the backend 
? All API requests are made here
? The event listeners that call these functions (for API requests) are also defined here
*/

// const baseBackendURL = "http://127.0.0.1:8001";
// const baseBackendAPIURL = "http://127.0.0.1:8001/api/v1";
const baseBackendURL = "https://api.mobitechunlock.com";
const baseBackendAPIURL = "https://api.mobitechunlock.com/api/v1";

// function to get cookie by name
const getCookie = cookieName => {
    var match = document.cookie.match(
        new RegExp("(^| )" + cookieName + "=([^;]+)")
    );
    if (match) return match[2];
};

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TASK OPERATIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// !! TESTING send requests to API endpoints to create tasks in DB depending on task type
export const mockconfirmPayAndStoreDetails = async (paystackReference, taskDetails) => {
    const mockConfirmPaymentEndpoint = `${baseBackendAPIURL}/payments/mock/confirm/?reference=${paystackReference}`;

    return new Promise((resolve, reject) => {
        fetch(mockConfirmPaymentEndpoint, {
            method: "GET",
        })
            .then(async response => {
                // JSON that contains response from payment confirmation,
                // includes payment customer details too
                const responseData = await response.json();
                // if payment was made, then
                if (responseData.payment_made === true) {
                    // ! remove Paystack reference from payment details to prevent conflict when storing task since a task with
                    // ! the same reference already exists
                    delete responseData.payment_info.paystack_reference;

                    // send requests to API endpoints to create tasks in DB depending on task type
                    switch (taskDetails.taskType) {
                        // IMEI Checking task
                        case "imei":
                            submitIMEICheckTask(
                                responseData.payment_info,
                                taskDetails,
                                responseData.acc_txn
                            )
                                .then(data => resolve(data))
                                .catch(error => reject(error));
                            break;

                        // Carrier Unlocking task
                        case "carrier":
                            submitCarrierUnlockTask(
                                responseData.payment_info,
                                taskDetails,
                                responseData.acc_txn
                            )
                                .then(data => resolve(data))
                                .catch(error => reject(error));
                            break;

                        // ICloud Unlocking task
                        case "unlocking":
                            submitICloudUnlockTask(
                                responseData.payment_info,
                                taskDetails,
                                responseData.acc_txn
                            )
                                .then(data => resolve(data))
                                .catch(error => reject(error));
                            break;

                        default:
                            reject("error with task type");
                            break;
                    }
                } else {
                    reject("payment was not made");
                }
            })
            .catch(error => reject(error));
    });
};
// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// TODO confirm payment and store task details in database
export const confirmPayAndStoreDetails = (paystackReference, taskDetails) => {
    /*
    This function is a heavy function that first confirms payment by sending a request with the reference
    to the backend. after payment is confirmed another request is sent to a different endpoint
    to store the task details. The endpoint to hit is determined by the `taskDetails` 
    */

    const confirmPaymentEndpoint = `${baseBackendAPIURL}/payments/confirm/?reference=${paystackReference}`;

    return new Promise((resolve, reject) => {
        fetch(confirmPaymentEndpoint, {
            method: "GET",
        })
            .then(async response => {
                // JSON that contains response from payment confirmation,
                // includes payment customer details too
                const responseData = await response.json();
                // if payment was made, then
                if (responseData.payment_made === true) {
                    // send requests to API endpoints to create tasks in DB depending on task type
                    switch (taskDetails.taskType) {
                        // IMEI Checking task
                        case "imei":
                            submitIMEICheckTask(
                                responseData.payment_info,
                                taskDetails,
                                responseData.acc_txn
                            )
                                .then(data => resolve(data))
                                .catch(error => reject(error));
                            break;

                        // Carrier Unlocking task
                        case "carrier":
                            submitCarrierUnlockTask(
                                responseData.payment_info,
                                taskDetails,
                                responseData.acc_txn
                            )
                                .then(data => resolve(data))
                                .catch(error => reject(error));
                            break;

                        // ICloud Unlocking task
                        case "unlocking":
                            submitICloudUnlockTask(
                                responseData.payment_info,
                                taskDetails,
                                responseData.acc_txn
                            )
                                .then(data => resolve(data))
                                .catch(error => reject(error));
                            break;

                        default:
                            reject("error with task type");
                            break;
                    }
                } else {
                    reject("payment was not made");
                }
            })
            .catch(error => reject(error));
    });
};

// TODO send carrier unlock task to database
const submitCarrierUnlockTask = (paymentDetails, taskDetails, acc_txn) => {
    const carrierUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/carrier/`;

    return new Promise((resolve, reject) => {
        fetch(carrierUnlockTaskEndpoint, {
            method: "POST",
            // credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${acc_txn}`,
            },
            body: JSON.stringify({
                ...taskDetails,
                ...paymentDetails,
            }),
        })
            .then(async response => {
                if (response.ok) {
                    const data = await response.json();
                    resolve(data);
                } else if (response.status === 403 || response.status === 401) {
                    reject("unauthorized");
                } else {
                    reject("error creating task, but payment made - please contact admin");
                }
            })
            .catch(error => reject(error));
    });
};

// TODO send icloud unlock task to database
const submitICloudUnlockTask = (paymentDetails, taskDetails, acc_txn) => {
    const icloudUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/icloud/`;

    return new Promise((resolve, reject) => {
        fetch(icloudUnlockTaskEndpoint, {
            method: "POST",
            // credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${acc_txn}`,
            },
            body: JSON.stringify({
                ...taskDetails,
                ...paymentDetails,
            }),
        })
            .then(async response => {
                if (response.ok) {
                    const data = await response.json();
                    resolve(data);
                } else if (response.status === 403 || response.status === 401) {
                    reject("unauthorized");
                } else {
                    reject("error creating task, but payment made - please contact admin");
                }
            })
            .catch(error => reject(error));
    });
};

// TODO send imei checking task to database
const submitIMEICheckTask = (paymentDetails, taskDetails, acc_txn) => {
    const imeiCheckTaskEndpoint = `${baseBackendAPIURL}/tasks/imei/`;

    return new Promise((resolve, reject) => {
        fetch(imeiCheckTaskEndpoint, {
            method: "POST",
            // credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${acc_txn}`,
            },
            body: JSON.stringify({
                ...taskDetails,
                ...paymentDetails,
            }),
        })
            .then(async response => {
                if (response.ok) {
                    const data = await response.json();
                    resolve(data);
                } else if (response.status === 403 || response.status === 401) {
                    reject("unauthorized");
                } else {
                    reject("error creating task, but payment made - please contact admin");
                }
            })
            .catch(error => reject(error));
    });
};

// TODO Search task using tracking id
/* 
The tracking id entered by the user is sent to an API endpoint
If a task is returned, it is returned by the function in a Promise
*/
export const searchTaskByTracking = async trackingID => {
    const taskSearchEndpoint = `${baseBackendAPIURL}/tasks/search/?tracking_id=${trackingID}`;
    let taskSearchResults;

    return new Promise((resolve, reject) => {
        fetch(taskSearchEndpoint, {
            method: "GET",
            credentials: "include",
        })
            .then(async response => {
                if (response.ok) {
                    // if task was found then get details
                    taskSearchResults = await response.json();

                    // if task is not found
                } else if (response.status === 404) {
                    taskSearchResults = await response.json();
                }
            })
            .then(() => resolve(taskSearchResults));
    });
};

// TODO Get all tasks
export const getAllTasks = async () => {
    /* 
    fetches all tasks by calling their respective endpoints
    stores these in a list of objects which is returned in the allTasks variable
    */

    const imeiCheckTaskEndpoint = `${baseBackendAPIURL}/tasks/imei/`;
    const icloudUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/icloud/`;
    const carrierUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/carrier/`;

    let allTasks = [],
        apiRequests = [];

    // loop over each task endpoint
    [
        imeiCheckTaskEndpoint,
        icloudUnlockTaskEndpoint,
        carrierUnlockTaskEndpoint,
    ].forEach(taskEndpoint => {
        // assign the Fetch API definition to a variable
        // ! The Fetch API is a Promise and so returns a Promise too.
        const requestPromises = fetch(taskEndpoint, {
            credentials: "include",
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw "unauthorized";
            }
        });
        // push the Fetch API to the `apiRequests` array
        apiRequests.push(requestPromises);
    });

    /*
    ? return a Promise of a function that finally resolves into an Array of all the task objects `allTasks`
    ? The Promise concurrently makes the api requests via which the tasks are retrieved as arrays of tasks of the same type
    */
    return new Promise((resolve, reject) => {
        /* 
            This Promise.all concurrently makes the api requests to retrieve the tasks using the Fetch Promises that are in the `apiRequests` array
            and returns an array of the results (which are also arrays of task objects returned from each request) from the three api requests.
            Promise.all basically calls the Promises present in the array that is passed as an argument.
            In this case it makes requests to task endpoints which differ by type of task.
            Each of these endpoints returns an array of the tasks of a particular type.
            The returned arrays from each Fetch API request are also stored in an array to which Promise.all resolves - `taskTypes`
            The array of arrays is refreshed by passing it as an argument to the `then` function of the Promise.all() Promise.
            This array of arrays is looped over and the individual arrays are also looped to retrieve individual tasks.
            Now the individual tasks are pushed to the `allTasks` array which this `getAllTasks` function shall resolve to.
            Finally, the magic that makes the difference is another `then` which is called of the previous one. This one takes no arguments and
            resolves the Promise that is returned by the `getAllTasks` async function into the `allTasks` array. 
            Therefore the `allTasks` array where all the individual tasks are put asynchronously, 
            is returned in a promise by the `getAllTasks` function.
            To refresh it, a variable to hold it must be passed as an argument to a `then` function called of `getAllTasks` itself.  
        */
        Promise.all(apiRequests) // ? concurrently make requests to task endpoints stored in the array which is passed in as the argument

            //? loop through the returned array recursively to retrieve and push all individual tasks to the finally resolved array
            .then(taskTypes => {
                taskTypes.forEach(taskType => {
                    taskType.forEach(task => allTasks.push(task));
                });
            })

            // resolve Promise into array of all tasks
            .then(() => resolve(allTasks))
            .catch(error => {
                // console.log(error);
                reject(error);
            });
    });
};

// TODO update imei checking task
export const updateIMEICheckTask = async (trackingID, formData) => {
    const imeiCheckTaskEndpoint = `${baseBackendAPIURL}/tasks/imei/${trackingID}/`;

    let updatedTask;

    return new Promise((resolve, reject) => {
        fetch(imeiCheckTaskEndpoint, {
            method: "PUT",
            credentials: "include",
            body: formData,
        })
            .then(async response => {
                if (response.ok) {
                    updatedTask = await response.json(); // return task list
                } else if (response.status === 401) {
                    reject("unauthorized");
                }
            })
            .then(() => resolve(updatedTask));
    });
};

// TODO update icloud unlocking task
export const updateICloudUnlockTask = async (trackingID, formData) => {
    const ICloudUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/icloud/${trackingID}/`;

    let updatedTask;

    return new Promise((resolve, reject) => {
        fetch(ICloudUnlockTaskEndpoint, {
            method: "PUT",
            credentials: "include",
            body: formData,
        })
            .then(async response => {
                if (response.ok) {
                    updatedTask = await response.json(); // return task list
                } else if (response.status === 401) {
                    reject("unauthorized");
                }
            })
            .then(() => resolve(updatedTask));
    });
};

// TODO update carrier unlocking task
export const updateCarrierUnlockTask = async (trackingID, formData) => {
    const CarrierUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/carrier/${trackingID}/`;

    let updatedTask;

    return new Promise((resolve, reject) => {
        fetch(CarrierUnlockTaskEndpoint, {
            method: "PUT",
            credentials: "include",
            body: formData,
        })
            .then(async response => {
                if (response.ok) {
                    updatedTask = await response.json(); // return task list
                } else if (response.status === 401) {
                    reject("unauthorized");
                }
            })
            .then(() => resolve(updatedTask));
    });
};

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ USER DETAILS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const getAdminDetails = async userEmail => {
    const getAdminDetailsEndpoint = `${baseBackendAPIURL}/users/${userEmail}/`;

    return new Promise((resolve, reject) => {
        fetch(getAdminDetailsEndpoint, {
            credentials: "include",
        }).then(response => {
            if (response.ok) resolve(response.json());
            else if (response.status === 401) throw "unauthorized";
        });
    }).catch(error => reject(error));
};

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ AUTHENTICATION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const performLogin = async (email, password) => {
    const loginEndpoint = `${baseBackendAPIURL}/auth/token/`;

    return new Promise((resolve, reject) => {
        fetch(loginEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(async response => {
                if (response.ok) {
                    resolve(); // resolve the login response
                } else if (response.status === 401) {
                    reject("Invalid Login Credentials");
                } else {
                    reject(
                        `Internal Server Error<br>${response.status}: ${response.statusText}<br><br>Kindly contact developer team`
                    );
                }
            })
            .catch(error =>
                reject(
                    `Internal Server Error<br>${error}<br><br>Kindly contact developer team`
                )
            );
    });
};

export const refreshToken = async () => {
    const refreshTokenEndpoint = `${baseBackendAPIURL}/auth/token/refresh/`;

    return new Promise((resolve, reject) => {
        fetch(refreshTokenEndpoint, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                refresh: getCookie("mbt_ref_txn"),
            }),
        });
    });
};

export const performLogout = async () => {
    const logoutEndpoint = `${baseBackendAPIURL}/auth/logout/`;

    return new Promise((resolve, reject) => {
        fetch(logoutEndpoint, {
            credentials: "include",
            method: "GET",
        })
            .then(async response => {
                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            })
            .catch(error =>
                reject(
                    `Internal Server Error<br>${error}<br><br>Kindly contact developer team`
                )
            );
    });
};

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ AUTHENTICATION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const notifyAdminOfTaskViaSMS = async taskType => {
    const notifyAdminOfTaskViaSMSEndpoint = `${baseBackendAPIURL}/sms/admin/notify?task_type=${taskType}`;

    return new Promise((resolve, reject) => {
        fetch(notifyAdminOfTaskViaSMSEndpoint, {
            // credentials: include,
            method: "GET",
        })
            .then(async response => {
                if (response.ok) resolve();
                else reject();
            })
            .catch(error => {
                reject(`Could not send sms notification to admin via SMS`);
            });
    });
};
