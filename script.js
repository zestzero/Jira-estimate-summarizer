(function() {
    let isViewingEpic = document.querySelector("[alt = 'Epic']");
    let sumToDo = 0;
    let sumInProgress = 0;
    let sumDone = 0;
    let totalSum = 0;

    if (isViewingEpic) {
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

        renderSummary();
    }

    function getTaskStatus(issueContainer) {
        let status = 'unknown';

        const chipBackgroundColor = getComputedStyle(issueContainer.querySelector('[data-test-id *= "status"]').firstChild).backgroundColor;

        switch (chipBackgroundColor) {
            case 'rgb(222, 235, 255)':
                status = 'TODO'
                break;
            case 'rgb(223, 225, 230)':
                status = 'IN_PROGRESS'
                break;
            case 'rgb(227, 252, 239)':
                status = 'DONE'
                break;
        }

        return status;
    }

    function renderSummary() {
        const container = document.createElement('div');
        const siblingToRenderTarget = document.querySelector("[data-test-id *= 'progress-bar']");
        container.innerHTML = getTemplate();
        container.className = 'estimate-summary';

        if (siblingToRenderTarget) {
            siblingToRenderTarget.parentNode.insertBefore(container, siblingToRenderTarget.nextSibling);
        }
    }

    function getTemplate() {
        return `
            <div class="chip todo">
                ${sumToDo}
            </div>
            <div class="chip in-progress">
                ${sumInProgress}
            </div>
            <div class="chip done">
                ${sumDone}
            </div>
        `.trim();
    }
})()