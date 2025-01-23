// This file contains the JavaScript code for handling URL shortening functionality.

const urlForm = document.getElementById('url-form');
const urlInput = document.getElementById('url-input');
const urlList = document.getElementById('url-list');

// Load existing URLs from JSON file
fetch('./data/urls.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(url => {
            addUrlToList(url.longUrl, url.shortUrl);
        });
    });

urlForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const originalUrl = urlInput.value;
    const shortenedUrl = generateShortenedUrl(originalUrl);
    addUrlToList(originalUrl, shortenedUrl);
    saveUrl(originalUrl, shortenedUrl);
    urlInput.value = '';
});

function generateShortenedUrl(originalUrl) {
    return `redirect.html?url=${encodeURIComponent(originalUrl)}`;
}

function addUrlToList(original, shortened) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="${shortened}" target="_blank">${shortened}</a> - ${original}`;
    urlList.appendChild(listItem);
}

function saveUrl(original, shortened) {
    // Fetch existing URLs from localStorage
    let urls = JSON.parse(localStorage.getItem('urls')) || [];
    // Add new URL to the list
    urls.push({ longUrl: original, shortUrl: shortened });
    // Save updated list back to localStorage
    localStorage.setItem('urls', JSON.stringify(urls));
}