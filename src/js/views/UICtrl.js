import { elements } from './base';
import * as controller from '../models/controller';

//Functionality for the header svg 
export const headerSVG = () => {
    const colors = ["#ff9a00", "#3c435a", "#5aabe9"];
    // Select the SVG paths
    let blobs = document.querySelectorAll(elements.svgPath);

    blobs.forEach((blob) => {
      blob.style.fill = colors[Math.floor(Math.random() * colors.length)];
    });
    // Randomly apply colors to the SVG fill property
    setInterval(() => {
      blobs.forEach((blob) => {
        blob.style.fill = colors[Math.floor(Math.random() * colors.length)];
      });
    }, 3990);
};

export const changeNavWhite = () => {
  document.querySelector(elements.nav).classList.add('nav__scrolled');
};

export const changeNavTrans = () => {
  document.querySelector(elements.nav).classList.remove('nav__scrolled');
};

export const setActiveTab = tab => {
  tab.classList.add('tab-active');
};

export const removeActiveTab = () => {
  document.querySelectorAll(elements.tab).forEach(tab => {
    tab.classList.remove('tab-active');
  })
};


export const changeForm = loc => {
  switch (loc) {
    case '#/carrier':
        document.querySelector(elements.formHolder).style.setProperty('transform', 'translateX(0)')
      break;
    case '#/imei':
        document.querySelector(elements.formHolder).style.setProperty('transform', 'translateX(-33.33%)')
      break;
    case '#/unlocking':
        document.querySelector(elements.formHolder).style.setProperty('transform', 'translateX(-66.66%)')
      break;
  }
}