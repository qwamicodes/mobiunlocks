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

export const setActiveTab = (el, name) => {
  el.classList.add(`${name}-active`);
};

export const removeActiveTab = el => {
  document.querySelectorAll(`.${el}`).forEach(tab => {
    tab.classList.remove(`${el}-active`);
  })
};

export const unselAllElement = el => {
  document.querySelectorAll(`.${el}`).forEach(tab => {
    tab.setAttribute('aria-sel', 'false');
  });
};

export const selElement = el => {
  el.setAttribute('aria-sel', 'true');
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
};

export const popupAlert = (message, type) => {
  const checkSVG = type => {
    if(type === 'success') {
      const svg = `<ion-icon name="checkmark-outline" size="small"></ion-icon>`;
      return svg;
    } else if(type === 'warning') {
      const svg = `<ion-icon name="alert-outline" size="small"></ion-icon>`;
      return svg;
    } else if(type === 'error') {
      const svg = `<ion-icon name="close-outline" size="small"></ion-icon>`;
      return svg;
    } else {
      const svg = `<ion-icon name="information-outline" size="small"></ion-icon>`;
      return svg;
    };
  }
  const svg = checkSVG(type);

  let html = `
    <div class="alert alert-${type}">
      <div class="alert__top">
        ${svg}
        <span>${type}</span>
      </div>
      <div class="alert__bottom">${message}</div>
    </div>
  `;

  document.querySelector('#main').insertAdjacentHTML('beforeend', html);
  setTimeout(() => {
    removePopup();
  }, 3000);
};

const removePopup = () => {
  document.querySelector('.alert').remove();
}