const newsletter = document.querySelector('.newsletter');

if (newsletter) {
    const email = newsletter.querySelector('input');
    const status = newsletter.querySelector('[role="status"]');

    newsletter.addEventListener('submit', (event) => {
        event.preventDefault();
        status.textContent = 'Tilmelding til nyhedsbrevet er endnu ikke tilgængelig.';
        status.hidden = false;
    });

    email.addEventListener('input', () => {
        status.hidden = true;
    });
}
