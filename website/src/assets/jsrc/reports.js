/* filepath: /Users/jeffbue/TCG_SITES/SEO-TEAM/mranalyze.com/website/src/assets/js/reports.js */
document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('archive-dialog');
    const dialogReportId = document.getElementById('dialog-report-id');
    const confirmBtn = document.getElementById('confirm-archive-btn');
    const cancelBtn = document.getElementById('cancel-archive-btn');
    const reportItems = document.querySelectorAll('.report-item');

    let reportToArchive = null;
    let checkboxToUncheck = null;

    const showDialog = (reportId, checkbox) => {
        reportToArchive = reportId;
        checkboxToUncheck = checkbox;
        dialogReportId.textContent = reportId;
        dialog.style.display = 'flex';
    };

    const hideDialog = () => {
        if (checkboxToUncheck) {
            checkboxToUncheck.checked = false;
        }
        dialog.style.display = 'none';
        reportToArchive = null;
        checkboxToUncheck = null;
    };

    const archiveReport = async () => {
        if (!reportToArchive) return;

        const reportId = reportToArchive;
        const reportElement = document.querySelector(`.report-item[data-report-id="${reportId}"]`);

        try {
            const response = await fetch(`/api/analysis/report/${reportId}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Archive successful:', result.message);
                if (reportElement) {
                    reportElement.classList.add('archiving');
                    // Remove the element after the animation completes
                    reportElement.addEventListener('animationend', () => {
                        reportElement.nextElementSibling.remove(); // remove <br/>
                        reportElement.remove();
                    });
                }
            } else {
                console.error('Archive failed:', result.message);
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An unexpected error occurred while archiving the report.');
        } finally {
            hideDialog();
        }
    };

    reportItems.forEach(item => {
        const checkbox = item.querySelector('.archive-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    const reportId = item.dataset.reportId;
                    showDialog(reportId, e.target);
                }
            });
        }
    });

    confirmBtn.addEventListener('click', archiveReport);
    cancelBtn.addEventListener('click', hideDialog);

    // Also hide dialog if clicking on the overlay
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            hideDialog();
        }
    });
});