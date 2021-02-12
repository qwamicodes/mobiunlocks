import { elements } from "./views/base";
import { performLogin } from "./api";
import { hideLoader, popupAlert, showLoader } from "./views/UICtrl";

document
    .querySelector(elements.dashboardLoginForm)
    .addEventListener("submit", e => {
        e.preventDefault();
        showLoader();
        // perform login and return authentication token after Promise resolution to be set in cookies then reset form
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        performLogin(email, password)
            .then(() => {
                // notify admin of login success via popup alert
                popupAlert("Login Success", "success", 10000);

                // reset form
                e.target.reset();

                //hide loader
                hideLoader();

                // delay page redirect to admin page
                setTimeout(() => {
                    // redirect to admin page
                    location.href = "./dashboard.html";
                }, 2000);
            })
            .catch(error => {
                hideLoader();
                popupAlert(error, "error", 10000);
            });
    });
