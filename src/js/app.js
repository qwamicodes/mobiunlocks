import * as UICtrl from "./views/UICtrl";
import * as controller from "./models/controller";
import { elements } from "./views/base";

//**** ON page load Event listners ****/

//Onload page function that starts the svg magic
document.onload = UICtrl.headerSVG();
document.onload = controller.checkNav();
document.onload = controller.tabSel(null, location.hash);
document.onload = controller.checkInput(
    document.querySelector("#carrier-iphone")
);

//**** On scroll Event listners ****/

//Onscroll function to trigger the background
document.addEventListener("scroll", controller.checkNav);

//**** Tabs Event listners ****/

//Event listner for the tabs
document.querySelectorAll(elements.tab).forEach(tab => {
    tab.addEventListener("click", () => {
        controller.tabSel(tab);
    });
});

//**** Payment modal Event listners ****/

//Event listner to terminate the payment process
document.querySelector(elements.cancelPayment).addEventListener("click", () => {
    controller.hidePay();
});

//**** Form Event listners ****/

//Event listner for the changes that happens on the carrier form
["change", "keyup"].forEach(env => {
    document.querySelector(elements.carrierForm).addEventListener(env, e => {
        const form = document.querySelector(elements.carrierForm);
        const checkPhone = form["car-phone"];
        const carImei = form["carrier-imei"];
        const btn = form.elements[`${form.elements.length - 1}`];

        if (
            checkPhone.value === "on" &&
            carImei.value.length >= 15 &&
            form.checkValidity()
        ) {
            controller.enableField(btn);
        } else {
            controller.disableField(btn);
        }
        if (carImei.value.length > 20) {
            UICtrl.popupAlert("IMEI/SN must not exceed 20 digits", "warning");
            controller.disableField(btn);
        }
    });
});

//Event listner for the changes that happens on the imei form
["change", "keyup"].forEach(env => {
    document.querySelector(elements.imeiForm).addEventListener(env, e => {
        const form = document.querySelector(elements.imeiForm);
        const carImei = form["imei-imei"];
        const btn = form.elements[`${form.elements.length - 1}`];

        if (carImei.value.length >= 15 && form.checkValidity()) {
            controller.enableField(btn);
        } else {
            controller.disableField(btn);
        }
        if (carImei.value.length > 20) {
            UICtrl.popupAlert("IMEI/SN must not exceed 20 digits", "warning");
            controller.disableField(btn);
        }
    });
});

//Event listner for the changes that happens on the unlock form
["change", "keyup"].forEach(env => {
    document.querySelector(elements.unlockingForm).addEventListener(env, e => {
        const form = document.querySelector(elements.unlockingForm);
        const checkPhone = form["unlock-phone"];
        const carImei = form["unlocking-imei"];
        const btn = form.elements[`${form.elements.length - 1}`];

        if (form.elements[0].checked) {
            document.querySelectorAll(elements.ipadUnlock).forEach(el => {
                el.style.display = "none";
            });
            document.querySelectorAll(elements.iphoneUnlock).forEach(el => {
                el.style.display = "block";
            });
        } else if (form.elements[1].checked) {
            document.querySelectorAll(elements.iphoneUnlock).forEach(el => {
                el.style.display = "none";
            });
            document.querySelectorAll(elements.ipadUnlock).forEach(el => {
                el.style.display = "block";
            });
        }

        if (
            checkPhone.value === "on" &&
            carImei.value.length >= 15 &&
            form.checkValidity()
        ) {
            controller.enableField(btn);
        } else {
            controller.disableField(btn);
        }
        if (carImei.value.length > 20) {
            UICtrl.popupAlert("IMEI/SN must not exceed 20 digits", "warning");
            controller.disableField(btn);
        }
    });
});

//Functionalites for the submit on all the services forms
[elements.carrierForm, elements.imeiForm, elements.unlockingForm].forEach(
    el => {
        document.querySelector(el).addEventListener("submit", e => {
            e.preventDefault();

            //grabing the values form the form
            switch (e.target.id) {
                case "form-carrier":
                    const phoneModel = e.target["carrier-model"].value;
                    const modelName =
                        e.target["carrier-model"][
                            e.target["carrier-model"].selectedIndex
                        ].innerText;
                    const carNetwork = e.target["carrier-network"].value;
                    const carImei = e.target["carrier-imei"].value;

                    //parsing the values into the a class that take care of the price and showing to UI
                    new controller.Pay(
                        "carrier",
                        phoneModel,
                        modelName,
                        carNetwork,
                        carImei
                    )
                        .calcPrice()
                        .updateState()
                        .insertPay()
                        .storeTaskDetails();

                    break;
                case "form-imei":
                    const imeiNetwork = e.target["imei-network"].value;
                    const imeiImei = e.target["imei-imei"].value;

                    //parsing the values into the a class that take care of the price and showing to UI
                    new controller.Pay(
                        "imei",
                        null,
                        null,
                        imeiNetwork,
                        imeiImei
                    )
                        .calcPrice()
                        .updateState()
                        .insertPay()
                        .storeTaskDetails();

                    break;
                case "form-unlocking":
                    const unlockingModel = e.target["unlocking-model"].value;
                    const modName =
                        e.target["unlocking-model"][
                            e.target["unlocking-model"].selectedIndex
                        ].innerText;
                    const unlockingImei = e.target["unlocking-imei"].value;

                    //parsing the values into the a class that take care of the price and showing to UI
                    new controller.Pay(
                        "unlocking",
                        unlockingModel,
                        modName,
                        null,
                        unlockingImei
                    )
                        .calcPrice()
                        .updateState()
                        .insertPay()
                        .storeTaskDetails();

                    break;
            }

            //function to show the payment section
            controller.showPay();

            //funtion to erase the form data
            e.target.reset();
        });
    }
);

//Event listner for the payment submit form
document.querySelector(elements.paymentForm).addEventListener("submit", e => {
    e.preventDefault();

    //getting the details the form
    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const amount = controller.Data.price;

    // parse it to the payment starter function to make payment
    controller.preparePayment(fullname, email, amount);
    //reseting the form
    e.target.reset();
});

//Event handler for the mobile nav aside to collapse
document.querySelector(elements.navAside).addEventListener("click", e => {
    if (e.target.tagName === "LI" || e.target.tagName === "A") {
        controller.mobileNav();
    }
});

//Event listner to hide the modal
document.querySelector(elements.modal).addEventListener("click", e => {
    // // if (e.target.classList.contains('modal-show')) {
    // //     UICtrl.hideModal();
    // // } else
    if (e.target.closest(elements.modalClose)) {
        UICtrl.hideModal();
    }
});
