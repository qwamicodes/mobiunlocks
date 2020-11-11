import { elements } from "./views/base";
// import { performLogin } from "./api";

document.querySelector(elements.dashboardLoginForm).addEventListener('submit', e => {
    e.preventDefault();
    // perform login and return authentication token after Promise resolution to be set in cookies then reset form
    // performLogin()
    e.target.reset()
})