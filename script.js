// Function to validate URL
function isValidUrl(url) {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
}

// Function to shorten the URL
function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const errorMessage = document.getElementById("error-message");
    const shortenedUrlContainer = document.getElementById("shortenedUrlContainer");
    const shortenedUrlElement = document.getElementById("shortenedUrl");

    // Clear previous error and results
    errorMessage.textContent = '';
    shortenedUrlContainer.style.display = 'none';

    // Validate URL
    if (!isValidUrl(longUrl)) {
        errorMessage.textContent = "Please enter a valid URL.";
        return;
    }

    // Generate a random code (this is a basic example, you may want to make it more sophisticated)
    const randomCode = Math.random().toString(36).substring(2, 8);
    const shortenedUrl = "https://short.ly/" + randomCode;

    // Store the shortened URL and its corresponding long URL in local storage
    saveToHistory(randomCode, longUrl);

    // Display the shortened URL
    shortenedUrlElement.textContent = shortenedUrl;
    shortenedUrlContainer.style.display = 'block';
}

// Function to copy the shortened URL to the clipboard
function copyToClipboard() {
    const shortenedUrl = document.getElementById("shortenedUrl").textContent;
    navigator.clipboard.writeText(shortenedUrl).then(() => {
        alert('Shortened URL copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Function to save the shortened URL mapping to local storage
function saveToHistory(code, longUrl) {
    let history = JSON.parse(localStorage.getItem('urlHistory')) || [];
    history.push({ code, longUrl });
    localStorage.setItem('urlHistory', JSON.stringify(history));

    displayHistory();
}

// Function to display the history of shortened URLs
function displayHistory() {
    const historyList = document.getElementById("historyList");
    const history = JSON.parse(localStorage.getItem('urlHistory')) || [];

    historyList.innerHTML = '';
    history.forEach(entry => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `https://short.ly/${entry.code}`;
        a.textContent = `https://short.ly/${entry.code}`;
        li.appendChild(a);
        historyList.appendChild(li));
}

// Redirect handling for visiting shortened URL directly
window.onload = function() {
    const path = window.location.pathname.split("/").pop();  // Get the last part of the URL
    const history = JSON.parse(localStorage.getItem('urlHistory')) || [];
    
    // Check if the current path matches any shortened URL code
    const entry = history.find(item => item.code === path);
    if (entry) {
        // Redirect to the corresponding long URL
        window.location.href = entry.longUrl;
    }

    // Load history (for main page)
    displayHistory();
};
