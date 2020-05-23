var isViewingEpic = document.querySelector("[alt = 'Epic']");
var sumToDo = 0;
var sumInProgress = 0;
var sumDone = 0;
var totalSum = 0;
var percentageDone = 0;

if (isViewingEpic) {
    countEstimates();
    countPercentageDone();

    renderSummary();
    renderPercentageDone();
}

function countEstimates() {
    const issueContainers = document.querySelectorAll("[data-rbd-draggable-context-id]");

    issueContainers.forEach(container => {
        const estimateChip = container.querySelector("button").previousSibling;
        let estimate = 0;
        let taskStatus;

        if (!estimateChip) {
            return;
        }

        estimate = Number(estimateChip.innerText);
        taskStatus = getTaskStatus(container);
        
        totalSum += estimate;

        switch (taskStatus) {
            case 'TODO':
                sumToDo += estimate;
                break;
            case 'IN_PROGRESS':
                sumInProgress += estimate;
                break;
            case 'DONE':
                sumDone += estimate;
                break;
        }
    });
}

function getTaskStatus(issueContainer) {
    let status = 'UNKNOWN';

    const statusLabelBackgroundColor = getComputedStyle(issueContainer.querySelector('[data-test-id *= "status"]').firstChild).backgroundColor;

    switch (statusLabelBackgroundColor) {
        case 'rgb(223, 225, 230)':
            status = 'TODO'
            break;
        case 'rgb(222, 235, 255)':
            status = 'IN_PROGRESS'
            break;
        case 'rgb(227, 252, 239)':
            status = 'DONE'
            break;
    }

    return status;
}

function countPercentageDone() {
    percentageDone = Math.ceil((sumDone / totalSum) * 100);
}

function renderSummary() {
    const progressBarElement = document.querySelector("[data-test-id *= 'progress-bar']");
    const siblingToRenderTarget = progressBarElement.parentElement.parentElement;
    const container = document.createElement('div');

    container.innerHTML = getSummaryTemplate();
    container.className = 'estimates';
    
    if (progressBarElement) {
        siblingToRenderTarget.parentElement.insertBefore(container, siblingToRenderTarget.nextSibling);
    }
}

function getSummaryTemplate() {
    return `
        <div class="estimate-summary">
            <div class="description">Story point estimates:</div>
            <div class="chip todo" title="Not started - Story points">
                ${sumToDo}
            </div>
            <div class="chip in-progress" title="In progress - Story points">
                ${sumInProgress}
            </div>
            <div class="chip done" title="Done - Story points">
                ${sumDone}
            </div>
        </div>
    `.trim();
}

function renderPercentageDone() {
    const renderTarget = document.querySelector(".estimate-summary");
    const container = document.createElement('span');
    
    container.innerText = `${percentageDone}% Done`;
    container.className = 'estimate-percentage-done';

    if (renderTarget) {
        renderTarget.appendChild(container);
    }
}