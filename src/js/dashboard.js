import * as UICtrl from './views/UICtrl';
import * as controller from './models/controller';
import { elements } from './views/base';


// //**** Before Page Load Event listners ****//

// function to ensure authentication and then populate page
if (document.readyState === "loading") {
    // ensure authentication
    controller.ensureAuth()
        .then(auth => {
            // upon authentication failure 
            if (!auth.authenticated) {
                // if refresh token is present but exprired
                if (auth.refreshPresent){
                    // show modal
                    alert('show modal');
                    // then populate page
                    // controller.populatePage();
                } else {
                    // if refresh token is not present at all
                    // redirect to login page
                    location.replace("login.html");
                }
                return
            }
            // if authenticated, 
            // ! remove loader
            // !!!!!!!!!!!!!!!
            // populate page
            controller.populatePage();

        })
}

// // document.addEventListener("DOMContentLoaded", controller.checkAuth());


//**** On Page Load Event listners ****//

// this function builds the task list and fills in the admin details
document.addEventListener('DOMContentLoaded', e => {

})


//**** Modal Event listners ****//

document.querySelector(elements.modal).addEventListener('click', (e) => {
    //Event listner to hide the modal 
    if (e.target.classList.contains('modal-show')) {
        UICtrl.hideModal();
    } else if (e.target.closest(elements.modalClose)) {
        UICtrl.hideModal();
    } else if (e.target.closest(elements.modalCopy)) {
        //Event listner to copy some text

        //parsing the span element to be copied by the function
        controller.copyText(e.target.closest(elements.modalCopy).previousElementSibling);
    };
});


//**** Sorting Event listners ****//

document.querySelectorAll(elements.taskTab).forEach(tab => {
    tab.addEventListener('click', () => {
        controller.filterList(tab);
    });
});

