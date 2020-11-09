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

export const removeActiveTab = (name) => {
  document.querySelectorAll(`.${name}`).forEach(tab => {
    tab.classList.remove(`${name}-active`);
  });
};

export const unselAllElement = el => {
  document.querySelectorAll(`.${el}`).forEach(tab => {
    tab.setAttribute('aria-sel', 'false');
  });
};

export const selElement = el => {
  el.setAttribute('aria-sel', 'true');
};

//function to change the form elements in the services part
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

//function to popup the alert to thre user
export const popupAlert = (message, type) => {
  const checkSVG = type => {
    if (type === 'success') {
      const svg = `<ion-icon name="checkmark-outline" size="small"></ion-icon>`;
      return svg;
    } else if (type === 'warning') {
      const svg = `<ion-icon name="alert-outline" size="small"></ion-icon>`;
      return svg;
    } else if (type === 'error') {
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

//function template for the task addition
export const addTask = (id, type, modelName, imei, carrier, status = 'pending') => {
  let html = `
      <li class="dashboard__tasks--value-li">
        <ul class="dashboard__tasks--item">
          <li>${id}</li>
          <li>${type}</li>
          <li>${modelName}</li>
          <li>${imei}</li>
          <li>${carrier}</li>
          <li data-type="${status}">${status}</li>
        </ul>
      </li>
  `;

  document.querySelector(elements.taskList).insertAdjacentHTML('afterend', html);
};

//function template for the modal popup
export const showModal = (task, page = 'dashboard') => {
  document.querySelector(elements.modal).classList.add('modal-show');

  // TODO display search results modal for tracking page
  if (page === 'tracking') {
    // ? if task with mathcing tracking ID is not found in the DB
    if (!task.task_type) {

      let html = `
            <div class="modal">
              <div class="modal__preview">
              <div class="modal-svg modal-close">
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/>
              </svg>
            </div>
              <ul>
                  <li>
                    <div class="modal__preview--info">Task with <span>TRACKING ID #${task.tracking_id}</span> was not found.<br>If you believe that this might be an error kindly contact the admin on <a href="tel:+233203804551">+233 20 380 4551</a></div>
                  </li>
                </ul>
            </div> 
          </div>
        `;
      document.querySelector(elements.modal).innerHTML = html;
    }

    // ? if result is for IMEI Checking task
    else if (task.task_type === 'IMEI Checking') {
      let html = `
          <div class="modal">
            <div class="modal__preview">
            <div class="modal-svg modal-close">
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/>
            </svg>
          </div>
            <ul>
                <li>
                    <div class="modal__preview--info">
                          Tracking ID:<br> <span>${task.tracking_id}</span> <br>
                          Customer:<br> <span>${task.customer_name} - ${task.customer_email}</span> <br>
                          Service Type:<br> <span>${task.task_type}</span> <br>
                          Request Date:<br> <span>${task.request_date}</span> <br>
                          Checking Details:<br> <span>${task.details}</span> <br>
                          Status:<br> <span data-type="${task.completed ? "completed" : "pending"}">${task.completed ? "completed" : "pending"}</span>
                    </div>
                </li>
                <li>
                    Results:
                    <div class="modal__preview--details">
                      ${task.results ? task.results : "awaiting results..."}
                    </div>
                </li>
              </ul>
          </div> 
        </div>
      `;

      document.querySelector(elements.modal).innerHTML = html;
    }

    // ? if result is for ICloud Unlocking task
    else if (task.task_type === 'ICloud Unlocking') {
    let html = `
      <div class="modal">
       <div class="modal__preview">
        <div class="modal-svg modal-close">
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/>
          </svg>
        </div>
        <ul>
          <li>
              <div class="modal__preview--info">
                    Tracking ID:<br> <span>${task.tracking_id}</span> <br>
                    Customer:<br> <span>${task.customer_name} - ${task.customer_email}</span> <br>
                    Service Type:<br> <span>${task.task_type}</span> <br>
                    Request Date:<br> <span>${task.request_date}</span> <br>
                    Phone Model:<br> <span>${task.phone_model}</span> <br>
                    Status:<br> <span data-type="${task.completed ? "completed" : "pending"}">${task.completed ? "completed" : "pending"}</span>
              </div>
          </li>
        </ul>
        </div> 
      </div>
      `;

      document.querySelector(elements.modal).innerHTML = html;
    }

    // ? if result is for Carrier Unlocking task
    else if (task.task_type === 'Carrier Unlocking') {
    let html = `
      <div class="modal">
       <div class="modal__preview">
        <div class="modal-svg modal-close">
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/>
          </svg>
        </div>
        <ul>
          <li>
              <div class="modal__preview--info">
                    Tracking ID:<br> <span>${task.tracking_id}</span> <br>
                    Customer:<br> <span>${task.customer_name} - ${task.customer_email}</span> <br>
                    Service Type:<br> <span>${task.task_type}</span> <br>
                    Request Date:<br> <span>${task.request_date}</span> <br>
                    Phone Model:<br> <span>${task.phone_model}</span> <br>
                    Carrier Network:<br> <span>${task.phone_carrier_network}</span> <br>
                    Status:<br> <span data-type="${task.completed ? "completed" : "pending"}">${task.completed ? "completed" : "pending"}</span>
              </div>
          </li>
        </ul>
        </div> 
      </div>
      `;

      document.querySelector(elements.modal).innerHTML = html;
    }

  }

  // TODO display modals for individual tasks in dashboard
  else {
    // modal for IMEI Checking task
    if (task.task_type.includes('IMEI')) {
      let html = `
      <div class="modal">
        <form class="modal__form task__detail--modal-form">
          <div class="modal-svg modal-close">
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/>
            </svg>
          </div>
          <ul>
            <li>
              <span data-task_property="tracking_id">#${task.tracking_id}</span>
            </li>
            <li>
              <span data-task_property="task_type">${task.task_type}</span>                  
            </li>
            <li>
              <span data-task_property="phone_model">---</span>
            </li>
            <li class="u-flex-between">
              <span class="modal-copier" data-task_property="imei">${task.imei}</span>
              <div class="modal-svg modal-copy">
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                  <rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/>
                  <path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/>
                </svg>
              </div>
            </li>
            <li>
              <span data-task_property="carrier">${task.details}</span>
            </li>
            <li>
              <textarea class="modal__form--textarea" id="task-details" name="results" placeholder="Place results of checking here...">${task.results}</textarea>
            </li>
            <li>
              <select class="modal__form--select" name="status" id="task-modal">
                <option value="pending" ${!task.completed ? "selected" : ""}>Pending</option>
                <option value="completed" ${task.completed ? "selected" : ""}>Completed</option>
              </select>
            </li>
            <li class="u-flex-center"><button class="btn btn-checkout" type="submit">Save</button></li>
          </ul>
        </form>
      </div>
    `;

      document.querySelector(elements.modal).innerHTML = html;

    } else {
      // modal for non-IMEI Checking tasks
      let html = `
          <div class="modal">
            <form class="modal__form task__detail--modal-form">
              <div class="modal-svg modal-close">
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                  <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/>
                </svg>
              </div>
              <ul>
                <li>
                  <span data-task_property="tracking_id">#${task.tracking_id}</span>
                </li>
                <li>
                  <span data-task_property="task_type">${task.task_type}</span>                  
                </li>
                <li>
                  <span data-task_property="phone_model">${task.phone_model}</span>
                </li>
                <li class="u-flex-between">
                  <span class="modal-copier" data-task_property="imei">${task.imei}</span>
                  <div class="modal-svg modal-copy">
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                      <rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/>
                      <path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/>
                    </svg>
                  </div>
                </li>
                <li>
                  <span data-task_property="carrier">${task.phone_carrier_network ? task.phone_carrier_network : "---"}</span>
                </li>
                <li>
                  <select name="status" class="modal__form--select" id="task-modal">
                    <option value="pending" ${!task.completed ? "selected" : ""}>Pending</option>
                    <option value="completed" ${task.completed ? "selected" : ""}>Completed</option>
                  </select>
                </li>
                <li class="u-flex-center"><button class="btn btn-checkout" type="submit">Save</button></li>
              </ul>
            </form>
          </div>
        `;

      document.querySelector(elements.modal).innerHTML = html;
    };
  }


};

//function to hide the modal
export const hideModal = () => {
  document.querySelector(elements.modalClose).remove();

  document.querySelector(elements.modal).classList.remove('modal-show');
};

//function to replace the list value with the list provided
export const removeList = lists => {
  lists.forEach(list => {
    list.parentElement.classList.add('u-display-none');
  });
};

//function to collapse the nav bar
export const collapseNav = () => {
  document.querySelector(elements.navInput).checked = false;
}