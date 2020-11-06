// all api requests for the dashboard are made here

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ RETRIEVE ALL TASKS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const populatePage = async () => {
    /* 
    fetches all tasks by calling their respective endpoints
    stores these in a list of objects which is returned in the allTasks variable
    */

    // const getAllTasksEndpoint = `${baseBackendAPIURL}/tasks/all/`

    const imeiCheckTaskEndpoint = `${baseBackendAPIURL}/tasks/imei/`;
    const icloudUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/icloud/`;
    const carrierUnlockTaskEndpoint = `${baseBackendAPIURL}/tasks/carrier/`;

    let allTasks = [];

    // loop over each task endpoint
    [imeiCheckTaskEndpoint, icloudUnlockTaskEndpoint, carrierUnlockTaskEndpoint].forEach(endpoint => {
        // perform get request to retrieve all tasks for each task type
        fetch(endpoint, {
            method: 'GET'
        })
            .then(async response => {
                const tasksArray = await response.json();
                allTasks.push(...tasksArray);
                console.log(allTasks.length);
                return allTasks;
                // push list of tasks to array to be returned 
                // for (let task of tasksArray) {
                    //     // console.log(task);
                //     allTasks.push(task);
                //     console.log(allTasks.length);
                // }
            })

    })
    
    // console.log(allTasks);
    // console.log(allTasks.length);
    // return allTasks;
}