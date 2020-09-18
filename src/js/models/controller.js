import * as UICtrl from '../views/UICtrl';

export const checkNav = () => {
    window.pageYOffset >= 50 ?
        UICtrl.changeNavWhite() :
        UICtrl.changeNavTrans();
};

export const tabSel = tab => {
//TODO:
    //remove all active tabs
    UICtrl.removeActiveTab();
    //set the active class to that tab
    UICtrl.setActiveTab(tab);
    //let that current tab appear in the middle
    //check for hash change event
    window.addEventListener('hashchange', e => {
        UICtrl.changeForm(location.hash)
    });
}