import { elements } from "./views/base";
import { performLogin } from "./api";
import { popupAlert } from "./views/UICtrl";

document.querySelector(elements.dashboardLoginForm).addEventListener('submit', e => {
    e.preventDefault();

    // perform login and return authentication token after Promise resolution to be set in cookies then reset form
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    
    performLogin(email, password)
        .then(resp => {
            if (resp) {
                
                popupAlert('Login Success', 'success');
                e.target.reset();
            } else {
                popupAlert('Login Failed', 'error');
            }
        })

    // e.target.reset()
})