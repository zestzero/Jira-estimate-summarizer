(function() {
    let isViewingEpic = document.querySelector("[alt = 'Epic']");
    let sumToDo = 0;
    let sumInProgress = 0;
    let sumDone = 0;
    let totalSum = 0;

    if (isViewingEpic) {
        let estimateElements = document.querySelectorAll('.biONaI');

        estimateElements.forEach(element => {
            const estimate = Number(element.innerHTML);
            const taskStatus = getTaskStatus(element);
            
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

        render();
    }

    function getTaskStatus(estimateElement) {
        const estimateContinerElement = estimateElement.closest("[role = 'button']");
        const statusContinerElement = estimateContinerElement.nextSibling;
        const statusChipElement = statusContinerElement.querySelector('.sc-iqtXtF');
        const statusChipElementClassName = statusChipElement ? statusChipElement.className : null;
        let status = 'unknown';

        if (!statusChipElementClassName) {
            return status;
        }

        switch (statusChipElementClassName) {
            case 'sc-iqtXtF bLcNXH':
                status = 'TODO'
                break;
            case 'sc-iqtXtF kYUniW':
                status = 'IN_PROGRESS'
                break;
            case 'sc-iqtXtF dSBJWL':
                status = 'DONE'
                break;
        }

        return status;
    }

    function render() {
        const container = document.createElement('div');
        const siblingToRenderTarget = document.querySelector('.eCEoiG');
        container.innerHTML = getTemplate();
        container.className = 'estimate-summary';

        siblingToRenderTarget.parentNode.insertBefore(container, siblingToRenderTarget.nextSibling);
    }

    function getTemplate() {
        return `
            <div class="biONaI todo">
                ${sumToDo}
            </div>
            <div class="biONaI in-progress">
                ${sumInProgress}
            </div>
            <div class="biONaI done">
                ${sumDone}
            </div>
        `.trim();
    }
})()