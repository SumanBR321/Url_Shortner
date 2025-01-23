async function shortenUrl() {
    const inputUrl = document.getElementById("longUrl").value.trim();
    const resultElement = document.getElementById("shortUrlResult");

    try {
        const response = await fetch('urls.json');
        const urlMappings = await response.json();
        console.log(urlMappings);
        
        const mapping = urlMappings.find(entry => entry.longUrl == inputUrl);
        console.log(mapping);
        
        if (mapping) {
            resultElement.innerHTML = `Short URL: <a href="${mapping.shortUrl}" target="_blank">${mapping.shortUrl}</a>`;
        } else {
            resultElement.innerHTML = "Short URL not found for the given input.";
        }
    } catch (error) {
        resultElement.innerHTML = "Error loading URL data.";
        console.error("Error fetching JSON:", error);
    }
}

async function copyToClipboard() {
    const resultInput = document.getElementById("shortUrlResult");

    try {
        console.log(resultInput);
        await navigator.clipboard.writeText(resultInput.value);
        // alert("Short URL copied to clipboard!");
    } catch (err) {
        alert("Failed to copy URL. Please copy manually.");
        console.error("Clipboard error:", err);
    }
}