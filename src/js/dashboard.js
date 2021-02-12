import * as UICtrl from './views/UICtrl';
import * as controller from './models/controller';
import { elements } from './views/base';


// //**** Before Page Load Event listners ****//

// function to ensure authentication and then populate page
if (document.readyState === "loading") {
    // ensure authentication
    controller.ensureAuth()
        // if authenticated
        .then(auth => {
            if (auth.authenticated && auth.refreshPresent) {
                controller.populatePage();
            }
        })

        // if not authenticated
        .catch(auth => {
            // ? upon authentication failure 
            if (!auth.authenticated) {
                // if refresh token is present but exprired
                if (auth.refreshPresent) {
                    // hide loader
                    UICtrl.hideLoader();
                    // show modal and add its event listener
                    UICtrl.expireLogin(controller.parseJWT(controller.getCookie('mbt_ref_txn')).user_email);
                    document.querySelector(elements.authExpiryLoginForm).addEventListener('submit', controller.redoLoginAndPopulatePage)
                } else {
                    // if refresh token is not present at all
                    // redirect to login page
                    location.replace("login.html");
                }
                return
            }

        })

}


// //**** Modal Event listners ****//
// //Event listner to show the modal
// document.querySelectorAll(elements.taskItem).forEach(item => {
//     item.addEventListener('click', e => {
//         if(e.target.tagName === "LI") {
//             //converting the htmlcollections (li's) form the DOM into an array
//             const lists = [];
//             Array.prototype.slice.call(e.target.parentElement.children).forEach(li => {
//                 lists.push(li.innerHTML);
//             });

//             controller.modalList(lists);
//             // UICtrl.listUpdater(e.target.parentElement.parentElement);
//         };
//     });
// });

//Event listner to hide the modal 
document.querySelector(elements.modal).addEventListener('click', (e) => {
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


//**** Logout Event listners ****//

document.querySelector(elements.dashboardLogoutBtn).addEventListener('click', controller.logout);
