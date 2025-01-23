const urlMappings = [
    {
        longUrl: "https://www.youtube.com/",
        shortUrl: "https://shorturl.at/CYW3v"
    },
    {
        longUrl: "https://www.google.com/",
        shortUrl: "https://shorturl.at/JdYPy"
    },
    {
        longUrl: "https://github.com/",
        shortUrl: "https://shorturl.at/Njd1x"
    }
];

function shortenUrl() {
    const inputUrl = document.getElementById("longUrl").value.trim();
    const resultElement = document.getElementById("shortUrlResult");

    const mapping = urlMappings.find(entry => entry.longUrl === inputUrl);

    if (mapping) {
        resultElement.innerHTML = `Short URL: <a href="${mapping.shortUrl}" target="_blank">${mapping.shortUrl}</a>`;
    } else {
        resultElement.innerHTML = "Short URL not found for the given input.";
        console.log
    }
}
