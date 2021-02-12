import * as UICtrl from "./views/UICtrl";
import * as controller from "./models/controller";
import { elements } from "./views/base";
import { searchTaskByTracking } from "./api";

//Event listner for the tracking search form
document.querySelector(elements.trackingForm).addEventListener("submit", e => {
    e.preventDefault();

    // show loader
    UICtrl.showLoader();

    const formData = new FormData(e.target);
    let trackingID = formData.get("tracking-id");

    trackingID = Math.floor(trackingID);

    // validate input before search
    if (String(trackingID).length !== 10) {
        UICtrl.popupAlert("Check Tracking ID, should be 10 digits", "error");
        UICtrl.hideLoader();
        return;
    }

    // if validation pass, then search
    searchTaskByTracking(trackingID)
        .then(taskSearchResults => {
            // hide loader
            UICtrl.hideLoader();
            // if a task with matching tracking ID is found
            if (taskSearchResults["task_found"]) {
                UICtrl.showModal(taskSearchResults["task_detail"], "tracking");
            } else {
                // if there is no task matching with the tracking ID
                UICtrl.showModal(taskSearchResults["task_detail"], "tracking");
            }
        })
        .catch(error => {
            UICtrl.popupAlert(error, "error");
            UICtrl.hideLoader();
        });

    //please dont forget to reset after submission
    e.target.reset();
});

document.querySelector(elements.modal).addEventListener("click", e => {
    //Event listner to hide the modal
    // // if (e.target.classList.contains('modal-show')) {
    // //     UICtrl.hideModal();
    // // } else
    if (e.target.closest(elements.modalClose)) {
        UICtrl.hideModal();
    }
});
