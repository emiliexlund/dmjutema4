const clubName = document.querySelector('#club-name');
const filters = [...document.querySelectorAll('[data-filter]')];
const clubRows = [...document.querySelectorAll('.club-table tbody tr')];
const clubStatus = document.querySelector('#club-status');
const resultsPanel = document.querySelector('.club-results');

function filterClubs() {
    const query = clubName.value.trim().toLocaleLowerCase('da');
    let visible = 0;
    const controls = [clubName, ...filters];
    const hasFilter = controls.some((control) => control.value.trim());
    resultsPanel.hidden = !hasFilter;
    for (const control of controls) {
        control.classList.toggle('selected', Boolean(control.value.trim()));
    }

    for (const row of clubRows) {
        const matchesName = row.cells[0].textContent.toLocaleLowerCase('da').includes(query);
        const matchesFilters = filters.every(({ value, dataset }) => {
            if (!value) return true;
            const values = dataset.filter === 'country'
                ? row.dataset.country.split('|')
                : [...row.cells[Number(dataset.filter)].childNodes].map((node) => node.textContent.trim());
            return values.includes(value);
        });
        row.hidden = !(matchesName && matchesFilters);
        if (!row.hidden) visible += 1;
    }
    clubStatus.textContent = visible ? visible + ' af ' + clubRows.length + ' klubber' : 'Ingen klubber matcher filtrene.';
}

clubName.addEventListener('input', filterClubs);
for (const filter of filters) filter.addEventListener('change', filterClubs);
filterClubs();
