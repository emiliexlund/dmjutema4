const form = document.querySelector('.site-search');
const searchInput = form.querySelector('input');
const panel = form.querySelector('.search-panel');
const searchStatus = document.querySelector('#search-status');
const searchResults = document.querySelector('#search-results');
const entries = [...document.querySelectorAll('.site-header nav a')].map((link) => ({
    title: link.getAttribute('aria-label'),
    href: link.getAttribute('href'),
    keywords: ''
}));

entries.push(
    { title: 'Modeljernbanens dag', href: 'index.html#modeljernbanens-dag', keywords: 'MOROP december' },
    { title: 'Modeltog for alle 2027', href: 'index.html#modeltog-for-alle', keywords: 'udstilling marts Taastrup' },
    { title: 'Fotokonkurrence', href: 'index.html#fotokonkurrence', keywords: 'foto konkurrence' },
    { title: 'Årets model', href: 'index.html#aarets-model', keywords: 'modeltog kølevogn' },
    { title: 'DMJU News nr. 48', href: 'news.html#seneste-nummer', keywords: 'nyheder nyhedsbrev pdf' }
);

const normalize = (value) => value.toLocaleLowerCase('da');

function updateSearch() {
    const query = normalize(searchInput.value.trim());
    panel.hidden = !query;
    searchResults.replaceChildren();
    if (!query) return [];

    const words = query.split(/\s+/);
    const matches = entries.filter(({ title, keywords }) => {
        const text = normalize(title + ' ' + keywords);
        return words.every((word) => text.includes(word));
    });

    for (const { title, href } of matches) {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = title;
        const item = document.createElement('li');
        item.append(link);
        searchResults.append(item);
    }
    searchStatus.textContent = matches.length ? matches.length + ' fundet' : 'Ingen lokale resultater. Tryk Enter for at søge på dmju.dk.';
    return matches;
}

searchInput.addEventListener('input', updateSearch);
searchInput.addEventListener('focus', updateSearch);
form.addEventListener('submit', (event) => {
    const matches = updateSearch();
    if (matches.length) {
        event.preventDefault();
        location.href = matches[0].href;
    } else if (!searchInput.value.trim()) {
        event.preventDefault();
    }
});
form.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        searchInput.focus();
        panel.hidden = true;
    }
});
form.addEventListener('focusout', (event) => {
    if (!form.contains(event.relatedTarget)) panel.hidden = true;
});

