import * as UICtrl from '../views/UICtrl';
import { elements } from '../views/base';
import { Payment } from './payment';
import * as api from "../api";


// this object stores payment data and task details for a task which a user has requested  
export const Data = {
    invoices: [],
    taskDetail: {},
}

// function to get cookie by name
export const getCookie = cookieName => {
    var match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (match) return match[2];
}

// parse a JWT to get payload as object
export const parseJWT = token => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}

//funtion to run when to check if the page height is reach the limit 
export const checkNav = () => {
    window.pageYOffset >= 50 ?
        UICtrl.changeNavWhite() :
        UICtrl.changeNavTrans();
};

//function to enable the input when page loads
export const checkInput = input => {
    input.checked = true;
};

//funtion to the selection of the tabs 
export const tabSel = (tab, hash = null) => {
    //TODO:
    //check if hash exists and use the controller
    if (hash && hash.includes("#/")) {
        //remove all active tabs
        UICtrl.removeActiveTab('tab');
        const tabs = document.querySelectorAll(elements.tab);
        switch (hash) {
            case '#/carrier':
                tabs.forEach(tab => {
                    if (tab.getAttribute('href') === hash) {
                        //set the active class to that tab
                        UICtrl.setActiveTab(tab, 'tab');
                        //change the form
                        UICtrl.changeForm(hash);
                    }
                });
                break;
            case '#/imei':
                tabs.forEach(tab => {
                    if (tab.getAttribute('href') === hash) {
                        //set the active class to that tab
                        UICtrl.setActiveTab(tab, 'tab');
                        //change the form
                        UICtrl.changeForm(hash);
                    }
                });
                break;
            case '#/unlocking':
                tabs.forEach(tab => {
                    if (tab.getAttribute('href') === hash) {
                        //set the active class to that tab
                        UICtrl.setActiveTab(tab, 'tab');
                        //change the form
                        UICtrl.changeForm(hash);
                    }
                });
                break;
        };
    } else if (hash === null) {
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
    calcPrice() {
        switch (this.type) {
            case 'carrier':
                if (this.network === 'at&t' || this.network === 'verizon') {
                    if (this.model >= 101 && this.model <= 109) {
                        this.price = (170).toFixed(2);
                    } else if (this.model >= 110 && this.model <= 113) {
                        this.price = (270).toFixed(2);
                    } else if (this.model >= 114 && this.model <= 118) {
                        this.price = (370).toFixed(2);
                    } else if (this.model >= 119 && this.model <= 122) {
                        this.price = (470).toFixed(2);
                    };
                } else if (this.network === 'sprint') {
                    if (this.model >= 101 && this.model <= 109) {
                        this.price = (250).toFixed(2);
                    } else if (this.model >= 110 && this.model <= 113) {
                        this.price = (350).toFixed(2);
                    } else if (this.model >= 114 && this.model <= 118) {
                        this.price = (450).toFixed(2);
                    } else if (this.model >= 119 && this.model <= 122) {
                        this.price = (550).toFixed(2);
                    };
                } else if (this.network === 'tmobile') {
                } else if (this.network === 'o2' || this.network === 'tesco') {
                    if (this.model >= 101 && this.model <= 109) {
                        this.price = (170).toFixed(2);
                    } else if (this.model >= 110 && this.model <= 113) {
                        this.price = (270).toFixed(2);
                    } else if (this.model >= 114 && this.model <= 118) {
                        this.price = (370).toFixed(2);
                    } else if (this.model >= 119 && this.model <= 122) {
                        this.price = (470).toFixed(2);
                    };
                } else if (this.network === 'metropcs') {
                    if (this.model >= 101 && this.model <= 113) {
                        this.price = (700).toFixed(2);
                    } else if (this.model >= 114 && this.model <= 122) {
                        this.price = (1000).toFixed(2);
                    };
                };
                break;
            case 'imei':
                this.price = (25).toFixed(2);
                break;
            case 'unlocking':
                if (this.model >= 106 && this.model <= 115) {
                    this.price = (800).toFixed(2);
                } else if (this.model >= 116 && this.model <= 122) {
                    this.price = (1200).toFixed(2);
                };
                break;
        };

        return this;
    };

    //Method that takes care of the inserting the price after been calc
    insertPay() {
        if (this.type === 'carrier') {
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
        } else if (this.type === 'imei') {
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
        } else if (this.type === 'unlocking') {
            if (this.model >= 123) {
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
                        <span class="payment__items--main">model</span>
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

        return this;
    };

    // TODO Method that stores the task details to the Data object
    storeTaskDetails() {
        Data.taskDetail = {}; // ? reset task details

        // ? insert task details
        Data.taskDetail.taskType = this.type; // task type - carrier, imei, unlocking (ICloud)
        Data.taskDetail.imei = this.imei; // imei number
        Data.taskDetail.price = this.price; // price
        Data.taskDetail.phone_model = this.modelName; // device model, 11, 11 PRO, SE, etc.

        // * setting device type
        if (this.model >= 101 && this.model <= 122) {
            Data.taskDetail.device_type = "iphone";
        } else if (this.model >= 123 && this.model <= 134) {
            Data.taskDetail.device_type = "ipad";
        }

        // * setting carrier network / imei checking details
        if (this.type == "imei") {
            let details = this.network.split('|');
            Data.taskDetail.details = details; // checking details
        } else {
            Data.taskDetail.phone_carrier_network = this.network; // carrier network
        }


    };
};

//function that passes the information neccessary for triggering the paystack payment 
export const preparePayment = (fullname, email, amount) => {
    let firstName, lastName;

    //function to split the fullname into first and last name
    const split = name => {
        const splited = name.split(' ');
        if (splited.length <= 2) {
            firstName = splited[0];

            if (splited[1]) {
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

    // ? parsing the details into the payment class
    // ! LIVE PAYMENT
    // // create Payment Object
    // new Payment(email, amount, firstName, lastName)
    //     // store payment details in invoice
    //     .storeInv()
    //     // make payment
    //     .makePayment();
    // ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // ! TESTING WITHOUT PAYMENTS
    // Create Payment Object store payment details in invoice 
    new Payment(email, amount, firstName, lastName).storeInv();

    // show loader
    UICtrl.showLoader();

    const paystackReference = prompt("Please enter your payment reference from Paystack");

    // store task details without payment 
    api.mockconfirmPayAndStoreDetails(paystackReference, Data.taskDetail)
        .then(taskDetails => {
            // hide loader
            UICtrl.hideLoader();
            // notify of payment success
            UICtrl.popupAlert(`Payment completed! Your payment invoice/reference ID: ${paystackReference}`, 'success', 10000);
            // show modal containing further instructions (TRACKING ID, etc.)
            UICtrl.showModal(taskDetails, 'home');
            console.log(taskDetails);
        })
        .catch(error => UICtrl.popupAlert(error, 'error'))
    // ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
    UICtrl.popupAlert('Text copied successfully', 'success');
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
    if (tab.getAttribute('data-value') === 'all') {
        addList();
    } else {
        // filtering the list using from the status
        const lists = items.filter(item => item.lastElementChild.getAttribute('data-type') !== tab.getAttribute('data-value'));
        UICtrl.removeList(lists);
    };
};

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DASHBOARD ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const populatePage = () => {
    // TODO Listing the Tasks 
    listTasksOnDashboard();

    // TODO Setting admin details
    setAdminDetailsOnDashboard();

    UICtrl.hideLoader();

}

// function to set admin details on dashboard
export const setAdminDetailsOnDashboard = () => {
    // get refresh token from cookie
    const ref_txn = getCookie('mbt_ref_txn');

    // get user email claim from parsed refresh JWT
    const authUserEmail = parseJWT(ref_txn).user_email;

    // make API call to get admin details and set them on dashboard
    api.getAdminDetails(authUserEmail)
        .then(adminDetails => {
            document.querySelector(elements.adminUsername).innerText = adminDetails.username;
            document.querySelector(elements.adminAvatarImage).src = adminDetails.user_avatar;
        })
        .catch(error => {
            if (error === "unauthorized") api.refreshToken().then(setAdminDetailsOnDashboard());
            else {
                UICtrl.popupAlert(error, 'error')
            }
        })
}

// function to list all tasks on dashboard
export const listTasksOnDashboard = async () => {

    // HTML <ul> Element for holding individual <li> elements for each task 
    let allTasksListElement = document.querySelector(elements.allTasksListElement);

    // clear task list 
    allTasksListElement.innerHTML = "";

    // ? get AllTasks
    await api.getAllTasks()
        .then(tasks => {
            allTasksListElement.innerHTML = "";
            // TODO listing tasks in dashboard
            // loop over each element
            tasks.forEach(task => {
                // creating individual HTML elements for each task, populating it with data from the database
                let singleTask = document.createElement("li");
                singleTask.id = `task_${task.tracking_id}`
                singleTask.classList.add("dashboard__tasks--value-li");
                singleTask.innerHTML =
                    `
            <ul class="dashboard__tasks--item">
                <li data-task_property="tracking_id">#${task.tracking_id}</li>
                <li data-task_property="task_type">${task.task_type}</li>
                <li data-task_property="phone_model">${task.phone_model ? task.phone_model : "---"}</li>
                <li data-task_property="imei">${task.imei}</li>
                <li data-task_property="carrier">${task.phone_carrier_network ? task.phone_carrier_network : task.details ? task.details : "---"}</li>
                <li data-task_property="status" data-type="${task.completed ? "completed" : "pending"}">
                    ${task.completed ? "Completed" : "Pending"}
                </li>
            </ul>
            `;

                // add single task element to all tasks list element
                allTasksListElement.appendChild(singleTask);

                // ! adding the eventlistener to show the modal
                //converting the htmlcollections (li's) form the DOM into an array
                Array.prototype.slice.call(singleTask.getElementsByTagName("li")).forEach(item => {
                    item.addEventListener('click', e => {
                        // create modal out of task object
                        UICtrl.showModal(task, 'dashboard');

                        // add event listener to submit modal form
                        document.querySelector(elements.taskDetailModalForm).addEventListener('submit', updateTaskDetails);

                    });
                });

            })

            // TODO Task count
            document.querySelector(elements.allTasksCount).innerHTML = tasks.length; // all tasks
            document.querySelector(elements.pendingTasksCount).innerHTML = countPendingTasks(tasks); // pending tasks
            document.querySelector(elements.completedTasksCount).innerHTML = countCompletedTasks(tasks); // completed tasks

        })
        .catch(error => {
            console.log(error);
            if (error === "unauthorized") api.refreshToken().then(listTasksOnDashboard());
            else {
                UICtrl.popupAlert(`Internal Server Error<br>${error}<br><br>Kindly contact developer team`, 'error')
            }
        })
}

// function to count pending tasks
const countPendingTasks = tasksList => {
    let counter = 0;
    tasksList.forEach(task => {
        if (!task.completed) {
            counter += 1;
        }
    })
    return counter;
}

// function to count completed tasks
const countCompletedTasks = tasksList => {
    let counter = 0;
    tasksList.forEach(task => {
        if (task.completed) {
            counter += 1;
        }
    })
    return counter;
}

// event handler for sending dashboard-updated task details to DB 
export const updateTaskDetails = async e => {
    e.preventDefault();

    // get tracking id and remove the prepended hash symbol
    const trackingID = e.target.querySelector('span[data-task_property="tracking_id"]').innerText.slice(1);
    const imei = e.target.querySelector('span[data-task_property="imei"]').innerText;
    const completed = e.target.elements.status.value === "completed" ? true : false;
    const taskType = e.target.querySelector('span[data-task_property="task_type"]').innerText.toLowerCase();
    const results = e.target.elements.results.value

    // append details to FormData
    let formData = new FormData();
    formData.append('completed', completed);
    formData.append('imei', imei);
    formData.append('results', results);

    // task status after edit
    const taskStatus = e.target.elements.status.value;
    // HTML element for the tab that corresponds with the task status
    const correspondingTabElement = document.querySelector(`${elements.taskTab}[data-value="${taskStatus}"]`);


    switch (taskType) {
        case "icloud unlocking":
            api.updateICloudUnlockTask(trackingID, formData)
                .then(async () => {
                    // hide modal and repopulate page
                    UICtrl.hideModal();
                    await listTasksOnDashboard();
                    // switch tabs
                    filterList(correspondingTabElement);
                    // HTML element for the task 
                    const taskHTMLElement = document.getElementById(`task_${trackingID}`);
                    // scroll element into view
                    taskHTMLElement.scrollIntoView(true);
                    // highlight updated task
                    UICtrl.highlightUpdatedTask(taskHTMLElement, taskStatus);
                })
                .catch(error => {
                    console.log(error);
                    if (error === "unauthorized") api.refreshToken().then(updateTaskDetails(e));
                    else {
                        UICtrl.popupAlert(error, 'error')
                    }
                })
            break;

        case "carrier unlocking":
            api.updateCarrierUnlockTask(trackingID, formData)
                .then(async () => {
                    // hide modal and repopulate page
                    UICtrl.hideModal();
                    await listTasksOnDashboard();
                    // switch tabs
                    filterList(correspondingTabElement);
                    // HTML element for the task 
                    const taskHTMLElement = document.getElementById(`task_${trackingID}`);
                    // scroll element into view
                    taskHTMLElement.scrollIntoView(true);
                    // highlight updated task
                    UICtrl.highlightUpdatedTask(taskHTMLElement, taskStatus);
                })
                .catch(error => {
                    console.log(error);
                    if (error === "unauthorized") api.refreshToken().then(updateTaskDetails(e));
                    else {
                        UICtrl.popupAlert(error, 'error')
                    }
                })
            break;

        case "imei checking":
            api.updateIMEICheckTask(trackingID, formData)
                .then(async () => {
                    // hide modal and repopulate page
                    UICtrl.hideModal();
                    await listTasksOnDashboard();
                    // switch tabs
                    filterList(correspondingTabElement);
                    // HTML element for the task 
                    const taskHTMLElement = document.getElementById(`task_${trackingID}`);
                    // scroll element into view
                    taskHTMLElement.scrollIntoView(true);
                    // highlight updated task
                    UICtrl.highlightUpdatedTask(taskHTMLElement, taskStatus);
                })
                .catch(error => {
                    console.log(error);
                    if (error === "unauthorized") api.refreshToken().then(updateTaskDetails(e));
                    else {
                        UICtrl.popupAlert(error, 'error')
                    }
                })
            break;
    }

}

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END DASHBOARD ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//function to 
export const mobileNav = () => {
    setTimeout(() => {
        UICtrl.collapseNav();
    }, 250);
}

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ AUTHENTICATION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// function to ensure that the user is authenticated 
export const ensureAuth = () => {
    /* 
    this function is used to check if authentication is done before
    accessing the dashboard page. If the user has been authenticated successfully
    then the loading proceeds. Else, the user is redirected to the login page.
    Authentication check is performed by first checking existence of refresh token
    Then if it exists check if it is valid
    */
    let authenticated = true;
    let refreshPresent = true;

    return new Promise((resolve, reject) => {
        // if no refresh token exists in cookies
        if (!getCookie('mbt_ref_txn')) {
            console.log("NO AUTH - refresh token not found");
            authenticated = false;
            refreshPresent = false;
            reject({ "authenticated": authenticated, "refreshPresent": refreshPresent });
            return
        }

        // check validity of refresh token if it exists in cookies
        const refreshToken = getCookie('mbt_ref_txn');
        const tokenExpiryDate = parseJWT(refreshToken).exp;
        if (Date.now() >= tokenExpiryDate * 1000) {
            console.log("NO AUTH - refresh token expired");

            authenticated = false;
            refreshPresent = true;
            reject({ "authenticated": authenticated, "refreshPresent": refreshPresent });
            return
        }

        // user is authenticated at this point 
        resolve({ "authenticated": authenticated, "refreshPresent": refreshPresent })
    })

}

// function to redo login after token expiry
export const redoLoginAndPopulatePage = e => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    api.performLogin(email, password)
        .then(() => {
            // notify admin of authentication success via popup alert
            UICtrl.popupAlert('Authentication Success', 'success');

            // reset form
            e.target.reset();
            // hide modal
            UICtrl.hideExpireLoginModal();
            // populate page
            populatePage();

        })
        .catch(error => UICtrl.popupAlert(error, 'error', 10000))

    UICtrl.hideLoader();
}

// logout function
export const logout = e => {
    UICtrl.showLoader();

    api.performLogout()
        .then(() => {
            UICtrl.hideLoader();
            // redirect to login page
            location.href = './login.html'
        })
        .catch(error => UICtrl.popupAlert(error))
}

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END AUTHENTICATION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
