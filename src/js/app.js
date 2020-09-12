import * as UICtrl from './views/UICtrl';
import * as controller from './models/controller';
import { elements } from  './views/base';

//Onload page function that starts the svg magic 
document.onload = UICtrl.headerSVG();

//Onscroll function to trigger the background
document.addEventListener('scroll', controller.checkNav);