import { elements } from "./views/base";
import { performLogin } from "./api";
import { popupAlert } from "./views/UICtrl";


document.querySelector(elements.dashboardLoginForm).addEventListener('submit', e => {
    e.preventDefault();

    // perform login and return authentication token after Promise resolution to be set in cookies then reset form
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    performLogin(email, password)
        .then((refreshToken) => {
            // notify admin of login success via popup alert
            document.cookie = `mbt_ref_txn=${refreshToken}; path=/`;
            popupAlert('Login Success', 'success', 10000);

            // reset form
            e.target.reset();

            // delay page redirect to admin page
            setTimeout(() => {
                // redirect to admin page
                location.href = "./dashboard.html";
            }, 2000)
        })
        .catch(error => popupAlert(error, 'error', 10000))

})